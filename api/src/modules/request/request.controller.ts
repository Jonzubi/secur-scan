import { ICreateRequest } from '@jonzubi/securscan-shared';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { Response } from 'express';
import { UserDocument } from '../user/schema/user.schema';
import { QueueService } from './queue.service';
import { PriceGuard } from './guards/price.guard';
import { RequestGuard } from './guards/request.guard';

@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly queueService: QueueService,
  ) {}

  @Post()
  @UseGuards(RequestGuard, PriceGuard)
  async createRequest(
    @Req() req: any,
    @Body() body: ICreateRequest,
    @Res() res: Response,
  ) {
    const { _id, tier } = req.user as UserDocument;

    const newRequest = await this.requestService.createRequest(body, _id);
    await this.queueService.addToQueue({
      requestId: newRequest._id,
      tier,
    });

    res.sendStatus(HttpStatus.CREATED);
    res.send();
  }
}
