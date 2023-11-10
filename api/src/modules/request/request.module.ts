import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from './schema/request.schema';
import { QueueService } from './queue.service';
import { Queue, QueueSchema } from './schema/queue.schema';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [RequestController],
  providers: [RequestService, QueueService],
  imports: [
    MongooseModule.forFeature([
      { name: Request.name, schema: RequestSchema },
      { name: Queue.name, schema: QueueSchema },
    ]),
    UserModule,
  ],
})
export class RequestModule {}
