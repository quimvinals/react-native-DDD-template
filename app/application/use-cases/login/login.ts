import { IDriverController, IRouteController } from '~/application/controllers';
import { IInfrastructure } from '~/infrastructure';
import { IRequestSubject, RequestSubject } from '~/observables';

export type Login = {
  args: [];
  responseType: IRequestSubject<void>;
};

/**
 *  @param infrastructure
 *  @param driverController
 *  @param routeController
 *  @description Logs in the user to Auth0, requests Firebase credentials to BE, logs the user into Firebase and
 * asks RouteController to subscribe to route updates
 */
export function login(
  _infrastructure: IInfrastructure,
  _driverController: IDriverController,
  _routeController: IRouteController
): Login['responseType'] {
  const subject = new RequestSubject<void>('Login');
  subject.startRequest();

  setTimeout(() => {
    subject.completeRequest();
  }, 1500);
  /*   infrastructure.services.auth
    .login()
    .then((token) => {
      driverController.setToken(token);
      infrastructure.api.setup(token);
      infrastructure.services.firebase.analytics.setUserId(token.userId);
      driverController.setIsLoggedIn(true);
    })
    .then(() => {
      return infrastructure.api.requestFirestoreCredentials(driverController.driverID);
    })
    .then((res: DriverCredentialsResponse) => {
      const {
        data: { accessToken },
      } = res;
      infrastructure.services.firebase.setup(accessToken);
    })
    .then(() => {
      routeController.setDriverId(driverController.driverID);
      subject.completeRequest();
    })
    .catch((error: Error) => {
      driverController.setIsLoggedIn(false);
      driverController.setToken(null);
      infrastructure.services.firebase.analytics.setUserId(null);
      subject.failRequest(error);
    }); */

  return subject;
}
