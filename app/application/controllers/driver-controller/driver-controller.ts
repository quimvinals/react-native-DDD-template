import AsyncStorage from '@react-native-community/async-storage';
import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { IFleetEngineAccessToken, IToken } from '~/domain';
import { RequestSubject, RequestSubjectsMap } from '~/observables';

import { IDriverController, ITotalCash, IUserInfo } from './driver-controller.interface';

export enum DriverRequests {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  UserInfo = 'USER_INFO',
  TotalCash = 'TOTAL_CASH',
}

export class DriverController implements IDriverController {
  public isLoggedIn: boolean | null = null;
  public fleetEngineAccessToken: IFleetEngineAccessToken;
  public token: IToken;
  public totalCash: ITotalCash;
  public userInfo: IUserInfo;
  public driverID: string;

  public requestsSubjectsMap: RequestSubjectsMap<DriverRequests> = {
    [DriverRequests.Login]: new RequestSubject<IToken>(DriverRequests.Login),
    [DriverRequests.Logout]: new RequestSubject<IToken>(DriverRequests.Logout),
    [DriverRequests.UserInfo]: new RequestSubject<IToken>(DriverRequests.UserInfo),
    [DriverRequests.TotalCash]: new RequestSubject<IToken>(DriverRequests.TotalCash),
  };

  constructor(token?: IToken) {
    this.token = token;

    makeObservable(this, {
      fleetEngineAccessToken: observable,
      isLoggedIn: observable,
      isLoginNeeded: computed,
      removeToken: action,
      setFleetEngineAccessToken: action,
      setIsLoggedIn: action,
      setToken: action,
      setTotalCash: action,
      setUserInfo: action,
      token: observable,
      totalCash: observable,
      userInfo: observable,
    });
  }

  public async setup() {
    // TO DO
    // await this.requestFleetEngineAccessToken();
    await makePersistable(
      this,
      {
        name: 'DriverController',
        properties: ['isLoggedIn', 'fleetEngineAccessToken', 'token', 'userInfo'],
        storage: AsyncStorage,
      },
      { fireImmediately: true },
    );
  }

  public get isLoginNeeded(): boolean {
    return !this.token || this.token.invalid;
  }

  public setToken(token: IToken): boolean {
    this.token = token;
    this.driverID = token?.userId;
    return !!token?.refreshToken;
  }

  public removeToken(): void {
    this.token = null;
    this.fleetEngineAccessToken = null;
  }

  public setTotalCash(cash: ITotalCash): void {
    this.totalCash = cash;
  }

  public setUserInfo(user: IUserInfo): void {
    this.userInfo = user;
  }

  public setIsLoggedIn(state: boolean): void {
    this.isLoggedIn = state;
  }

  public setFleetEngineAccessToken(fleetEngineAccessToken: IFleetEngineAccessToken) {
    this.fleetEngineAccessToken = fleetEngineAccessToken;
  }
}
