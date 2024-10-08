import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task)
        private taskModel: typeof Task,
    ) {}
    // Servicio de consultoria de todas las tareas
    async findAll(): Promise<Task[]> {
        // Buscar todas las tareas 
        let response = await this.taskModel.findAll({
            where: { status: '1' },
        });
        return response
    }
    //Servicio de creacion de tareas
    async create(createTaskDto: CreateTaskDto, userId: number) {
        const task = {
            ...createTaskDto,
            userId: userId
        };
        return this.taskModel.create(task);
    }
    
    // Servicio de actualizacion de campos
    async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
        // Busca la tarea por su ID y el userId
        const task = await this.taskModel.findOne({ where: { id, userId } });
        if (!task) {
            throw new NotFoundException('Task not found or this task does not belong to the user');
        }

        task.state = updateTaskDto.state;

        // Solo actualiza los campos si están presentes en Req
        if (updateTaskDto.title) {
            task.title = updateTaskDto.title;
        }
        if (updateTaskDto.description) {
            task.description = updateTaskDto.description;
        }

        await task.save();
        return task;
    }
    //Servicio de Delete a tareas
    async delete(id: number, userId: number) {
        const task = await this.taskModel.findOne({ where: { id, userId, status: '1' } });
        if (!task) {
        throw new NotFoundException('Task not found or this task does not belong to the user');
        }
        await task.update({ status: '0'});
        await task.destroy();
        return { 
            "message":"task has been eliminated",
            "error": "Request",
            "statusCode": 200
        }
    }
}
