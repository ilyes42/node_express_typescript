import express, { type Express, json } from "express";
import { userRouter } from "./apis/users/user.router";
import { Database } from "./database";

export async function initServer() {
  try {
    const app: Express = express();
    const port: string | number = process.env.PORT || 3000;

    await Database.getInstance();

    app.use(json());
    app.use("/users", userRouter);

    const server = await app.listen(port);
    console.log("Server started successfully!");
  } catch (error) {
    console.log("An error occured!", error);
  }
}
