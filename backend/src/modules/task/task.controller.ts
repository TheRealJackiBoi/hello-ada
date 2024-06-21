import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto';
import { TaskDto } from './dto';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.taskService.getTask({ id: id });
  }

  @Post()
  async createTask(@Body() taskData: CreateTaskDto): Promise<Task> {
    const { title, description, creatorEmail, dueDate } = taskData;
    return this.taskService.createTask({
      title,
      description,
      creator: {
        connect: { email: creatorEmail },
      },
      dueDate,
    });
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: TaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask({
      where: { id: id },
      data: taskData,
    });
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask({ id: id });
  }
}
