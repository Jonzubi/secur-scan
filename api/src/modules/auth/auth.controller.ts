import { ISignIn } from '@jonzubi/securscan-shared';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from 'src/decorators/IsPublic';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { UserDocument } from '../user/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @Public()
  async signIn(@Body() user: ISignIn, @Res() res: Response): Promise<any> {
    const { userId, email, tier, tokens, access_token } =
      await this.authService.signIn(user);
    res.status(HttpStatus.OK);
    res.send({
      userId,
      email,
      tier,
      tokens,
      access_token,
    });
  }

  @Get('profile')
  async getProfile(@Req() req, @Res() res: Response) {
    const { email } = req.user as UserDocument;
    const foundUser = await this.userService.findUserByEmail(email);
    if (foundUser === null) throw new UnauthorizedException();
    const { tier, tokens, _id } = foundUser;

    res.status(HttpStatus.OK);
    res.send({
      userId: _id,
      email,
      tier,
      tokens,
    });
  }
}
