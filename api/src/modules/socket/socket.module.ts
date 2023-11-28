import { Module } from '@nestjs/common';
import { RequestGateway } from './socket-request.gateway';
import { SocketServerService } from './socket-server.service';

@Module({
  providers: [SocketServerService, RequestGateway],
})
export class SocketModule {}
