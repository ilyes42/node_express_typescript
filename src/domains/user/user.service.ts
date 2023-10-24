import DatabaseUser from "./models/user.database.model";

// Checks whether a user with a certain ID exists or not.
export async function userExists(userId: number): Promise<boolean> {
  const user = await DatabaseUser.findByPk(userId);
  return user !== null;
}
