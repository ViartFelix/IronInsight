import express, { Express } from "express";
import { createServer, Server } from "http";
import cors from "cors";
import helmet from "helmet";
import { dbService } from "../services/db-service";
import {router} from "./router";
import {userController} from "../controllers/userController";
import {exerciseController} from "../controllers/exerciseController";
import {programsController} from "../controllers/programsController";
import 'dotenv/config';
import { commentController } from "../controllers/commentController";
import { expressjwt } from "express-jwt"
import {errorHandler} from "../middlewares/errorMiddleware";
import { recordController } from "../controllers/recordController";


export class App {

    private app: Express;

    constructor() {
        dbService.connect()
            .then(() => {
                this.init();
                //routes init
                router.init(this.app);
                this.initControllers();
                this.errorHandlers();
                this.start();
            })
            .catch(err => {
                console.error('Erreur lors de la mise en route du service: ', err);
            });
    }

    private init() {
        this.app = express();
        //cors
        this.app.use(cors({
            origin: 'http://localhost:4200',
            methods: 'GET,POST',
            allowedHeaders: 'Content-Type,Authorization',
          }));
        //for images
        this.app.use(helmet({
            crossOriginResourcePolicy: false,
        }));
        this.app.use(express.json());
        //public path
        this.app.use('/public', express.static('public'));
    }

    /**
     * Init controllers
     * @private
     */
    private initControllers()
    {
        userController.init()
        exerciseController.init()
        programsController.init()
        commentController.init()
        recordController.init()
        this.app.get('/error', (req, res, next) => {
            const err = new Error('This is an error');
            res.send({
                mqzdlmzd: "lkdklzkzqldzkld"
            })
            next(err);
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

    private errorHandlers()
    {
        router.get('*', (req, res) => {
            res.status(404).json({
                message: "Not found"
            })
        })
    }
}
