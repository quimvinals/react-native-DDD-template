import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button, View } from 'react-native';

import { Route } from '~/domain';
import { useApplicationLayer } from '~/hooks/use-application-layer/application-context';
import {
  RenderAPI,
  renderWithApplicationLayer,
  fireEvent,
  waitFor,
} from '~/test/utils';

import { Application } from './application';
import { IApplication } from './application.interface';
import { MockApplication } from './application.mock';

jest.mock('jwt-decode', () => jest.fn());

describe('Application Layer', function () {
  let instance: IApplication;

  beforeEach(function () {
    jest.useFakeTimers();
    instance = new Application();
  });

  afterAll(function () {
    jest.useRealTimers();
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });

  // Controller Errors Handler Test (To implement with new controllers)
  /*   describe('handles controllers errors correctly', function () {
    const requestKey = LocationRequests.UpdateCurrentLocation;

    beforeEach(function () {
      const updateCurrentLocationSubject =
        instance.controllers.LocationController.requestsSubjectsMap[requestKey];

      updateCurrentLocationSubject.failRequest(new Error('test-error'));
    });

    it('sets the error to the error map with the request ID as key', function () {
      expect(instance.controllerErrors.get(requestKey)).toStrictEqual(
        new Error('test-error')
      );
    });

    it('after an error is tracked, the subject is able to report another error', function () {
      const updateCurrentLocationSubject2 =
        instance.controllers.LocationController.requestsSubjectsMap[requestKey];
      updateCurrentLocationSubject2.failRequest(new Error('test-error-2'));

      expect(instance.controllerErrors.get(requestKey)).toStrictEqual(
        new Error('test-error-2')
      );
    });

    it('after a request is completed, it can track again the errors', function () {
      const updateCurrentLocationSubject2 =
        instance.controllers.LocationController.requestsSubjectsMap[requestKey];
      updateCurrentLocationSubject2.completeRequest();

      const updateCurrentLocationSubject3 =
        instance.controllers.LocationController.requestsSubjectsMap[requestKey];
      updateCurrentLocationSubject3.failRequest(new Error('test-error-2'));

      expect(instance.controllerErrors.get(requestKey)).toStrictEqual(
        new Error('test-error-2')
      );
    });
  }); */

  describe('is observable', function () {
    let instance: RenderAPI;
    const reRenderHandler = jest.fn();
    let app: IApplication;

    function renderInstance(application: IApplication) {
      const Component: React.FC = observer(() => {
        const {
          controllers: { RouteController },
        } = useApplicationLayer();
        const route = RouteController.route;

        React.useEffect(() => reRenderHandler(), [route]);

        return (
          <View>
            <Button
              title='Update State'
              onPress={() => RouteController.setRoute(new Route())}
            />
          </View>
        );
      });

      return renderWithApplicationLayer(<Component />, application);
    }

    beforeEach(function () {
      app = new Application();
      instance = renderInstance(app);
      expect(reRenderHandler).toHaveBeenCalledTimes(1);
    });

    it('calls reRenderHandler when RouteController sets a new value at route', function () {
      const button = instance.getByText(/update state/i);
      fireEvent(button, 'press');

      expect(reRenderHandler).toHaveBeenCalledTimes(2);
    });
  });

  describe('you can subscribe to use cases requests', function () {
    let instance: RenderAPI;
    const reRenderHandler = jest.fn();
    const handleRequestCompleted = jest.fn();
    let app: IApplication;

    function renderInstance(application: IApplication) {
      const Component: React.FC = observer(() => {
        const {
          useCasesRequests,
          useCases: { Login },
        } = useApplicationLayer();

        const loginRequest = useCasesRequests.get('Login');

        React.useEffect(() => {
          reRenderHandler();
          loginRequest?.subscribeToRequest({
            onCompleteRequest: handleRequestCompleted,
          });
        }, [loginRequest]);

        return (
          <View>
            <Button title='Log In' onPress={() => Login()} />
          </View>
        );
      });

      return renderWithApplicationLayer(<Component />, application);
    }

    beforeEach(function () {
      app = new MockApplication();
      instance = renderInstance(app);
    });

    it('when a use case is triggered, the use cases requests map is updated', function () {
      const button = instance.getByText(/log in/i);
      fireEvent(button, 'press');

      expect(reRenderHandler).toHaveBeenCalledTimes(2);
    });

    it('you can subscribe to a subject of the use cases requests map', async function () {
      jest.useRealTimers();
      handleRequestCompleted.mockClear();
      const button = instance.getByText(/log in/i);
      fireEvent(button, 'press');

      await waitFor(() => expect(handleRequestCompleted).toBeCalled());
    });

    it('you can subscribe to a subject with unique ID of the use cases requests map', async function () {
      jest.useRealTimers();
      handleRequestCompleted.mockClear();
      const button = instance.getByText(/log in/i);
      fireEvent(button, 'press');

      await waitFor(() => expect(handleRequestCompleted).toBeCalled());
    });
  });
});
