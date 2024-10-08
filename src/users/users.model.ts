import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Task } from 'src/tasks/task.model';

@Table({
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('0', '1'),
    defaultValue: '1', // Valor predeterminado
    allowNull: false,
  })
  status: number;

  @HasMany(() => Task)
  tasks: Task[];
}
