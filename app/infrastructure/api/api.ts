import axios, { AxiosInstance } from 'axios';

import { IToken } from '~/domain/entities';

import { IAPI } from './api.interface';

export class API implements IAPI {
  private axiosClient: AxiosInstance;
  private readonly baseURL: string;
  private token: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public setup(token: IToken) {
    this.token = token.accessToken;

    this.axiosClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    });

    this.axiosClient.getUri();
  }
}
