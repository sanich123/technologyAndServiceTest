import { Stack, useGlobalSearchParams } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function UserStack() {
  const {
    colors: { background, secondary },
  } = useTheme();
  const { name } = useGlobalSearchParams();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: secondary },
        headerTintColor: background,
        headerTitleAlign: 'center',
        headerTitle: `Передвижения ${name}`,
      }}>
      <Stack.Screen name="[...userInfo]" />
      <Stack.Screen name="activity" />
    </Stack>
  );
}
