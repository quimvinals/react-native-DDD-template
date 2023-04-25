import { DeviceEventEmitter, Linking } from 'react-native';
import RNLocation, {
  ConfigureOptions,
  subscribeToLocationUpdates,
} from 'react-native-location';
import sinon from 'sinon';

import { Fixtures } from '~/test/fixtures';
import { mockSubscription } from '~/test/mocks/modules/mock-react-native-location';

import { LocationService } from './location';

const OPTIONS: ConfigureOptions = {
  distanceFilter: 5.0,
};

describe('LocationService', function () {
  let instance: LocationService;

  const checkPermission = sinon.stub(RNLocation, 'checkPermission');
  const getLatestLocation = sinon.stub(RNLocation, 'getLatestLocation');

  beforeEach(function () {
    jest.clearAllMocks();
    instance = new LocationService(OPTIONS);
  });

  describe('setup', function () {
    it('configures RNLocation', async function () {
      await instance.setup();

      expect(RNLocation.configure).toHaveBeenCalledWith(OPTIONS);
    });
  });

  describe('we call getLocation', function () {
    it('with permissions', async function () {
      checkPermission.resolves(true);
      getLatestLocation.resolves({
        accuracy: 95,
        altitude: 865,
        altitudeAccuracy: 90,
        course: 5,
        latitude: 42.3435,
        longitude: 2.345,
        speed: 40,
        timestamp: 12144,
      });

      expect(await instance.getLocation()).toMatchObject({
        latitude: 42.3435,
        longitude: 2.345,
      });
    });

    it('without permissions', async function () {
      checkPermission.resolves(false);

      expect(await instance.getLocation()).toBeNull();
    });
  });

  describe('we call getSpeed', function () {
    it('with permissions', async function () {
      checkPermission.resolves(true);
      getLatestLocation.resolves(Fixtures.Libraries.RNLocation);

      expect(await instance.getSpeed()).toBe(
        Fixtures.Libraries.RNLocation.speed
      );
    });

    it('without permissions', async function () {
      checkPermission.resolves(false);

      expect(await instance.getSpeed()).toBeNull();
    });
  });

  describe('The location settings service', function () {
    const callback = jest.fn();

    it('triggers the callback upon location service status change', function () {
      instance.addListener(callback);
      DeviceEventEmitter.emit('GPS_PROVIDER_EVENT');
      expect(callback).toHaveBeenCalled();
    });

    it('restores all listeners', function () {
      instance.addListener(callback);
      instance.removeListener(callback);
      DeviceEventEmitter.emit('GPS_PROVIDER_EVENT');
      expect(callback).not.toHaveBeenCalled();
    });

    it('requests to open settings', function () {
      const spy = jest.spyOn(Linking, 'openSettings');
      instance.addListener(callback);
      instance.requestEnableLocationServices();
      expect(spy).toBeCalled();
    });
  });

  describe('subcribeToLocationUpdates', function () {
    beforeEach(function () {
      instance.subscribeToLocationUpdates();
    });

    it('it creates a subscription', function () {
      expect(subscribeToLocationUpdates).toHaveBeenCalled();
    });

    it('saves the subscription to locationUpdatesSubscription', function () {
      expect(instance.getCurrentLocationSubscription()).toBeTruthy();
    });

    it('if there exists a subcription, we do not create a new one', function () {
      instance.subscribeToLocationUpdates();
      expect(subscribeToLocationUpdates).toHaveBeenCalledTimes(1);
    });
  });

  describe('unsubscribeFromLocationUpdates', function () {
    it('if we are subscribed, we delete the subscription', function () {
      instance.subscribeToLocationUpdates();
      expect(instance.getCurrentLocationSubscription()).toBeTruthy();

      instance.unsubscribeFromLocationUpdates();
      expect(mockSubscription).toHaveBeenCalled();
    });
  });
});
