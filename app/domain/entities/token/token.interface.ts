export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
  idToken?: string;
  refreshToken?: string;
  scope?: string;
  tokenType: string;
}

export interface IToken {
  accessToken: string;
  refreshToken?: string;
  invalid?: boolean;

  readonly userId: string;
  invalidate: () => void;
  update: (credentials: RefreshTokenResponse) => void;
}

export interface IFleetEngineAccessToken {
  expirationAt: number;
  token: string;
  readonly millisecondsToExpire: number;
}
