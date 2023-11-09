import { ICreateRequest, RequestType, isIP } from '@jonzubi/securscan-shared';
import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { Response } from 'express';
import { UserDocument } from '../user/schema/user.schema';
import { QueueService } from './queue.service';

@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly queueService: QueueService,
  ) {}

  @Post()
  async createRequest(
    @Req() req: any,
    @Body() body: ICreateRequest,
    @Res() res: Response,
  ) {
    const { _id, tier } = req.user as UserDocument;
    const { requestType, ipToScan, requestToScan } = body;

    const validRequestTypes = Object.values(RequestType);

    if (!validRequestTypes.includes(requestType))
      throw new BadRequestException('Invalid requestType');

    const ipToScanNeedIn = [
      RequestType.RESOLVE_DNS,
      RequestType.SCAN_IP,
      RequestType.DETAILED_SCAN,
    ];
    const requestToScanNeedIn = [RequestType.MITIGATION_ADVICES];
    const ipToScanIsIp = [RequestType.SCAN_IP, RequestType.DETAILED_SCAN];

    if (!ipToScan && ipToScanNeedIn.includes(requestType))
      throw new BadRequestException('iptoscan is required');

    if (!requestToScan && requestToScanNeedIn.includes(requestType))
      throw new BadRequestException('requestToScan is required');

    if (ipToScanIsIp.includes(requestType) && !isIP(ipToScan))
      throw new BadRequestException('iptoscan must be an ip');

    const newRequest = await this.requestService.createRequest(body, _id);
    await this.queueService.addToQueue({
      requestId: newRequest._id,
      tier,
    });

    res.sendStatus(HttpStatus.CREATED);
    res.send();
  }
}
