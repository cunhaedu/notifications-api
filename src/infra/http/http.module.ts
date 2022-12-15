import { Module } from '@nestjs/common';

import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationController } from './controllers/notification.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotification],
})
export class HttpModule {}
