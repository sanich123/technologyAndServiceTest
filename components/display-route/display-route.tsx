import { Camera, MapView } from '@rnmapbox/maps';
//@ts-ignore
import bbox from '@turf/bbox';
import { LocationObject } from 'expo-location';
import { useMemo } from 'react';
//@ts-ignore
import lineString from 'turf-linestring';

import RouteLine from '../route-line/route-line';
import RoutePoint from '../route-point/route-point';

import { RoutePointValues } from '@/constants/enums';

export default function DisplayRoute({ locations }: { locations: LocationObject[] }) {
  const modifiedLocationsForTurf = useMemo(
    () => locations.map(({ coords: { longitude, latitude } }) => [latitude, longitude]),
    [locations],
  );
  const line = lineString(modifiedLocationsForTurf);

  //Здесь получаем точки квадрата, в котором карта должна отобразиться
  const [minLat, minLng, maxLat, maxLng] = bbox(line);
  const startLongitude = locations[0]?.coords.longitude;
  const startLatitude = locations[0]?.coords.latitude;
  const finishLongitude = locations[locations.length - 1]?.coords.longitude;
  const finishLatitude = locations[locations.length - 1]?.coords.latitude;
  return (
    <MapView style={[{ flex: 1 }]} pitchEnabled>
      <Camera
        animationMode="flyTo"
        animationDuration={1000}
        bounds={{ ne: [minLng, minLat], sw: [maxLng, maxLat] }}
        padding={{ paddingLeft: 40, paddingRight: 40, paddingBottom: 40, paddingTop: 40 }}
      />
      {locations.length > 1 && (
        <>
          <RouteLine locations={locations} />
          <RoutePoint value={RoutePointValues.start} longitude={startLongitude} latitude={startLatitude} />
          <RoutePoint value={RoutePointValues.finish} longitude={finishLongitude} latitude={finishLatitude} />
        </>
      )}
    </MapView>
  );
}
