import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { authDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: authDto) {
    const res = this.authService.login(data);

    if (!res) {
      throw new HttpException(
        'Login failed - email or password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return { status: HttpStatus.OK, token: (await res).access_token };
  }

  @Post('register')
  async register(@Body() data: authDto) {
    const user = this.authService.register(data);

    if (!user) {
      throw new HttpException('Register failed', HttpStatus.BAD_REQUEST);
    }

    return { status: HttpStatus.CREATED, msg: 'Register succes' };
  }
}
