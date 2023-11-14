import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { ISendMail } from './interfaces/mail';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
  }

  public async sendMail(sendMailOptions: ISendMail) {
    const { email, verificationToken } = sendMailOptions;

    const source = readFileSync(
      `${process.cwd()}\\templates\\emailVerification.hbs`,
      'utf8',
    );
    const template = handlebars.compile(source);
    const html = template({
      URL_VERIFICATION: `${this.configService.get(
        'API_URL',
      )}/user/verify/${verificationToken}`,
    });

    await this.resend.emails.send({
      from: 'SecurScan <onboarding@resend.dev>',
      to: email,
      subject: 'Verify mail',
      html,
    });
  }
}
