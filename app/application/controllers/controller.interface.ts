import { RequestSubjectsMap } from '~/observables';

/**
 * @class Controller: Abstract representation of a controller.
 *
 * @property requestsSubjectsMap A map of all the request subjects which relates to
 * all the possible requests a controller can do to any external service.
 */
export abstract class Controller {
  public requestsSubjectsMap: RequestSubjectsMap<any>;
}
