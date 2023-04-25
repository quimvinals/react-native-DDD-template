import { IGeoCode } from './geocode.interface';

const EARTH_RADIUS_METERS = 6371000;

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

export class Geocode implements IGeoCode {
  public readonly latitude: number;
  public readonly longitude: number;

  constructor(longitude: number, latitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public distanceToLocation(location: IGeoCode): number {
    const dLat = toRadians(location.latitude - this.latitude);
    const dLon = toRadians(location.longitude - this.longitude);
    const lat1 = toRadians(this.latitude);
    const lat2 = toRadians(location.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = EARTH_RADIUS_METERS * c;
    return d;
  }
}
