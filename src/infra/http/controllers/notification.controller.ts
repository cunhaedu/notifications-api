import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CountRecipientNotifications } from '@application/use-cases/notification/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/notification/get-recipient-notifications';
import { CancelNotification } from '@application/use-cases/notification/cancel-notification';
import { UnreadNotification } from '@application/use-cases/notification/unread-notification';
import { ReadNotification } from '@application/use-cases/notification/read-notification';
import { SendNotification } from '@application/use-cases/notification/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationController {
  constructor(
    private cancelNotification: CancelNotification,
    private unreadNotification: UnreadNotification,
    private readNotification: ReadNotification,
    private sendNotification: SendNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Post()
  async send(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
