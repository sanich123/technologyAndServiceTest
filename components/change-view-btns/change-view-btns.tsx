import { useWindowDimensions, View } from 'react-native';
import { Button, useTheme, Text } from 'react-native-paper';

import { ChangeViewBtnsProps } from './types';
import { BTNS_TITLES } from '../controls/const';

import { useAppSelector } from '@/redux/store';

export default function ChangeViewBtns({ renderType, setRenderType }: ChangeViewBtnsProps) {
  const {
    colors: { background, primary },
  } = useTheme();
  const { width } = useWindowDimensions();
  const { language } = useAppSelector(({ language }) => language);
  const calculatedWidthOfBtn = (width - 72) / 2;
  return (
    <View style={{ display: 'flex', flexDirection: 'row', columnGap: 10 }}>
      {BTNS_TITLES.map(({ key, title }) => {
        const mode = key === renderType ? 'contained' : 'outlined';
        const color = key === renderType ? background : primary;
        return (
          <Button
            key={key}
            style={{
              width: calculatedWidthOfBtn,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: primary,
            }}
            onPress={() => setRenderType(key)}
            mode={mode}>
            <Text variant="bodyLarge" style={{ color }}>
              {title[language].value}
            </Text>
          </Button>
        );
      })}
    </View>
  );
}
