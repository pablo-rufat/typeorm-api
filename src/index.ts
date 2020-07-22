import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { Routes } from "./modules";
import * as dotenv from "dotenv";
import { verifyJWT, noVerify } from "./utils/auth";
import { connectDB } from "./server";

dotenv.config();
export const app = express();

connectDB().then(connection => {
  app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, route.verifyToken ? verifyJWT : noVerify,  (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => {
                    res.statusCode = result.status;
                    res.json(result.content);
                });
            } else if (result !== null && result !== undefined) {
                res.statusCode = result.status;
                res.json(result.content);
            }
        });
    });

    app.listen(3000, () =>{
      console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
      app.emit("appStarted");
    });
});