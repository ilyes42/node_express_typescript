import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  BeforeCreate,
  HasMany,
} from "sequelize-typescript";

import { crypt } from "../../../lib/crypt";
import DatabaseBook from "../../book/models/book.database.model";

@Table({
  timestamps: false,
})
export default class DatabaseUser extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  username!: string;

  @Column
  password!: string;

  @HasMany(() => DatabaseBook)
  books!: DatabaseBook[];

  @BeforeCreate
  static async encryptPassword(instance: DatabaseUser) {
    const crypted = await crypt(instance.password);
    instance.password = crypted;
  }
}
