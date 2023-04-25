import { Stop } from './stop';
import { IStop } from './stop.interface';

describe('Stop', function () {
  let instance: IStop;

  beforeEach(function () {
    instance = new Stop('test-id');
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });

  describe('completeStop', function () {
    it('sets the stop as completed', function () {
      instance.completeStop();

      expect(instance.completed).toBeTruthy();
    });
  });

  describe('uncompleteStop', function () {
    it('set the stop as not completed', function () {
      instance.completeStop();
      instance.uncompleteStop();

      expect(instance.completed).toBeFalsy();
    });
  });

  describe('get sequenceNumber', function () {
    it('returns 0', function () {
      expect(instance.sequenceNumber).toBe(0);
    });
  });
});
