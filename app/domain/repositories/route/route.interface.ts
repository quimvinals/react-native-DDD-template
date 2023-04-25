import { IStop } from '~/domain/entities';

import { RouteState } from './types';

/**
 * Representation the route the driver has to follow
 *
 * @property route -> List of stops the driver has to do
 * @property routeState -> Indicates which is the state of the sequenced stops of the route
 */
export interface IRoute {
  route: IStop[];
  routeState: RouteState;

  /**
   * Updates the route with the provided list of stops
   * @public
   */
  setRoute: (route: IStop[]) => void;

  /**
   * Updates the route state with the provided value
   * @public
   */
  setRouteState: (state: RouteState) => void;

  /**
   * Returns the stop of the route with id
   * @public
   */
  getStop: (id: string) => IStop;

  /**
   * Returns true if the route is correctly sequenced
   * @readonly
   */
  readonly isRouteSequenced: boolean;

  /**
   * Returns all the stops that are completed
   * @readonly
   */
  readonly completedStops: IStop[];

  /**
   * Returns all the stops without being overlapped by geocode
   * @readonly
   */
  readonly visibleStops: IStop[];
}
