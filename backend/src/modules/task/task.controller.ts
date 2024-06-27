import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto';
import { TaskDto } from './dto';
import { Task } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.taskService.getTask({ id: id });
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTask(
    @Body() taskData: CreateTaskDto,
    @Request() request,
  ): Promise<Task> {
    const { title, description, creatorEmail, dueDate } = taskData;

    if (request.user.email != creatorEmail) {
      throw new UnauthorizedException();
    }

    return this.taskService.createTask({
      title,
      description,
      creator: {
        connect: { email: creatorEmail },
      },
      dueDate,
    });
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask({ id: id });
  }
}
