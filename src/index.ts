import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import blogsRoute from "./routes/blogs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*",
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const mongoString = process.env.DB_URL || "";
mongoose.connect(mongoString);
const database = mongoose.connection;

app.use((req: Request, res, next) => {
  req.requestTime = new Date(Date.now()).toISOString();
  next();
});

app.use("/blogs", blogsRoute);

database.on("error", (err: Error) => {
  console.error(err);
});

database.once("open", () => {
  console.log("open");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
