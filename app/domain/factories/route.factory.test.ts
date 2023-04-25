import { routeFactory } from './route.factory';

describe('routeFactory', function () {
  let instance;

  beforeEach(function () {
    instance = routeFactory({
      driver_id: 'test-driver-id',
      // isSequenced: true,
      stops: [],
    });
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
