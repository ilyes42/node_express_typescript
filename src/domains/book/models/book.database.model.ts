import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import DatabaseUser from "../../user/models/user.database.model";

@Table
export default class DatabaseBook extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  name!: string;

  @ForeignKey(() => DatabaseUser)
  @Column
  userId!: number;

  @BelongsTo(() => DatabaseUser)
  user!: DatabaseUser;
}
