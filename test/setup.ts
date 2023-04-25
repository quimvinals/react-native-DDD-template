// we always make sure 'react-native' gets included first
import 'react-native';
import '@testing-library/jest-native/extend-expect';
import './mocks/modules';
import '~/i18n/i18n';
import { WebSocket } from 'mock-socket';

// Websockets
// @ts-ignore
global.WebSocket = WebSocket;

declare global {
  let __TEST__;
}
if (
  !new (class {
    x;
    // eslint-disable-next-line no-prototype-builtins
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly');

const CONSOLE_FAIL_TYPES = ['error', 'warn'];

CONSOLE_FAIL_TYPES.forEach((type) => {
  // eslint-disable-next-line no-console
  console[type] = (message) => {
    throw new Error(`Failing due to console.${type} while running test!\n\n${message}`);
  };
});
