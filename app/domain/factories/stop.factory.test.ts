import { stopFactory } from './stop.factory';

describe('stopFactory', function () {
  let instance;

  beforeEach(function () {
    instance = stopFactory({
      // completed: true,
      stop_id: 'stop-id',
      // sequence: 1,
    });
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });
});
