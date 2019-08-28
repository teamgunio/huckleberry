import { Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/api/auth')
  async validate(@Request() req): Promise<User> {
    return this.authService.validate(req.user.sub);
  }
}
