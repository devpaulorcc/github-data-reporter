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
    @Body('context') context: any,
  ) {
    await this.emailService.sendEmail(to, subject, template, context);
    return { message: 'Email sent successfully' };
  }
}
