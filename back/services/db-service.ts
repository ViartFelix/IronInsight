import mysql, { Connection, MysqlError } from 'mysql';

class DbService {
    private connection: Connection | null = null;

    constructor() {}

    async connect(): Promise<void> {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: 'admin',
            database: 'iron_insight'
        });

        this.connection.connect((err: MysqlError) => {
            if (err) {
                console.error('Erreur de connexion à la base de données : ', err);
                throw err;
            }
            console.log('Connexion à la base de données MySQL réussie');
        });
    }

    async query<T>(sql: string, values?: any[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            if (!this.connection) {
                reject(new Error('La connexion à la base de données n\'est pas établie.'));
                return;
            }

            this.connection.query(sql, values, (error: MysqlError | null, results?: T, fields?: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as T);
                }
            });
        });
    }
}

export const dbService = new DbService();
