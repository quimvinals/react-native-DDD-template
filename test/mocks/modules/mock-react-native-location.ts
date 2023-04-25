export const mockSubscription = jest.fn();

jest.mock('react-native-location', () => {
  return {
    checkPermission: jest.fn(),
    configure: jest.fn(),
    getLatestLocation: jest.fn(),
    requestPermission: jest.fn(),
    subscribeToLocationUpdates: jest.fn(() => mockSubscription),
  };
});
