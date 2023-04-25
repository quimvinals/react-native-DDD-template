import { Login } from './login';

type UseCases = {
  Login: Login;
};

export type UseCasesMap = {
  [key in keyof UseCases]: (...args: UseCases[key]['args']) => UseCases[key]['responseType'];
};
