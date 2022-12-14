import { Module } from '@nestjs/common';

import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';
import { NotificationRepository } from '../../application/repositories/notifications-repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
