import { Sequelize } from "sequelize-typescript";
import path, { dirname } from "path";

export class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static async getInstance(): Promise<Sequelize> {
    if (!this.instance) {
      try {
        this.instance = new Sequelize({
          dialect: "sqlite",
          storage: path.normalize(__dirname + "/../db.sqlite"),
        });
        await this.instance.authenticate();
        this.instance.addModels([
          path.resolve(__dirname + "/domains/**/*.database.model.ts"),
        ]);
        await this.instance.sync();
        console.log("Database connection has been established successfully.");
        return this.instance;
      } catch (error) {
        console.log("An error occured", error);
      }
    }
    return this.instance;
  }
}
