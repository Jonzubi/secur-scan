import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserDocument } from '../user/schema/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class SocketServerService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Map<Types.ObjectId, Socket> = new Map<
    Types.ObjectId,
    Socket
  >();

  handleConnection(client: Socket, ...args: any[]) {
    const { _id } = args[0].user as UserDocument;
    this.clients.set(_id, client);
  }

  handleDisconnect(client: Socket) {
    const disconnectedUserId = Array.from(this.clients.entries()).find(
      ([_, socket]) => socket === client,
    )?.[0];
    if (disconnectedUserId) {
      this.clients.delete(disconnectedUserId);
    }
  }

  getClient(userId: Types.ObjectId): Socket | undefined {
    return this.clients.get(userId);
  }
}
