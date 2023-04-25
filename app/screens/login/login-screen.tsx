import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { View, Button } from 'react-native';

import { useApplicationLayer } from '~/hooks';
import { translate } from '~/i18n';
import { RootParamList } from '~/navigation/params';

import { LoginScreenProps as Props } from './login-screen.props';
import { LoginScreenStyles as styles } from './login-screen.styles';

type LoginScreenNavigationProp = StackNavigationProp<RootParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = observer(() => {
  const {
    useCases: { Login },
  } = useApplicationLayer();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  function handleLogin() {
    Login().subscribeToRequest({
      onCompleteRequest: () => {
        navigation.navigate('Main');
      },
    });
  }

  return (
    <>
      <View style={styles.view.content}>
        <Button
          title={translate('common.sendButton')}
          onPress={() => handleLogin()}
        />
      </View>
    </>
  );
});
