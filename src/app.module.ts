import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './jobs/cron.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    ScheduleModule.forRoot(),
  ],
  providers: [CronService],
})
export class AppModule {}
