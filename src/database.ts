import { Sequelize } from "sequelize-typescript";
import path from "path";

export class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static async getInstance(): Promise<Sequelize> {
    if (!this.instance) {
      try {
        this.instance = new Sequelize("sqlite::memory:");
        await this.instance.authenticate();
        await this.instance.addModels([
          path.resolve(__dirname + "/apis/**/*.model.ts"),
        ]);
        await this.instance.sync({ force: true });
        console.log("Database connection has been established successfully.");
        return this.instance;
      } catch (error) {
        console.log("An error occured", error);
      }
    }
    return this.instance;
  }
}
