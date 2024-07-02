import mysql, { Connection, MysqlError } from 'mysql';

type QueryCallback<T> = (err: MysqlError | null, result?: T, fields?: any) => void;

class DbService {
    private connection: Connection | null = null;

    constructor() {}

    async connect(): Promise<void> {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        this.connection.connect((err: MysqlError) => {
            if (err) {
                console.error('Erreur de connexion à la base de données : ', err);
                throw err;
            }
            console.log('Connexion à la base de données MySQL réussie');
        });
    }

  /**
   * Executes SQL query with a callback if needed
   * @param sql
   * @param values
   * @param callBack (err, result, fields)
   */
    async query<T>(sql: string, values?: any[], callBack?: QueryCallback<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
          if (!this.connection) {
            reject(new Error('La connexion à la base de données n\'est pas établie.'));
            return;
          }

          this.connection.query(sql, values, (error: MysqlError | null, results?: T, fields?: any) => {
            if (error) {
              reject(error);
            } else {
              if (callBack) {
                callBack(error, results, fields);
              }
              resolve(results as T);
            }
          });
        });
    }
}

export const dbService = new DbService();
