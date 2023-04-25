import { Controller } from '~/application/controllers/controller.interface';
import { IFleetEngineAccessToken, IToken } from '~/domain';

export interface ITotalCash {
  amount?: number;
  totalOrders?: number;
}

export interface IUserInfo {
  firstName: string;
  fleetName: string;
  lastName: string;
  phone: string;
  readonly name: string;
}

export interface IDriverController extends Controller {
  isLoggedIn: boolean | null;
  fleetEngineAccessToken: IFleetEngineAccessToken;
  token: IToken;
  totalCash: ITotalCash;
  userInfo: IUserInfo;
  driverID: string;

  /**
   * Get if login is needed
   * @public
   */
  readonly isLoginNeeded: boolean;

  /**
   * Get if login is needed
   * @public
   */
  setup: () => Promise<void>;

  /**
   * Sets isLoggedIn prop
   * @public
   */
  setIsLoggedIn: (state: boolean) => void;

  /**
   * Remove token
   * @public
   */
  removeToken(): void;

  /**
   * Sets token prop
   * @public
   */
  setToken: (token: IToken) => boolean;

  /**
   * Sets totalCash prop
   * @public
   */
  setTotalCash: (cash: ITotalCash) => void;

  /**
   * Sets userInfo prop
   * @public
   */
  setUserInfo: (user: IUserInfo) => void;

  /**
   * Sets userInfo prop
   * @public
   */
  setFleetEngineAccessToken: (fleetEngineAccessToken: IFleetEngineAccessToken) => void;
}
