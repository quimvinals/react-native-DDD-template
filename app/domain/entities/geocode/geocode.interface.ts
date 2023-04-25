/**
 * Representation of a geographical point
 *
 * @property latitude
 * @property longitude
 */
export interface IGeoCode {
  latitude: number;
  longitude: number;

  distanceToLocation: (location: IGeoCode) => number;
}
