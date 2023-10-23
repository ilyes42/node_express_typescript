import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
  BeforeCreate,
} from "sequelize-typescript";

import { crypt } from "../../lib/crypt";

@Table
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  username!: string;

  @Column
  password!: string;

  @BeforeCreate
  static async encryptPassword(instance: User) {
    const crypted = await crypt(instance.password);
    instance.password = crypted;
  }
}
