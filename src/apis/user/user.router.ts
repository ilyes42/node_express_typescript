import { Request, Response, Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { userSchema } from "./user.schema";

import User from "./user.model";

const userRouter: Router = Router();

userRouter.get("/", async (request: Request, response: Response) => {
  const users = await User.findAll();
  return response.status(200).json(users);
});

userRouter.post(
  "/",
  validateRequest({
    body: userSchema,
  }),
  async (request: Request, response: Response) => {
    const { username, password } = request.body;
    const newUser: User = new User({ username, password });
    await newUser.save();
    return response.status(200).json(newUser);
  }
);

export { userRouter };
