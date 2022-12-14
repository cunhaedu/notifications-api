import { Notification } from 'src/application/entities/notification/notification';
import { NotificationRepository } from '../../src/application/repositories/notifications-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
