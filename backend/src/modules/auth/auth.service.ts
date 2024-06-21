import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { authDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Auth Service');

  async login(where: authDto) {
    this.logger.log('log');
    return await this.prisma.user.findUnique({ where: where });
  }

  async register(data: authDto) {
    this.logger.log('register');
    return await this.prisma.user.create({
      data: data,
    });
  }
}
