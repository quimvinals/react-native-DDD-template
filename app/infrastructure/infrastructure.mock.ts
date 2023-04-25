import { MockAPI } from './api';
import { IInfrastructure } from './infrastructure.interface';
import {
  IMockLocationService, MockLocationService,
} from './services';

export interface IMockInfrastructure extends IInfrastructure {
  readonly services: {
    location: IMockLocationService;
  };

  readonly api: MockAPI;
}

export class MockInfrastructure implements IMockInfrastructure {
  public readonly services: {
    location: IMockLocationService;
  };

  public readonly api: MockAPI;

  constructor() {
    this.services = {
      location: new MockLocationService(),
    };
    this.api = new MockAPI('test-url');
  }
}
