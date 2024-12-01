import Mapbox from '@rnmapbox/maps';
import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const {
    colors: { primary, background },
  } = useTheme();

  Mapbox.setAccessToken('sk.eyJ1Ijoic2FuaWNoMTIzIiwiYSI6ImNsaWtvam9oazBrZjcza29kZ2hhMmtlcjEifQ.PkCRRfGrD8iiEOIBB9BLcg');

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: primary },
        headerTintColor: background,
        headerTitleAlign: 'center',
        headerTitle: '',
        headerBackVisible: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="user" />
    </Stack>
  );
}
