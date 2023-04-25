import { makeAutoObservable } from 'mobx';

import { IStop } from '~/domain/entities/stop';

import { IRoute } from './route.interface';
import { RouteState } from './types';

export class Route implements IRoute {
  public route: IStop[];
  public routeState: RouteState;

  constructor() {
    this.route = [];
    this.routeState = RouteState.FullySequenced;

    makeAutoObservable(this);
  }

  public setRoute(route: IStop[]) {
    this.route = route;
  }

  public setRouteState(state: RouteState) {
    this.routeState = state;
  }

  public getStop(id: string): IStop {
    return this.route.find((stop) => stop.stopId === id) || null;
  }

  get isRouteSequenced(): boolean {
    return this.routeState === RouteState.FullySequenced;
  }

  get visibleStops(): IStop[] {
    const stops = this.route;
    const visibleStops: IStop[] = [];

    for (const stop of stops) {
      const index = visibleStops.findIndex((s) => s.geoHash === stop.geoHash);

      if (index !== -1) {
        const stopWithSameGeoHash = visibleStops[index];
        const needsToBeReplaced =
          stopWithSameGeoHash.sequenceNumber > stop.sequenceNumber;

        if (needsToBeReplaced) {
          visibleStops[index] = stop;
        }
      } else {
        visibleStops.push(stop);
      }
    }

    return visibleStops;
  }

  get completedStops(): IStop[] {
    return this.route.filter((stop) => stop.isCompleted);
  }
}
