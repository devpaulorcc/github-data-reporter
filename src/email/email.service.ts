import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text: body,
      });

      console.log(`✅ E-mail enviado com sucesso para ${to}`);
    } catch (error) {
      console.error(`❌ Erro ao enviar e-mail: ${error.message}`);
    }
  }
}
