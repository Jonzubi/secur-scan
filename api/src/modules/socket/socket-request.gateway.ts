import { WebSocketGateway } from '@nestjs/websockets';
import { Types } from 'mongoose';
import { SocketServerService } from './socket-server.service';

@WebSocketGateway()
export class RequestGateway {
  constructor(private socketServerService: SocketServerService) {}

  emitRequestFinished(userId: Types.ObjectId) {
    const client = this.socketServerService.getClient(userId);
    if (client) {
      client.emit('requestFinished');
    }
  }
}
