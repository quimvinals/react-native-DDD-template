import * as React from 'react';

import { MockApplication, IMockApplication } from '~/application';
import { RequestSubject, Status } from '~/observables';
import {
  fireEvent,
  RenderAPI,
  waitFor,
  act,
  renderWithApplicationLayer,
} from '~/test/utils';
import { MockNavigator } from '~/test/utils/mock-navigator';

import { LoginScreen } from './login-screen';

jest.mock('jwt-decode', () => jest.fn());

describe('LoginScreen', function () {
  let instance: RenderAPI;
  let navigate: jest.Mock;
  let application: IMockApplication;

  beforeEach(function () {
    navigate = jest.fn();
    application = new MockApplication();
    instance = renderWithApplicationLayer(
      <MockNavigator navigate={navigate}>
        <LoginScreen />
      </MockNavigator>,
      application
    );
  });

  it('before the user press the login button', function () {
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('when the login in is in process', function () {
    act(() => {
      application.useCasesRequests.set('Login', new RequestSubject());
      application.useCasesRequests.get('Login').startRequest();
    });

    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('when the login process finish with a success', async function () {
    fireEvent(instance.getByText(/send/i), 'press');
    await waitFor(() =>
      expect(
        application.useCasesRequests.get('Login')?.hasCompleted
      ).toBeTruthy()
    );

    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('redirects to route after the login process finish', async function () {
    fireEvent(instance.getByText(/send/i), 'press');
    await waitFor(() =>
      expect(application.useCasesRequests.get('Login')?.requestStatus).toBe(
        Status.DONE
      )
    );

    expect(navigate).toHaveBeenCalledWith('Main');
  });
});
