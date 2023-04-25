import { Alert, BackHandler } from 'react-native';

import { translate } from '~/i18n';

export function showUpdateAppDialog() {
  Alert.alert(
    translate('component.titleMandatoryUpdate'),
    translate('component.subtitleCloseApp'),
    [
      {
        onPress: () => {
          BackHandler.exitApp();
          return false;
        },
        style: 'cancel',
        text: translate('button.closeApp'),
      },
    ],
    { cancelable: false },
  );
}
