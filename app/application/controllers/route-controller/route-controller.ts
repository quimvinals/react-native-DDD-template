import AsyncStorage from '@react-native-community/async-storage';
import { action, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { IRoute, Route } from '~/domain';
import { IInfrastructure } from '~/infrastructure';
import { RequestSubject, RequestSubjectsMap } from '~/observables';

import { IRouteController } from './route-controller.interface';

export enum RouteRequests {
  RequestRouteDocumentID = 'REQUEST_ROUTE_DOCUMENT_ID',
}

export class RouteController implements IRouteController {
  public route: IRoute;
  public driverId: string;
  public routeId: string;
  // @ts-ignore
  private infrastructure: IInfrastructure;

  public requestsSubjectsMap: RequestSubjectsMap<RouteRequests> = {
    [RouteRequests.RequestRouteDocumentID]: new RequestSubject<string>(
      RouteRequests.RequestRouteDocumentID
    ),
  };

  constructor(infrastructure?: IInfrastructure) {
    this.route = new Route();
    this.infrastructure = infrastructure;
    makeObservable(this, {
      driverId: observable,
      route: observable,
      setRoute: action,
    });
  }

  public setRoute(route: IRoute) {
    this.route = route;
  }

  setDriverId: (driverId: string) => void;

  public async setup(): Promise<void> {
    await makePersistable(
      this,
      {
        name: 'RouteController',
        properties: ['driverId'],
        storage: AsyncStorage,
      },
      { fireImmediately: true }
    );
  }
}
