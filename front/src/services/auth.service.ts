import {Inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/User";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export default class AuthService
{
  private readonly _user: BehaviorSubject<User>
  private readonly _token: BehaviorSubject<string>

  constructor(
    @Inject(UserService) private userService: UserService
  ) {
    this._user = new BehaviorSubject<User>({} as User)
    this._token = new BehaviorSubject<string>("")
  }

  public isLoggedIn(): boolean
  {
    return this._token.getValue().length > 0
  }

  public makeUserLoggedIn(token: string, user: User)
  {
    this._token.next(token)
    this._user.next(user)
  }

  get user(): BehaviorSubject<User> { return this._user; }
  get token(): BehaviorSubject<string> { return this._token; }
}
