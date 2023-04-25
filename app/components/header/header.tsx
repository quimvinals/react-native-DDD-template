import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { testIdProps } from '~/test/utils';
import { enhanceTextStyle, enhanceViewStyle } from '~/utils/styles';

import { HeaderProps as Props } from './header.props';
import { HeaderStyles as styles, ICON_SIZE } from './header.styles';

/**
 *
 * @param style ViewStyle styles to override container style.
 * @param title string Title of the screen header.
 * @param titleTx string title tx of the screen header.
 * @param titleTxOptions object title tx options of the screen header.
 * @param iconLeft string Icon name to be rendered on the left.
 * @param iconLeftColor string color of the left icon.
 * @param iconLeftSize number size of the left icon.
 * @param iconRight string Icon rendered on the right.
 * @param iconRightColor string color of the right icon.
 * @param iconRightSize number size of the right icon.
 * @param onPressLeftIcon function called upon pressing the left icon
 * @param onPressRightIcon function called upon pressing the right icon
 */
export const Header: React.FC<Props> = (props) => {
  const {
    style: styleOverride,
    textStyle: textStyleOverride,
    title,
    onPressLeftIcon,
    onPressRightIcon,
  } = props;
  const style = enhanceViewStyle([styles.view.container, styleOverride]);
  const textStyle = enhanceTextStyle([styles.text.title, textStyleOverride]);

  return (
    <View style={style}>
      <TouchableOpacity
        disabled={!onPressLeftIcon}
        style={styles.view.iconContainer}
        onPress={onPressLeftIcon}
        {...testIdProps('left-icon')}
      ></TouchableOpacity>

      <Text style={textStyle}>{title}</Text>

      <TouchableOpacity
        disabled={!onPressRightIcon}
        style={styles.view.iconContainer}
        onPress={onPressRightIcon}
        {...testIdProps('right-icon')}
      ></TouchableOpacity>
    </View>
  );
};

Header.defaultProps = {
  iconLeftColor: 'black',
  iconLeftSize: ICON_SIZE,
  iconRightColor: 'black',
  iconRightSize: ICON_SIZE,
};
