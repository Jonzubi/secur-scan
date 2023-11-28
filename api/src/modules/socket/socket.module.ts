import { Module } from '@nestjs/common';
import { SocketRequestService } from './socket-request.service';

@Module({
  providers: [SocketRequestService],
})
export class SocketModule {}
