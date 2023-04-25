import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View, Button } from 'react-native';

import { LoginFormProps } from './login-form.props';
import { loginFormStyles as styles } from './login-form.styles';

/**
 * Login form
 *
 * @param loading Optional, true if logging in, disables button and show activity.
 * @param onPress Callback when login button is pressed.
 * @param style Optional, login form style override
 */
export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { onLogin, title } = props;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.view.content}>
        <View style={styles.view.buttonContainer}>
          <Button title={title} onPress={onLogin} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
