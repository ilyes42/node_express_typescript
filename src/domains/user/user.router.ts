import { Request, Response, Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { ApiUser } from "./models/user.api.model";

import DatabaseUser from "./models/user.database.model";
import DatabaseBook from "../book/models/book.database.model";

const userRouter: Router = Router();

userRouter.get("/", async (request: Request, response: Response) => {
  const users = await DatabaseUser.findAll();
  return response.status(200).json(users);
});

userRouter.get("/:userId", async (request: Request, response: Response) => {
  const { userId } = request.params;
  const user = await DatabaseUser.findByPk(userId, { include: [DatabaseBook] });
  if (!user) {
    return response
      .status(404)
      .json({ error: `User with id ${userId} not found!` });
  }
  return response.status(200).json(user);
});

userRouter.get(
  "/:userId/books",
  async (request: Request, response: Response) => {
    const { userId } = request.params;
    const userBooks = DatabaseBook.findAll({ where: { userId } });
    return response.status(200).json(userBooks);
  }
);

userRouter.post(
  "/",
  validateRequest({
    body: ApiUser,
  }),
  async (request: Request, response: Response) => {
    const { username, password } = request.body;
    const newUser: DatabaseUser = new DatabaseUser({ username, password });
    await newUser.save();
    return response.status(201).json(newUser);
  }
);

export { userRouter };
