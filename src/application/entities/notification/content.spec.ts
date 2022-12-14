import { Content } from './content';

describe('Notification content test suit', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('You have receive a new friend invite');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with lass than 5 characters', () => {
    expect(() => new Content('You')).toThrow(Error('content length error'));
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow(
      Error('content length error'),
    );
  });
});
