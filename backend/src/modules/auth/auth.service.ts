import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { authDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private logger = new Logger('Auth Service');

  async login(where: authDto) {
    this.logger.log('login');
    const user = await this.prisma.user.findUnique({ where: where });
    if (!user) {
      throw new HttpException(
        'No user with email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: authDto) {
    this.logger.log('register');
    return await this.prisma.user.create({
      data: data,
    });
  }
}
