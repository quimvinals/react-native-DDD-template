import { BehaviorSubject } from 'rxjs';

export enum Status {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

/**
 * @property onCompleteRequest -> Called when the request has finished
 * @property onRequestFailed -> Called when the request catches an error
 * @property onValueReceived -> Called when the request receives a new value
 */
export type RequestSubscription<T> = {
  onCompleteRequest?: () => void;
  onRequestFailed?: (error: Error) => void;
  onValueReceived?: (value: T) => void;
};

/**
 * @class RequestSubject
 * @description Represents -> An observable which tracks the lifecycle of an async request
 * @property requestStatus -> Is of type Status, and represents the current status of the async request
 * @property hasCompleted -> True if the request finished successfully, False if not
 * @property hasFailed ->  True if the request caught an error, False if not
 * @property requestID -> Identifier of the request the subject is tracking
 */
export interface IRequestSubject<T> extends BehaviorSubject<T | Status> {
  requestStatus: Status;
  hasCompleted: boolean;
  hasFailed: boolean;
  readonly requestID: string;

  /**
   * @public
   * Sets status to PENDING
   */
  startRequest: () => void;

  /**
   * @public
   * Sets status to DONE
   * Sets hasCompleted to true
   */
  completeRequest: () => void;

  /**
   * @public
   * Sets status to ERROR
   * Sets hasFailed to true
   */
  failRequest: (error: Error) => void;

  /**
   * @public
   * Calls next value of the observable with value: T
   */
  updateValue: (value: T) => void;

  /**
   * @public
   * Calls the observable subscription function with the RequestSubscription object
   * to handle changes
   */
  subscribeToRequest: (requestHandler: RequestSubscription<T>) => void;

  /**
   * @public
   * Calls the observable subscription function of unsubscribing from the subject
   */
  unsubscribeFromRequest: () => void;

  /**
   * @public
   * Returns the last value the observable has tracked
   */
  readonly currentValue: T | Status;

    /**
   * @public
   * Returns true if the request has not finished
   */
    readonly isInProgress: boolean;

}
