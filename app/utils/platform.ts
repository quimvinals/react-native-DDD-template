import { Platform } from 'react-native';

/**
 * Returns the Android value if the platform is Android, and the ios value if the platform is iOS
 * @param android Value to return if is Android
 * @param platform Value to return if is iOS
 */
function select<T>(android: T, ios: T): T {
  return Platform.select({
    android,
    ios,
  });
}

export default { select };
