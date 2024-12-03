import { Button, useTheme, Text } from 'react-native-paper';

import { Languages } from '@/constants/enums';
import { useAppSelector } from '@/redux/store';

export default function ResetFiltersBtn({ setFilterByPosition }: { setFilterByPosition: (arg: string[]) => void }) {
  const {
    colors: { primary },
  } = useTheme();
  const { language } = useAppSelector(({ language }) => language);
  const isRussian = language === Languages.russian;

  return (
    <Button
      mode="outlined"
      style={{ borderWidth: 1, borderColor: primary, borderRadius: 10, marginTop: 20 }}
      onPress={() => setFilterByPosition([])}>
      <Text>{`${isRussian ? 'Сбросить фильтры' : 'Reset filters'}`}</Text>
    </Button>
  );
}
