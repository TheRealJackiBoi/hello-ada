import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Task Service');

  async getTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task | null> {
    this.logger.log('taskById');
    const task = await this.prisma.task.findUnique({
      where: taskWhereUniqueInput,
    });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async getAllTasks() {
    this.logger.log('getAllTasks');

    const tasks = await this.prisma.task.findMany();

    if (!tasks.length) {
      throw new HttpException('Tasks not found', HttpStatus.NOT_FOUND);
    }

    return tasks;
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    this.logger.log('createTask');

    const task = await this.prisma.task.create({
      data,
    });

    if (!task) {
      throw new HttpException("Couldn't create task", HttpStatus.BAD_REQUEST);
    }

    return task;
  }

  async updateTask(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    this.logger.log('updateTask');

    const task = await this.prisma.task.update({
      where: params.where,
      data: params.data,
    });

    if (!task) {
      throw new HttpException("Couldn't update task", HttpStatus.BAD_REQUEST);
    }

    return task;
  }

  async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    this.logger.log('deleteTask');

    const task = await this.prisma.task.delete({
      where: where,
    });

    if (!task) {
      throw new HttpException("Couldn't delete task", HttpStatus.BAD_REQUEST);
    }

    return task;
  }
}
