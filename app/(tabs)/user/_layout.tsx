import { Stack, useGlobalSearchParams } from 'expo-router';
import { useTheme } from 'react-native-paper';

import { Languages } from '@/constants/enums';
import { useAppSelector } from '@/redux/store';

export default function UserStack() {
  const {
    colors: { background, secondary },
  } = useTheme();
  const { name } = useGlobalSearchParams();
  const { language } = useAppSelector(({ language }) => language);
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: secondary },
        headerTintColor: background,
        headerTitleAlign: 'center',
        headerTitle: `${language === Languages.russian ? 'Передвижения' : 'Moving of'} ${name}`,
      }}>
      <Stack.Screen name="[...userInfo]" />
      <Stack.Screen name="activity" />
    </Stack>
  );
}
