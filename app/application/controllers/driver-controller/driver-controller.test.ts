import { Token } from '~/domain';

import { DriverController } from './driver-controller';
import { IDriverController } from './driver-controller.interface';

describe('DriverController', function () {
  let instance: IDriverController;

  beforeEach(function () {
    instance = new DriverController();
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });

  describe('isLoggedIn', function () {
    it('should be null by default', function () {
      expect(instance.isLoggedIn).toBe(null);
    });

    it('setLoggedIn', function () {
      instance.setIsLoggedIn(true);

      expect(instance.isLoggedIn).toBeTruthy();

      instance.setIsLoggedIn(false);

      expect(instance.isLoggedIn).toBeFalsy();
    });
  });

  describe('removeToken', function () {
    it('should be null token and fleetEngineAccessToken', function () {
      instance.removeToken();
      expect(instance.token).toBeNull();
      expect(instance.fleetEngineAccessToken).toBeNull();
    });
  });

  describe('userInfo', function () {
    it('sets user info if successful', function () {
      instance.setUserInfo({
        firstName: 'John',
        fleetName: 'Drivers',
        lastName: 'Walker',
        name: 'Name',
        phone: '1234',
      });

      expect(instance.userInfo.firstName).toBe('John');
      expect(instance.userInfo.fleetName).toBe('Drivers');
      expect(instance.userInfo.lastName).toBe('Walker');
      expect(instance.userInfo.name).toBe('Name');
      expect(instance.userInfo.phone).toBe('1234');
    });
  });

  describe('total cash', function () {
    it('sets user info if successful', async function () {
      await instance.setTotalCash({
        amount: 158.34,
        totalOrders: 1,
      });

      expect(instance.totalCash.amount).toBe(158.34);
      expect(instance.totalCash.totalOrders).toBe(1);
    });
  });

  describe('isLoginNeeded', function () {
    it('login not needed', function () {
      const instance = new DriverController(
        new Token('access-token', 'refresh-token')
      );

      expect(instance.isLoginNeeded).toBeFalsy();
    });

    it('token invalid', function () {
      const instance = new DriverController(
        new Token('access-token', 'refresh-token', true)
      );

      expect(instance.isLoginNeeded).toBeTruthy();
    });
  });
});
