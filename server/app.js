import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import openApiSpec from "./docs/openapi.js";
import usersRouter from "./routes/users.js";
import catwaysRouter from "./routes/catways.js";
import reservationsRouter from "./routes/reservations.js";
import catwayReservationsRouter from "./routes/catwayReservations.js";
import authRouter from "./routes/auth.js";

import { initClientDbConnection } from "./db/mongo.js";

initClientDbConnection();

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "https://russell-catways-mu.vercel.app",
];

app.use(cors({
  // origin: "http://localhost:5173",
  // origin: "http://localhost:4173",
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],

}));
app.options("*", cors());

// app.use(cors({
//   exposedHeaders: ["Authorization"],
//   origin: "*"
// }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api", authRouter);
app.use('/api/users', usersRouter);
app.use("/api/catways", catwaysRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/catways/:id/reservations", catwayReservationsRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openApiSpec));


app.get("/", (req, res) => {
  res.json({ message: "API opérationnelle" });
});

app.use(function (req, res) {
  res.status(404).json({
    name: "server",
    version: "1.0.0",
    status: 404,
    message: "not found"
  });
});

export default app;
