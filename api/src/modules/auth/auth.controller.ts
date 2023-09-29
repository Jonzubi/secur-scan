import { IUser } from '@jonzubi/securscan-shared';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Public } from 'src/decorators/IsPublic';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { HttpService } from 'src/services/http-service/http-service.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  @Post('login')
  @Public()
  async signIn(@Body() user: IUser, @Res() res: Response): Promise<any> {
    const userData = await this.authService.signIn(user);
    res.status(HttpStatus.OK);
    res.send(userData);
  }
}
