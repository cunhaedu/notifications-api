import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get all recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-01',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-01' }),
        expect.objectContaining({ recipientId: 'recipient-01' }),
      ]),
    );
  });
});
