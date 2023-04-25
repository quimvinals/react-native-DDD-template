import { IAPI } from './api';
import {
  ILocationService,
} from './services';

export interface IInfrastructure {
  services: {
    location: ILocationService;
  };
  api: IAPI;
}
