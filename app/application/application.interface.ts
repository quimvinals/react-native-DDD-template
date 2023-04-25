import { IRequestSubject } from '~/observables';

import { Controllers } from './controllers';
import { UseCasesMap } from './use-cases/use-cases';

export type UseCaseRequestID = `${keyof UseCasesMap}-${string}` | keyof UseCasesMap;

/**
 * Abstraction of the application layer of the application
 * @param routeController -> Module that handles the route assigned to the driver
 * @param locationController -> Module that handles the device's location operations
 * @param navigationController -> Module that handles the navigation operations
 */
export interface IApplication {
  readonly controllers: Controllers;
  readonly useCases: UseCasesMap;

  readonly controllerErrors: Map<string, Error>;
  readonly useCasesRequests: Map<UseCaseRequestID, IRequestSubject<unknown>>;

  setup: () => Promise<void>;
}
