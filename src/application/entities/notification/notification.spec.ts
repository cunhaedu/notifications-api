import { Content } from './content';
import { Notification } from './notification';

describe('Notification test suit', () => {
  it('should be able to create a notification', () => {
    const content = new Content('You have receive a new friend invite');

    const notification = new Notification({
      content,
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
