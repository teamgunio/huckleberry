import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/api/auth')
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

  // @Post()
  // validate(): Promise<User> {
  //   return this.authService.authorize();
  // }
}
