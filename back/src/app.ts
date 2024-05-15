import express, { Express } from "express";
import { createServer, Server } from "http";
import cors from "cors";
import helmet from "helmet";
import dbService from "../services/db-service";

export class App {
    private collectionName: string = 'iron_insight';

    constructor() {
        dbService.connect()
            .then(() => {
                this.init();
            })
            .catch(err => {
                console.error('Erreur de connexion à la base de données : ', err);
            });
    }

    init() {
        const app: Express = express();
        app.use(cors());
        app.use(helmet({
            crossOriginResourcePolicy: false,
        }));
        app.use('/public', express.static('public'));

        const server: Server = createServer(app);

        this.start(server);
    }

    start(server: Server) {
        server.listen(3333, () => {
            console.log('Serveur démarré sur le port 3333');
        });
    }
}
