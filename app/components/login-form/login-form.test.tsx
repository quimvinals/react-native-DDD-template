import * as React from 'react';
import sinon from 'sinon';

import { render, fireEvent, RenderAPI, assert } from '~/test/utils';

import { LoginForm } from './login-form';

describe('LoginForm', function () {
  it('renders correctly', function () {
    const { toJSON } = render(<LoginForm title='send' />);
    expect(toJSON()).toMatchSnapshot();
  });

  describe('when the user press the login button', function () {
    it('the login function from props is called', async function () {
      const navigate = sinon.spy();

      const instance: RenderAPI = render(
        <LoginForm title='send' onLogin={navigate} />,
        {}
      );

      fireEvent(await instance.findByText('send'), 'press');
      assert.calledOnce(navigate);
    });
  });
});
