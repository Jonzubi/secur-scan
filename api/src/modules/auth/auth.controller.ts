import { ISignIn, IUser } from '@jonzubi/securscan-shared';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorators/IsPublic';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { HttpService } from 'src/services/http-service/http-service.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  @Post('login')
  @Public()
  async signIn(@Body() user: ISignIn, @Res() res: Response): Promise<any> {
    const userData = await this.authService.signIn(user);
    res.status(HttpStatus.OK);
    res.send(userData);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req, @Res() res: Response) {
    const { email } = req.user;
    const foundUser = await this.userService.findUserByEmail(email);
    if (foundUser === null) throw new UnauthorizedException();
    const { username } = foundUser;
    res.status(HttpStatus.OK);
    res.send({
      email,
      username,
    });
  }
}
