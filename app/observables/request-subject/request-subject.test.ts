import { Status } from '~/observables';

import { RequestSubject } from './request-subject';
import { IRequestSubject } from './request-subject.interface';

describe('RequestSubject', function () {
  let instance: IRequestSubject<string>;

  beforeEach(function () {
    instance = new RequestSubject();
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
    expect(instance.currentValue).toBe(Status.IDLE);
    expect(instance.requestStatus).toBe(Status.IDLE);
  });

  describe('startRequest', function () {
    beforeEach(function () {
      instance.startRequest();
    });

    it('sets request status to pending', function () {
      expect(instance.requestStatus).toBe(Status.PENDING);
    });

    it('sets observer value to pending', function () {
      expect(instance.currentValue).toBe(Status.PENDING);
    });
  });

  describe('completeRequest', function () {
    beforeEach(function () {
      instance.completeRequest();
    });

    it('sets completed to true', function () {
      expect(instance.hasCompleted).toBeTruthy();
    });

    it('sets requestStatus to DONE', function () {
      expect(instance.requestStatus).toBe(Status.DONE);
    });
  });

  describe('failRequest', function () {
    let spy: jest.SpyInstance;

    beforeEach(function () {
      spy = jest.spyOn(instance, 'failRequest');

      instance.failRequest(new Error('test-error'));
    });

    it('sets hasFailed to true', function () {
      expect(instance.hasFailed).toBeTruthy();
    });

    it('sets requestStatus to ERROR', function () {
      expect(instance.requestStatus).toBe(Status.ERROR);
    });

    it('calls failRequest function', function () {
      expect(spy).toBeCalledWith(new Error('test-error'));
    });
  });

  describe('updateValue', function () {
    let spy: jest.SpyInstance;

    beforeEach(function () {
      spy = jest.spyOn(instance, 'updateValue');
      instance.updateValue('test');
    });

    it('calls updateValue function', function () {
      expect(spy).toBeCalledWith('test');
    });

    it('updates the currentValue', function () {
      expect(instance.currentValue).toBe('test');
    });
  });

  describe('subscribeToRequest', function () {
    const handleError = jest.fn();
    const handleNewValue = jest.fn();
    const handleCompletion = jest.fn();
    let spy: jest.SpyInstance;

    beforeEach(function () {
      spy = jest.spyOn(instance, 'subscribeToRequest');

      instance.subscribeToRequest({
        onCompleteRequest: handleCompletion,
        onRequestFailed: handleError,
        onValueReceived: handleNewValue,
      });
    });

    it('calls RXJS subscribe function with passed functions', function () {
      expect(spy).toBeCalledWith({
        onCompleteRequest: handleCompletion,
        onRequestFailed: handleError,
        onValueReceived: handleNewValue,
      });
    });

    it('when an error occurs it calls handleError', function () {
      instance.failRequest(new Error('test-error'));

      expect(handleError).toBeCalledWith(new Error('test-error'));
    });

    it('when a new value is received it calls handleNewValue', function () {
      instance.updateValue('test');

      expect(handleNewValue).toBeCalledWith('test');
    });

    it('when the request is done it calls handleCompletion', function () {
      instance.completeRequest();

      expect(handleCompletion).toBeCalled();
    });
  });
});
