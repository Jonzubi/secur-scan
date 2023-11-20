import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDocument } from '../../user/schema/user.schema';
import { ICreateRequest, REQUEST_PRICES } from '@jonzubi/securscan-shared';
import { UserService } from '../../user/user.service';

@Injectable()
export class PriceGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { requestType } = request.body as ICreateRequest;
    const { tokens } = request.user as UserDocument;
    const price = REQUEST_PRICES[requestType];
    if (tokens < price) {
      throw new UnauthorizedException('errors.notEnoughTokens');
    }

    await this.userService.subtractToken(request.user._id, price);
    return true;
  }
}
