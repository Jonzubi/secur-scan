import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from './schema/request.schema';
import { QueueService } from './subservices/queue.service';
import { Queue, QueueSchema } from './schema/queue.schema';
import { UserModule } from '../user/user.module';
import { RequestResolveService } from './subservices/requestResolve.service';
import {
  RequestResolve,
  RequestResolveSchema,
} from './schema/requestResolve.schema';
import { EventsGateway } from '../socket/events.gateway';

@Module({
  controllers: [RequestController],
  providers: [
    RequestService,
    QueueService,
    RequestResolveService,
    EventsGateway,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Request.name, schema: RequestSchema },
      { name: Queue.name, schema: QueueSchema },
      { name: RequestResolve.name, schema: RequestResolveSchema },
    ]),
    UserModule,
  ],
})
export class RequestModule {}
