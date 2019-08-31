import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [ChatModule],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
