import { IRoute, Route } from '~/domain/repositories';
import { definitions } from '~/infrastructure/api/schema';

import { stopFactory } from './stop.factory';

export function routeFactory(data: definitions['routePlan']): IRoute {
  const route = new Route();
  const stops = data.stops.map((stop) => stopFactory(stop));

  route.setRoute(stops);

  return route;
}
