import { action, makeObservable, observable } from 'mobx';
import { BehaviorSubject } from 'rxjs';

import { IRequestSubject, RequestSubscription, Status } from './request-subject.interface';

export class RequestSubject<T> extends BehaviorSubject<T | Status> implements IRequestSubject<T> {
  public requestStatus: Status = Status.IDLE;
  public hasCompleted = false;
  public hasFailed = false;
  public readonly requestID: string;

  constructor(requestID?: string) {
    super(Status.IDLE);
    this.requestID = requestID;
    makeObservable(this, {
      completeRequest: action,
      failRequest: action,
      hasCompleted: observable,
      hasFailed: observable,
      requestStatus: observable,
      startRequest: action,
    });
  }

  public startRequest() {
    this.requestStatus = Status.PENDING;
    super.next(Status.PENDING);
  }

  public completeRequest(): void {
    this.hasCompleted = true;
    this.requestStatus = Status.DONE;
    super.complete();
  }

  public failRequest(error: Error) {
    super.error(error);
    this.hasFailed = true;
    this.requestStatus = Status.ERROR;
  }

  public updateValue(value: T) {
    super.next(value);
  }

  public subscribeToRequest(requestHandler: RequestSubscription<T>) {
    const { onCompleteRequest, onRequestFailed, onValueReceived } = requestHandler;

    super.subscribe({
      complete: onCompleteRequest,
      error: onRequestFailed,
      next: onValueReceived,
    });
  }

  public unsubscribeFromRequest() {
    super.unsubscribe();
  }

  public get currentValue(): T | Status {
    return super.value;
  }

  public get isInProgress(): boolean {
    return this.requestStatus === Status.PENDING;
  }
}
