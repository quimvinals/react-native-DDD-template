import { toRadians } from './location';

describe('location', function () {
  it('toRadians', function () {
    expect(toRadians(180)).toBeCloseTo(3.14159, 4);
  });
});
