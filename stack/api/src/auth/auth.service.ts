import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async validate(subject: string): Promise<User | undefined> {
    let user = await this.userRepository.findOne({ subject });
    if (!user) {
      user = new User();
      user.subject = subject;
    }
    return user;
  }
}
