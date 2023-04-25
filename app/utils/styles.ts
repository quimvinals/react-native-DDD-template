import { Animated, StyleSheet, ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { enhance } from './object';

/**
 * Animated styles
 */
type AnimatedViewStyle = Animated.AnimatedProps<ViewStyle>;
type AnimatedTextStyle = Animated.AnimatedProps<TextStyle>;

/**
 * Different style types.
 */
type Style =
  | AnimatedTextStyle
  | AnimatedViewStyle
  | TextStyle
  | TextStyle[]
  | ViewStyle
  | ViewStyle[];

export const enhanceTextStyle = (styles: Style[]) => enhance<TextStyle>(styles);
export const enhanceViewStyle = (styles: Style[]) => enhance<ViewStyle>(styles);

type StyleTypeMap = {
  view: ViewStyle;
  text: TextStyle;
  image: ImageStyle;
};

/**
 * An alternative to StyleSheet.NamedStyles with the styles separated
 * between view, text and image.
 */
export type NamedStyles = {
  [P in keyof StyleTypeMap]?: { [key: string]: StyleTypeMap[P] };
};

/**
 * A function used to improve the type correctness and inference of a
 * stylesheet.
 */
export const stylesheet = (styles: NamedStyles) => ({
  image: styles.image && StyleSheet.create(styles.image),
  text: styles.text && StyleSheet.create(styles.text),
  view: styles.view && StyleSheet.create(styles.view),
});
