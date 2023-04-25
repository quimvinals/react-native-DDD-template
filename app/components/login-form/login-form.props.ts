import { ViewStyle } from 'react-native';

export interface LoginFormProps {
  /**
   * True if and error during login event is present.
   */
  title: string;

  /**
   * Callback for login action
   */
  onLogin?: () => void;

  /**
   * True if and error during login event is present.
   */
  error?: string;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle;
}
