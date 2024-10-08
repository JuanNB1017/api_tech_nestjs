import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@Table({
    timestamps: true,
    paranoid: true, // Habilita el borrado lógico
    })
    export class Task extends Model<Task> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.DATE,
        })
        deletedAt: Date;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.ENUM('open', 'in_progress', 'done'),
        defaultValue: 'open',
    })
    state: string;

    @Column({
        type: DataType.TEXT,
        defaultValue: '1',
    })
    status: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
