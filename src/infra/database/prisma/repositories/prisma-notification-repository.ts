import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification/notification';
import { NotificationRepository } from '../../../../application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        content: notification.content.value,
        category: notification.category,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
      },
    });
  }
}
