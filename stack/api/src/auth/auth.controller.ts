import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

  // @Post()
  // validate(): Promise<User> {
  //   return this.authService.authorize();
  // }
}
