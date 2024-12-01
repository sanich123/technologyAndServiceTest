import { Camera, MapView } from '@rnmapbox/maps';
import { StyleSheet } from 'react-native';

import CustomPointAnnotation from '../point-annotation/point-annotation';

import { USERS } from '@/constants/mocks';
import { getBounds } from '@/utils/get-bounds';

export default function Map({ filteredUsers }: { filteredUsers: typeof USERS }) {
  const [minLat, minLng, maxLat, maxLng] = getBounds({ filteredUsers });

  return (
    <>
      <MapView style={{ flex: 1 }}>
        <Camera
          animationMode="flyTo"
          animationDuration={1000}
          bounds={{ ne: [minLng, minLat], sw: [maxLng, maxLat] }}
          padding={styles.boundsPadding}
        />
        {filteredUsers.map(({ name, surname, middleName, lastSeen, position, phone, id }) => (
          <CustomPointAnnotation
            key={`${phone}${lastSeen?.latitude}`}
            name={name}
            middleName={middleName}
            surname={surname}
            lastSeen={lastSeen}
            position={position}
            phone={phone}
            id={id}
          />
        ))}
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  boundsPadding: {
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 30,
    paddingBottom: 30,
  },
});
