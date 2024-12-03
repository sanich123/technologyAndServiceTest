import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Callout, PointAnnotation } from '@rnmapbox/maps';
import { Image } from 'expo-image';
import { Fragment, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import CallMeModal from '../call-me-modal/call-me-modal';

import { User } from '@/constants/types';

export default function CustomPointAnnotation({
  name,
  surname,
  middleName,
  phone,
  lastSeen: { longitude, latitude },
}: User) {
  const pointRef = useRef<PointAnnotation>(null);
  const { colors } = useTheme();
  const callMeModalRef = useRef<BottomSheetModal>(null);
  return (
    <Fragment key={`${longitude}${latitude}`}>
      <PointAnnotation
        ref={pointRef}
        coordinate={[longitude, latitude]}
        key={`${longitude}${latitude}`}
        id={`${longitude}${latitude}`}
        onSelected={() => callMeModalRef.current?.present()}>
        <View style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent' }}>
          <View style={styles.container}>
            <Text
              style={{
                ...styles.fontStyles,
                color: colors.primary,
              }}>{`${surname} ${name[0].toUpperCase()}. ${middleName[0].toUpperCase()}.`}</Text>
          </View>
          <Image
            source={require('../../assets/images/user-icon.png')}
            style={styles.imageSize}
            onLoad={() => pointRef.current?.refresh()}
          />
        </View>
        <Callout title="Скорей позвони мне! Я очень жду!" />
      </PointAnnotation>
      <CallMeModal callMeModalRef={callMeModalRef} phone={phone} />
    </Fragment>
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
