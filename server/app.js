import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";


import usersRouter from "./routes/users.js";
import catwaysRouter from "./routes/catways.js";

import { initClientDbConnection } from "./db/mongo.js";

initClientDbConnection();

const app = express();

app.use(cors({
  exposedHeaders: ["Authorization"],
  origin: "*"
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/api/users', usersRouter);
app.use("/api/catways", catwaysRouter);

app.use(function (req, res, next) {
  res.status(404).json({
    name: "server",
    version: "1.0.0",
    status: 404,
    message: "not Found"
  });
});

export default app;
