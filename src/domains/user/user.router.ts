import { Request, Response, Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { ApiUserSchema } from "./models/user.api.model";
import DatabaseUser from "./models/user.database.model";
import {
  createNewUser,
  getAllUsers,
  getBooksOfUser,
  getOneUserById,
} from "./user.service";

const userRouter: Router = Router();

// Gets all users
userRouter.get("/", async (request: Request, response: Response) => {
  const users = await getAllUsers();
  return response.status(200).json(users);
});

// Gets 1 user by id
userRouter.get("/:userId", async (request: Request, response: Response) => {
  const { userId } = request.params;
  const user = await getOneUserById(userId);
  if (!user) {
    return response
      .status(404)
      .json({ error: `User with id ${userId} not found!` });
  }
  return response.status(200).json(user);
});

// gets the books of a user
userRouter.get(
  "/:userId/books",
  async (request: Request, response: Response) => {
    const { userId } = request.params;
    const userBooks = getBooksOfUser(userId);
    return response.status(200).json(userBooks);
  }
);

// creates a new user
userRouter.post(
  "/",
  validateRequest({
    body: ApiUserSchema,
  }),
  async (request: Request, response: Response) => {
    const { username, password } = request.body;
    const newUser: DatabaseUser = await createNewUser({ username, password });
    return response.status(201).json(newUser);
  }
);

export { userRouter };
