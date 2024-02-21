import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import db from "./config/db.js";

import Router from "./routes/routes.js";

import "dotenv/config";

const app = express();

app.use(express.json());

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", Router);
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log("Server running on port " + process.env.APP_PORT);
});
