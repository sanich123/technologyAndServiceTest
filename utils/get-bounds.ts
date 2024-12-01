//@ts-ignore
import bbox from '@turf/bbox';
//@ts-ignore
import lineString from 'turf-linestring';

import { USERS } from '@/constants/mocks';

export function getBounds({ filteredUsers }: { filteredUsers: typeof USERS }) {
  const modifiedLocationsForTurf = filteredUsers.map(({ lastSeen: { longitude, latitude } }) => [latitude, longitude]);
  const line = lineString(modifiedLocationsForTurf);
  const [minLat, minLng, maxLat, maxLng] = bbox(line);
  return [minLat, minLng, maxLat, maxLng];
}
