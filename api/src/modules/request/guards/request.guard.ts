import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ICreateRequest, RequestType } from '@jonzubi/securscan-shared';
import { Types } from 'mongoose';
import { RequestService } from '../request.service';
import { isIP } from 'net';

@Injectable()
export class RequestGuard implements CanActivate {
  constructor(private readonly requestService: RequestService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { requestType, ipToScan, requestToScan } =
      request.body as ICreateRequest;

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
      throw new BadRequestException('errors.requiredIptoscan');

    if (!requestToScan && requestToScanNeedIn.includes(requestType))
      throw new BadRequestException('errors.requiredRequestToScan');

    if (ipToScanIsIp.includes(requestType) && isIP(ipToScan) !== 4)
      throw new BadRequestException('errors.invalidIp');

    if (requestType === RequestType.MITIGATION_ADVICES) {
      if (!Types.ObjectId.isValid(requestToScan))
        throw new BadRequestException('errors.invalidRequestToScanObjectId');

      const request = await this.requestService.getRequestById(
        requestToScan as unknown as Types.ObjectId,
      );

      if (request.requestType !== RequestType.DETAILED_SCAN)
        throw new BadRequestException('errors.invalidRequestToScanType');
    }

    return true;
  }
}
