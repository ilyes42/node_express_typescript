import bcrypt from "bcrypt";

const saltRounds = 10;

// takes plain string, returns encrypted string.
export async function crypt(plain: string): Promise<string> {
  console.log(plain);
  return await bcrypt.hash(plain, saltRounds);
}
