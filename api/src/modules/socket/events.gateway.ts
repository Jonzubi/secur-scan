import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private clients: Map<Types.ObjectId, string> = new Map<
    Types.ObjectId,
    string
  >();

  afterInit() {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.clients.set(new Types.ObjectId(userId), client.id);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.clients].find(([_, id]) => id === client.id)?.[0];
    if (userId) {
      this.clients.delete(userId);
    }
  }

  emitRequestStatusChange(userId: Types.ObjectId) {
    const socketId = [...this.clients].find(([id]) => id.equals(userId))?.[1];
    const client = this.server.sockets.sockets.get(socketId);
    if (client) {
      client.emit('requestStatusChanged');
    }
  }
}
