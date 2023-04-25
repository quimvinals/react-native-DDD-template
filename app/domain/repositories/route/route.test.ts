import { Stop } from '~/domain/entities/stop';

import { Route } from './route';
import { IRoute } from './route.interface';
import { RouteState } from './types';

describe('Route', function () {
  let instance: IRoute;

  beforeEach(function () {
    instance = new Route();
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });

  describe('setRoute', function () {
    it('sets the route property correctly', function () {
      instance.setRoute([new Stop('test-id')]);

      expect(instance).toMatchSnapshot();
    });
  });

  describe('setRouteState', function () {
    it('sets the routeState property correctly', function () {
      instance.setRouteState(RouteState.NotFullySequenced);

      expect(instance.routeState).toBe(RouteState.NotFullySequenced);
    });
  });

  describe('getStop', function () {
    beforeEach(function () {
      instance.setRoute([new Stop('test-id')]);
    });

    it('returns null if no stop of the route matches the id provided', function () {
      const result = instance.getStop('fake-id');

      expect(result).toBeNull();
    });

    it('returns the stop matching the id provided if it exists', function () {
      const result = instance.getStop('test-id');

      expect(result).toBe(instance.route[0]);
    });
  });

  describe('get isRouteSequenced', function () {
    beforeEach(function () {
      instance.setRoute([new Stop('test-id')]);
    });

    it('returns true if route state is fully sequenced', function () {
      expect(instance.isRouteSequenced).toBeTruthy();
    });

    it('returns false if route state is not fully sequenced', function () {
      instance.setRouteState(RouteState.NotFullySequenced);

      expect(instance.isRouteSequenced).toBeFalsy();
    });
  });
});
