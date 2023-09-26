import { ICreateUser } from '@jonzubi/securscan-shared';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { MailService } from '../mail/mail.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async createUser(@Body() user: ICreateUser, @Res() res: Response) {
    if (!user.email || !user.password || !user.username) {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      res.send();
      return;
    }

    const newUser = await this.usersService.createUser(user);

    await this.mailService.sendMail({
      email: newUser.email,
      verificationToken: newUser.emailVerificationToken,
    });

    res.sendStatus(HttpStatus.CREATED);
    res.send();
  }
}
