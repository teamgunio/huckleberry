import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Integration } from './integration.entity';

import fetch from 'node-fetch';
const crypto = require('crypto');

const {
  ENCRYPTION_KEY,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_REDIRECT,
} = process.env;

const algorithm = 'aes-256-cbc';

@Injectable()
export class IntegrationService {
  constructor(
    @InjectRepository(Integration)
    private readonly integrationRepository: Repository<Integration>,
  ) {}

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`; 
  }

  private decrypt(text: string): string {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encrypted = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted.toString();
  }

  async findAll(): Promise<Integration[]> {
    return await this.integrationRepository.find();
  }

  async create(user: any, props: any): Promise<Integration> {
    const integration = new Integration();
    integration.type = integration.name = props.type;
    integration.user = user.sub;
    integration.createdAt = new Date();
    return await this.integrationRepository.save(integration);
  }

  async authorize(user: any, id: any, code: any): Promise<boolean> {
    const uri = `https://github.com/login/oauth/access_token`;
    const redirect = `${GITHUB_CLIENT_REDIRECT}`;
    const url = `${uri}?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}&redirect_uri=${redirect}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
      })

      const token = await res.json();
      const integration = await this.integrationRepository.findOne({id});

      integration.access_token = this.encrypt(token.access_token);
      await this.integrationRepository.save(integration);

      return true;
    } catch(err) {
      console.error(err);
      return false;
    }
  }

  async delete(user: any, id: string): Promise<boolean> {
    try {
      const integration = await this.integrationRepository.delete(id);
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }

  }
}
