import { Notification } from '@application/entities/notification/notification';

export class PrismaNotificationMapper {
  static toRaw(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }
}
