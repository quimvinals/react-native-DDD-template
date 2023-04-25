import env from '~/config/env';

import { API, IAPI } from './api';
import { IInfrastructure } from './infrastructure.interface';
import { ILocationService, LocationService } from './services';

export class Infrastructure implements IInfrastructure {
  public readonly services: {
    location: ILocationService;
  };

  public readonly api: IAPI;

  constructor() {
    this.services = {
      location: new LocationService(),
    };
    this.api = new API(env.API_HOST);
  }
}
