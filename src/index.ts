import express, { type Express, json } from "express";
import { userRouter } from "./api/user/user.router";

const server: Express = express();
const port: string | number = process.env.PORT || 3000;

server.use(json());
server.use("/users", userRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port} ...`);
});
