import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count all recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-01',
    });

    expect(count).toEqual(2);
  });
});
