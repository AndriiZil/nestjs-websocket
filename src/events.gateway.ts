import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit {
  private clientSocket: any = null;
  @WebSocketServer()
  server: Server;

  afterInit(@ConnectedSocket() client: Socket) {
    this.clientSocket = client;
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log({ data });
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  @SubscribeMessage('onMessage')
  async onMessage(client: Socket, message: any) {
    console.log(message);
    client.emit('message', { message: 'OK' });
  }
  async sendMessage(data: any) {
    console.log({ data });
    this.clientSocket.emit('message', data);
  }
}
