import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { EventsModule } from './events/events.module';
import { UserModule } from './user/user.module';
import { IntegrationModule } from './integration/integration.module';
import { SkillsModule } from './skills/skills.module';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_DATABASE,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASS,
      database: DB_DATABASE,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
    }),
    ChatModule,
    EventsModule,
    AuthModule,
    UserModule,
    IntegrationModule,
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/auth', method: RequestMethod.GET },
        { path: '/api/user', method: RequestMethod.GET },
        { path: '/api/user', method: RequestMethod.PUT },
        { path: '/api/integrations', method: RequestMethod.GET },
        { path: '/api/integrations', method: RequestMethod.POST },
        { path: '/api/integrations/:id', method: RequestMethod.DELETE },
        { path: '/api/integrations/:id/authorize', method: RequestMethod.POST },
        { path: '/api/messages', method: RequestMethod.GET },
        { path: '/api/skills', method: RequestMethod.GET },
        { path: '/api/skills', method: RequestMethod.POST },
        { path: '/api/skills/:id', method: RequestMethod.PUT },
        { path: '/api/skills/:id', method: RequestMethod.DELETE },
      );
  }
}
