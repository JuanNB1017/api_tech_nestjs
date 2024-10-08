import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
@Controller('tasks')
@UseGuards(JwtAuthGuard) // Aplica la guardia a todas las rutas de este controlador
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async getAll() {
        const tasks = await this.tasksService.findAll();
        // Verificar si no hay tareas
        if (tasks.length === 0) {
            return {
                "message": 'No tasks avaible',
                "error": "Request",
                "statusCode": 200,
            };
        }
        return tasks;
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
        if(req.body.title == '' || req.body.description == '' ){
            return { 
                "message":"The fields cannot be empty",
                "error": "Bad Request",
                "statusCode": 400
            }
        }
        else
            return this.tasksService.create(createTaskDto, req.user.id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @Req() req) {
        if(req.body.state == null || req.body.state ==''){
            return { 
                "message":"State is required",
                "error": "Bad Request",
                "statusCode": 400
            }
        }
        else{
            return this.tasksService.update(id, updateTaskDto, req.user.id);
        }
    }

    @Delete(':id')
    delete(@Param('id') id: number, @Req() req) {
        return this.tasksService.delete(id, req.user.id);
    }
}
