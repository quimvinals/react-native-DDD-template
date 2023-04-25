// import { IMockApplication, MockApplication } from '~/application';
// import { IMockInfrastructure } from '~/infrastructure';

jest.mock('jwt-decode', () =>
  jest.fn().mockReturnValue({
    aud: [
      'https://lmo-backend.sandbox.paack.app',
      'https://sandbox-paack.eu.auth0.com/userinfo',
    ],
    azp: 'gP277DrWup34kKL9jpWTMcv7J4Ge5bIR',
    exp: 1625576068,
    'https://paack.co': {
      id: 'd34e6b1c-7eaf-4855-a8af-4c3285c2c751',
      roles: [],
    },
    iat: 1625489668,
    iss: 'https://sandbox-paack.eu.auth0.com/',
    permissions: [],
    scope: 'openid profile email offline_access',
    sub: 'google-oauth2|113724219825946040864',
  })
);

describe('Login Use Case', function () {
  // let instance: IMockApplication;
  // let infrastructure: IMockInfrastructure;
  // let driverController: IDriverController;
  // let subject: IRequestSubject<void>;
  // const handleRequestCompleted = jest.fn();
  // const handleValueReceived = jest.fn();
  // let apiSetupSpy: jest.SpyInstance;

  beforeEach(function () {
    // instance = new MockApplication();
    // infrastructure = instance.infrastructure;
    // driverController = instance.controllers.DriverController;
    // apiSetupSpy = jest.spyOn(infrastructure.api, 'setup');
  });

  it.todo('Implement Log In use case');
});
