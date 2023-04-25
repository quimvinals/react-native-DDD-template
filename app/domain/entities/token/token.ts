import jwtDecode from 'jwt-decode';
import { action, computed, makeObservable, observable } from 'mobx';

import { IToken, RefreshTokenResponse } from './token.interface';

export class Token implements IToken {
  public accessToken: string;
  public refreshToken?: string;
  public invalid?: boolean;

  constructor(accessToken: string, refreshToken?: string, invalid?: boolean) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.invalid = invalid;

    makeObservable(this, {
      accessToken: observable,
      invalid: observable,
      invalidate: action,
      refreshToken: observable,
      update: action,
      userId: computed,
    });
  }

  public get userId(): string {
    const decodedToken = jwtDecode(this.accessToken);
    return decodedToken && decodedToken['https://paack.co'].id;
  }

  public invalidate() {
    this.invalid = true;
  }

  public update(credentials: RefreshTokenResponse) {
    this.accessToken = credentials.accessToken;

    if (credentials.refreshToken) {
      this.refreshToken = credentials.refreshToken;
    }
  }
}
