import { LineLayer, ShapeSource } from '@rnmapbox/maps';
import { LocationObject } from 'expo-location';
import { useMemo } from 'react';
import { useTheme } from 'react-native-paper';

export default function MapRouteLine({ locations }: { locations: LocationObject[] }) {
  const coordinates = useMemo(
    () => locations.map(({ coords: { longitude, latitude } }) => [longitude, latitude]),
    [locations],
  );
  const {
    colors: { primary },
  } = useTheme();
  return (
    <ShapeSource
      id={`${locations[0].timestamp}`}
      shape={{
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          },
        ],
      }}>
      <LineLayer id={`${locations[0].timestamp}+${locations.length}`} style={{ lineColor: primary, lineWidth: 3 }} />
    </ShapeSource>
  );
}
