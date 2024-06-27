import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser({ id: id });
  }

  @UseGuards(AuthGuard)
  @Get(':id/tasks')
  async getUserTasks(@Param('id') id: string, @Request() request) {
    if (request.user.id != id) {
      throw new UnauthorizedException('Not allowed to fetch other users tasks');
    }
    return this.userService.getUserTasks(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { email: string; name: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: id },
      data: userData,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }
}
