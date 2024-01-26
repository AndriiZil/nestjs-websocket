import { Controller, Post } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Controller()
export class EventsController {
  constructor(private eventsGateway: EventsGateway) {}
  @Post('send')
  async sendMessage() {
    await this.eventsGateway.sendMessage({ message: 'Test method' });
  }
}
