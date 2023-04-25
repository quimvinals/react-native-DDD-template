import { Geocode } from './geocode';
import { IGeoCode } from './geocode.interface';

describe('Geocode', function () {
  let instance: IGeoCode;

  beforeEach(function () {
    instance = new Geocode(42, 2);
  });

  it('can be created', function () {
    expect(instance).toMatchSnapshot();
  });

  describe('distanceToLocation', function () {
    it('returns the correct distance', function () {
      expect(instance.distanceToLocation(new Geocode(38, 1))).toBe(458315.0183091454);
    });
  });
});
