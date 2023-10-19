import { Request, Response, Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { userSchema } from "./user.schema";

let id = 3;

type ApiUser = { id: number; username: string };

const MOCK_USERS: ApiUser[] = [
  {
    id: 1,
    username: "Ilyes",
  },
  {
    id: 2,
    username: "Pavel",
  },
];

const userRouter: Router = Router();

userRouter.get("/", (request: Request, response: Response) => {
  return response.status(200).json(MOCK_USERS);
});

userRouter.post(
  "/",
  validateRequest({
    body: userSchema,
  }),
  (request: Request, response: Response) => {
    const { username } = request.body;
    const newUser: ApiUser = { id, username };
    MOCK_USERS.push(newUser);
    id++;
    return response.status(200).json(newUser);
  }
);

export { userRouter };
