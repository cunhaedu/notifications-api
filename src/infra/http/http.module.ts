import { Module } from '@nestjs/common';

import { CountRecipientNotifications } from '@application/use-cases/notification/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/notification/get-recipient-notifications';
import { UnreadNotification } from '@application/use-cases/notification/unread-notification';
import { CancelNotification } from '@application/use-cases/notification/cancel-notification';
import { SendNotification } from '@application/use-cases/notification/send-notification';
import { ReadNotification } from '@application/use-cases/notification/read-notification';
import { NotificationController } from './controllers/notification.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
  ],
})
export class HttpModule {}
