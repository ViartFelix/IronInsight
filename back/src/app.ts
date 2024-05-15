import express, { Express } from "express";
import { createServer, Server } from "http";
import cors from "cors";
import helmet from "helmet";
import dbService from "../services/db-service";

export class App {

    app: Express;

    constructor() {
        dbService.connect()
            .then(() => {
                this.init();
                this.bindRoutes();
                this.start();
            })
            .catch(err => {
                console.error('Erreur lors de la mise en route du service: ', err);
            });
    }

    private init() {
        this.app = express();
        //cors
        this.app.use(cors());
        //for images
        this.app.use(helmet({
            crossOriginResourcePolicy: false,
        }));
        //public path
        this.app.use('/public', express.static('public'));
    }

    private bindRoutes(): void
    {
        this.app.get('/test', (req, res) => {
            res.send("hey")
        });
    }

    private start() {
        //creating server
        const server: Server = createServer(this.app);
        //listening server
        server.listen(3333, () => {
            console.log('Serveur démarré sur le port 3333');
        });
    }
}
