import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RouteScreenNavigationProp = StackNavigationProp<ParamListBase>;

export function useRootNavigation() {
  const navigation = useNavigation<RouteScreenNavigationProp>();

  return {
    ...navigation,
  };
}
