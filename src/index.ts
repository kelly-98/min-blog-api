import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import blogsRoute from "./routes/blogs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const mongoString = process.env.DB_URL || "";
mongoose.connect(mongoString);
const database = mongoose.connection;

app.use("/blogs", blogsRoute);

database.on("error", (err: Error) => {
  console.log(err);
});

database.once("open", () => {
  console.log("open");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
