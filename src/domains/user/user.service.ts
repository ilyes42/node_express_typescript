import DatabaseBook from "../book/models/book.database.model";
import DatabaseUser from "./models/user.database.model";
import { type ApiUserType } from "./models/user.api.model";

// Checks whether a user with a certain ID exists or not.
export async function userExists(userId: number): Promise<boolean> {
  const user = await DatabaseUser.findByPk(userId);
  return user !== null;
}

export async function getAllUsers(): Promise<DatabaseUser[]> {
  try {
    const users = await DatabaseUser.findAll();
    return users;
  } catch (error) {
    throw error;
  }
}

export async function getOneUserById(
  userId: string
): Promise<DatabaseUser | null> {
  try {
    const user = await DatabaseUser.findByPk(userId, {
      include: [DatabaseBook],
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getBooksOfUser(userId: string): Promise<DatabaseBook[]> {
  try {
    const userBooks = DatabaseBook.findAll({ where: { userId } });
    return userBooks;
  } catch (error) {
    throw error;
  }
}

export async function createNewUser(
  apiUser: ApiUserType
): Promise<DatabaseUser> {
  try {
    const newUser: DatabaseUser = new DatabaseUser(apiUser);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
}
