import { Token } from './token';
import { IToken } from './token.interface';

describe('Token', function () {
  let instance: IToken;

  beforeEach(function () {
    instance = new Token('access-token', 'refresh-token', false);
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });

  it('invalidate sets valid as false', function () {
    instance.invalidate();

    expect(instance.invalid).toBeTruthy();
  });
});
