import { Request, Response, Router } from "express";
import { validateRequest } from "zod-express-middleware";

import DatabaseBook from "../book/models/book.database.model";
import { ApiBook } from "./models/book.api.model";
import { userExists } from "../user/user.service";
import { z } from "zod";
import DatabaseUser from "../user/models/user.database.model";

const bookRouter: Router = Router();

bookRouter.get("/", async (request: Request, response: Response) => {
  const books = await DatabaseBook.findAll();
  return response.status(200).json(books);
});

bookRouter.get("/:bookId", async (request: Request, response: Response) => {
  const { bookId } = request.params;
  const book = await DatabaseBook.findByPk(bookId, { include: DatabaseUser });
  if (!book) {
    return response
      .status(404)
      .json({ error: `Book with id ${bookId} not found!` });
  }
  return response.status(200).json(book);
});

bookRouter.post(
  "/",
  validateRequest({
    body: ApiBook,
  }),
  async (request: Request, response: Response) => {
    const { name, userId } = request.body;
    if (!(await userExists(userId))) {
      return response.status(404).json({
        error: `User with id ${userId} does not exist to assign it a book`,
      });
    }
    const newBook: DatabaseBook = new DatabaseBook({ name, userId });
    await newBook.save();
    return response.status(201).json(newBook);
  }
);

export { bookRouter };
