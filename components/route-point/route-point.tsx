import { PointAnnotation } from '@rnmapbox/maps';
import { Image } from 'expo-image';
import { useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import { RoutePointValues } from '@/constants/enums';
import { RoutePointProps } from '@/constants/types';

export default function RoutePoint({ value, longitude, latitude }: RoutePointProps) {
  const pointRef = useRef<PointAnnotation>(null);

  return (
    <PointAnnotation
      ref={pointRef}
      coordinate={[longitude, latitude]}
      key={`${longitude}${latitude}`}
      id={`${longitude}${latitude}`}>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        {value === RoutePointValues.start ? (
          <Image
            source={require('../../assets/icons/start.png')}
            style={styles.imageSize}
            onLoad={() => pointRef.current?.refresh()}
          />
        ) : (
          <Image
            source={require('../../assets/icons/finish.png')}
            style={styles.imageSize}
            onLoad={() => pointRef.current?.refresh()}
          />
        )}
      </View>
    </PointAnnotation>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 20,
    backgroundColor: 'transparent',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  fontStyles: {
    position: 'absolute',
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 12,
  },
  imageSize: {
    width: 48,
    height: 48,
  },
});
