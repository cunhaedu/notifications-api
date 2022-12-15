import { Injectable } from '@nestjs/common';

import { NotificationRepository } from '@application/repositories/notifications-repository';
import { Notification } from '@application/entities/notification/notification';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toRaw(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
