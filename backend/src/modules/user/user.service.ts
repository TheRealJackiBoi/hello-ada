import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User Service');

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserDto | null> {
    this.logger.log('userById');

    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    return plainToInstance(UserDto, user);
  }
  async getAllUsers() {
    this.logger.log('getAllUsers');

    const users = await this.prisma.user.findMany();

    return users;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    this.logger.log('createUser');

    const createUser = await this.prisma.user.create({
      data,
    });

    return createUser;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    this.logger.log('updateUser');

    const updateUser = await this.prisma.user.update({
      where: params.where,
      data: params.data,
    });

    return updateUser;
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    this.logger.log('deleteUser');

    const deleteUser = await this.prisma.user.delete({
      where,
    });

    return deleteUser;
  }
}
