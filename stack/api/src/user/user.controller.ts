import { Controller, Get, Put, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/api/user')
  async fetch(@Request() req): Promise<User> {
    return this.userService.fetch(req.user.sub);
  }

  @Put('/api/user')
  async update(@Request() req): Promise<User> {
    return this.userService.update(req.user.sub, req.body.profile);
  }
}
