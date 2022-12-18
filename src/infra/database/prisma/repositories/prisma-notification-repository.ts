import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '@application/repositories/notifications-repository';
import { Notification } from '@application/entities/notification/notification';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return (
      await this.prismaService.notification.findMany({ where: { recipientId } })
    ).map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.prismaService.notification.count({ where: { recipientId } });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toRaw(notification);

    await this.prismaService.notification.update({
      where: { id: notification.id },
      data: raw,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toRaw(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
