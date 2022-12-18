import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipient notification', () => {
  it('should be able to count all recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-01' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-02' }),
    );

    const { count } = await countNotification.execute({
      recipientId: 'recipient-01',
    });

    expect(count).toEqual(2);
  });
});
