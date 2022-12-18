import { NotificationRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

type CountRecipientRequest = {
  recipientId: string;
};

type CountRecipientResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientRequest,
  ): Promise<CountRecipientResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
