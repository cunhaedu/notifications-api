import { Notification } from '@application/entities/notification/notification';
import { NotificationRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

type GetRecipientRequest = {
  recipientId: string;
};

type GetRecipientResponse = {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: GetRecipientRequest): Promise<GetRecipientResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
