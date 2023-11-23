import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: User, token: string) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;
    const sentmail = await this.mailerService.sendMail({
      to: user.email,
      subject: 'This is the first mail',
      template: 'welcome',
      context: {
        // filling <%= %> brackets with content
        name: user.name,
        confirmation_url,
      },
    });
  }
}
