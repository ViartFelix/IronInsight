import {dbService} from "./db-service";
import User from "../models/User";
import bcrypt from "bcrypt";
import TrainingProgram from "../models/TrainingProgram";
import {programService} from "./ProgramService";

class UserService {
  constructor() {

  }

  public async getUserById(id: number): Promise<User> {
    const r = await dbService.query("SELECT * FROM users WHERE id_user = ?", [id]);
    return r[0] as User;
  }

  /**
   * Registers a user in the database
   * @param user
   */
  public async registerUser(user: User): Promise<boolean> {
    const userPwd = await this.hashPassword(user.password);

    return await dbService.query(
      "INSERT INTO users (username, email, password, weight, height, created_at, updated_at) VALUES (?,?,?,?,?,?,?)",
      [user.username, user.email, userPwd, -1, -1, new Date(), new Date()]
    ).then((r) => {
      return true
    }).catch((e) => {
      return false;
    })
  }

  /**
   * Check if the user is unique in the db
   * @param user
   */
  public async userExists(user: User): Promise<boolean> {
    const query = "SELECT * FROM users WHERE (email = ? OR username = ?)"
    + (user.id_user !== undefined ? ` AND users.id_user != '${user.id_user}'` : '');

    //getting all users with email & usernames
    return dbService.query(
      query,
      [user.email, user.username]
    ).then((r: any) => {
      //and i return true of any user is found, because the queried user exists.
      return r.length !== 0
    })
    //i don't catch the error here, as it can cause several bad results.
  }

  public async getUser(email: string | undefined, username: string | undefined): Promise<User> {
    const raw = await dbService.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email ?? "", username ?? ""]
    )

    return raw[0] as User
  }

  /**
   * Fetches an user by it's username
   * @deprecated
   * @param username
   */
  public async getUserByUsername(username: string | undefined): Promise<User> {
    const raw = await dbService.query(
      "SELECT * FROM users WHERE username =?",
      [username]
    )

    return raw[0] as User;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  /**
   * Edit the user's data into the DB. The password has to be unhashed, because this method will hash the password.
   * @param request
   */
  public async editUserData(request: User): Promise<boolean>
  {
    try {
      //whether the user asks for a change in his password
      const pwdChange = (request.password?.length > 0)

      const dataToUpdate = [ request.username ]
      if(pwdChange) dataToUpdate.push(await this.hashPassword(request.password))

      await dbService.query("UPDATE users SET " +
        "username=?," +
        (pwdChange ? "password=?," : "") +
        "email=?," +
        "weight=?," +
        "height=?," +
        "updated_at=NOW()" +
        " WHERE id_user=?",
        [...dataToUpdate, request.email, request.weight, request.height, request.id_user],
        function(err, result, fields) {
          if (err) {
            throw err;
          }
        }
      )

      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Converts the data provided to a User model
   * @param data A mySQL row object (if possible)
   * @param flashPwd If the password should be shown or not
   */
  public toUser(data: any, flashPwd: boolean = false): User {
    return {
      id_user: data.id_user,
      email: data.email,
      username: data.username,
      weight: data.weight,
      height: data.height,
      created_at: data.created_at,
      updated_at: data.updated_at,
      password: (flashPwd ? data.password : undefined)
    } as User;
  }

  /**
   * Takes random posts in the DB, to give them back.
   * @param limit Number of posts to fetch
   */
  public async getRandomPosts(limit: number): Promise<TrainingProgram[]>
  {
    //we fetch first random posts
    const rawResult = await dbService.query("SELECT * FROM training_done " +
      "JOIN users ON training_done.id_user = users.id_user " +
      "JOIN training_program ON training_done.id_program = training_program.id_program " +
      "ORDER BY RAND() LIMIT " + limit
    ) as Array<any>;

    //what will be returned
    const final: TrainingProgram[] = [];
    //for some god-knows-what reason, making an array.map will make the return value Promise<Promise<TrainingProgram[]>>
    //so i did a simple for of loop that just works
    for(let row of rawResult) {
      final.push(await programService.toProgram(row))
    }

    return final;
  }

  /**
   * Returns a list of the auth user's friends.
   * @param userReq
   */
  public async getUserFriends(userReq: User): Promise<User[]>
  {
    const r = await dbService.query(
      "SELECT * FROM friend " +
      "JOIN users ON friend.id_user_1 = users.id_user OR friend.id_user_2 = users.id_user " +
      "WHERE friend.id_user_1 = ? OR friend.id_user_2 = ?" ,
      [userReq.id_user, userReq.id_user]
    ) as Array<any>

    //final array
    const final: User[] = [];

    for (let userRow of r)
    {
      //convert the data line to a User
      const userFriend: User = userService.toUser(userRow);

      //if it's not the same person as the one that requested contacts infos
      if(userFriend.id_user !== userReq.id_user) {
        //then we push the user
        final.push(userFriend)
      }
    }

    return final
  }

  /**
   * Will attempt to delete the relation between two users.
   * @param userReq
   * @param idOtherUser
   */
  public async deleteFriendRelation(userReq: User, idOtherUser: number): Promise<boolean>
  {
    //determines if the delete can be made
    let isOk = false;

    //used for the two queries
    const sqlParams = [userReq.id_user, idOtherUser, idOtherUser, userReq.id_user]
    //comment where clause used for the two sql queries
    const whereClause: string = "WHERE (id_user_1 = ? AND id_user_2 = ?) OR (id_user_1 = ? AND id_user_2 = ?)"

    //query to determine if the relation can be deleted (checking if only one entry exists)
    const okQ = await dbService.query("SELECT * FROM friend " + whereClause, sqlParams, function (err, result: any, fields) {
      //if no error happened, and that only one entry exists
      if(!err || result.length === 1) {
        isOk = true;
      }
    })

    if(!isOk) throw new Error("Can't delete this relation.")

    return await dbService.query(
      "DELETE FROM friend " + whereClause,
      sqlParams,
      function (err) {
        return typeof err === 'undefined'
      }
    )
  }

  /**
   * Determines if the relation can be inserted (is not already in the DB)
   * @param userReq
   * @param idOtherUser
   */
  public async canAddFriend(userReq: User, idOtherUser: number): Promise<boolean>
  {
    let isOk = false;

    //used for the two queries
    const sqlParams = [userReq.id_user, idOtherUser, idOtherUser, userReq.id_user]
    //comment where clause used for the two sql queries
    const whereClause: string = "WHERE (id_user_1 = ? AND id_user_2 = ?) OR (id_user_1 = ? AND id_user_2 = ?)"

    await dbService.query("SELECT * FROM friend " + whereClause, sqlParams, function (err, result: any, fields) {
      //if no error happened, and that no row exists
      if(!err && result.length < 1) {
        isOk = true;
      }
    })

    return isOk;
  }

  /**
   * Will attempt to insert a new friend in the DB
   * @param userReq
   * @param idOtherUser
   */
  public async addFriendRelation(userReq: User, idOtherUser: number): Promise<boolean>
  {
    let isOk = false;

    await dbService.query("INSERT INTO friend " +
      "(id_user_1, id_user_2) VALUES" +
      "(?,?)",
      [userReq.id_user, idOtherUser],
      function (err, result, fields) {
        //if any error happened, then we return false
        isOk = (typeof err !== "undefined")
      })

    return isOk
  }
}

export const userService = new UserService();
