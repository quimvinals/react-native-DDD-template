jest.mock('react-native-settings', () => ({
  ACTION_LOCATION_SOURCE_SETTINGS: 'ACTION_LOCATION_SOURCE_SETTINGS',
  ENABLED: 'ENABLED',
  GPS_PROVIDER_EVENT: 'GPS_PROVIDER_EVENT',
  LOCATION_SETTING: 'LOCATION_SETTING',
  getSetting: jest.fn(),
  openSetting: jest.fn(),
}));
