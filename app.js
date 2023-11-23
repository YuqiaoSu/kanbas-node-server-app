import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignment/routes.js";
import UserRoutes from "./users/routes.js";
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: [process.env.FRONTEND_URL_DEPLOY, process.env.FRONTEND_URL_DEVELOPMENT]
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
app.use(
    session(sessionOptions)
);

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);

Hello(app);
app.listen(process.env.PORT || 4000);