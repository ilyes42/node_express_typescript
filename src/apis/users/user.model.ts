import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";

@Table
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  username!: string;
}
