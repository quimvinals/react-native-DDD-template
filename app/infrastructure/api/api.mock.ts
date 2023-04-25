import { IToken } from '~/domain/entities';

import { IAPI } from './api.interface';

export interface FailTaskInfo {
  reason: string;
}

export interface IMockAPI extends IAPI {
  token: IToken;
  mockError: (error: string) => void;
  failedTasks: Record<string, FailTaskInfo>;
  returnAPIError: boolean;
}

export class MockAPI implements IMockAPI {
  // @ts-ignore
  private readonly baseURL: string;
  public token: IToken;
  public readonly failedTasks: Record<string, FailTaskInfo> = {};
  // @ts-ignore
  private error: string;
  public returnAPIError = false;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public mockError(error: string): void {
    this.error = error;
  }

  public mockReturnAPIError() {
    this.returnAPIError = true;
  }

  public setup(token: IToken) {
    this.token = token;
  }
}
