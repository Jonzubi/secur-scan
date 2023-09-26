import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMail } from './mail';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('EMAIL_CLIENT_ID'),
      this.configService.get('EMAIL_CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: this.configService.get('EMAIL_REFRESH_TOKEN'),
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('EMAIL_CLIENT_ID'),
        clientSecret: this.configService.get('EMAIL_CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  public async sendMail(sendMailOptions: ISendMail) {
    const { email, verificationToken } = sendMailOptions;
    await this.setTransport();
    this.mailerService.sendMail({
      transporterName: 'gmail',
      to: email, // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'Verify mail', // Subject line
      template: 'emailVerification',
      context: {
        URL_VERIFICATION: `${this.configService.get(
          'API_URL',
        )}/user/verify/${verificationToken}`,
      },
    });
  }
}
