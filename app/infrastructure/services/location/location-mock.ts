import { DeviceEventEmitter, Linking } from 'react-native';

import env from '~/config/env';
import { Geocode, IGeoCode } from '~/domain/entities';

import { ILocationService } from './location.interface';

export interface IMockLocationService extends ILocationService {
  mockLocation: (location: IGeoCode | null) => void;
  mockGpsState: (enabled: boolean) => void;
}

export class MockLocationService implements IMockLocationService {
  private gpsEnabled = true;
  private location = new Geocode(3, 4);
  private locationUpdatesSubscription: () => void;
  public setupCalled = false;

  async setup() {
    this.subscribeToLocationUpdates();
    this.setupCalled = true;
  }

  public mockLocation(location: IGeoCode | null): void {
    this.location = location;
    this.locationUpdatesSubscription && this.locationUpdatesSubscription();
  }

  async getLocation(): Promise<IGeoCode | null> {
    return this.location;
  }

  async getSpeed(): Promise<Number | null> {
    return 10;
  }

  addListener(callback: (enabled: boolean) => void): void {
    env.MOCK_ENVIRONMENT ? callback(this.gpsEnabled) : jest.fn(() => callback(this.gpsEnabled));
  }

  removeListener(callback: (enabled: boolean) => void): void {
    DeviceEventEmitter.removeListener(undefined, callback);
  }

  public getCurrentLocationSubscription() {
    return this.locationUpdatesSubscription;
  }

  subscribeToLocationUpdates(): void {
    this.locationUpdatesSubscription = env.MOCK_ENVIRONMENT
      ? () => {
          return new Geocode(3, 4);
        }
      : jest.fn(() => {
          return new Geocode(3, 4);
        });
  }

  unsubscribeFromLocationUpdates() {
    this.locationUpdatesSubscription = null;
  }

  getLastKnownLocation() {
    return this.location;
  }

  isGpsEnabled(): Promise<boolean> {
    return Promise.resolve(this.gpsEnabled);
  }

  mockGpsState(enabled: boolean): void {
    this.gpsEnabled = enabled;
  }

  requestEnableLocationServices(): void {
    Linking.openSettings();
  }
}
