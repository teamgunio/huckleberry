import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async fetch(subject: string): Promise<User> {
    let user = await this.userRepository.findOne({ subject });
    if (!user) {
      user = new User();
      user.subject = subject;
    }
    return user;
  }

  async update(subject: string, profile: any): Promise<User> {
    let user = await this.fetch(subject);
    if (!user.id) {
      user.username = user.email = profile.email;
      user.createdAt = new Date();
      user = await this.userRepository.save(user);
    }
    return user
  }
}
