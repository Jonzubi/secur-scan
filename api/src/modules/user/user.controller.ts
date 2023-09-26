import { ICreateUser } from '@jonzubi/securscan-shared';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(@Body() user: ICreateUser, @Res() res: Response) {
    await this.usersService.createUser(user);

    res.sendStatus(HttpStatus.CREATED);
  }
}
