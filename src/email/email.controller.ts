import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('enviar')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('template') template: string,
  ) {
    await this.emailService.sendEmail(to, subject, template);
    return { message: 'Email sent successfully' };
  }
}
