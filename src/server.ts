import express, { type Express, json } from "express";
import { userRouter } from "./domains/user/user.router";
import { Database } from "./database";
import { bookRouter } from "./domains/book/book.router";

export async function initServer() {
  try {
    const app: Express = express();
    const port: string | number = process.env.PORT || 3000;

    await Database.getInstance();

    app.use(json());
    app.use("/users", userRouter);
    app.use("/books", bookRouter);

    const server = await app.listen(port);
    console.log("Server started successfully!");
  } catch (error) {
    console.log("An error occured!", error);
  }
}
