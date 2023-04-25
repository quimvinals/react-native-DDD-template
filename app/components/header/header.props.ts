import { TextStyle, ViewStyle } from 'react-native';

export interface HeaderProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  title?: string;
  titleTx?: string;
  titleTxOptions?: object;
  iconLeftColor?: string;
  iconLeftSize?: number;
  iconRightColor?: string;
  iconRightSize?: number;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
}
