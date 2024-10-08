import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';

@Module({
  imports: [SequelizeModule.forFeature([Task])], // Importa el modelo Task
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
