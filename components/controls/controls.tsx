import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import { ControlsProps } from './types';
import ChangeViewBtns from '../change-view-btns/change-view-btns';
import SettingsBtn from '../settings-btn/settings-btn';

import { Languages } from '@/constants/enums';
import { useAppSelector } from '@/redux/store';

export default function Controls({ renderType, setRenderType, filteringModalRef }: ControlsProps) {
  const {
    colors: { background },
  } = useTheme();
  const { language } = useAppSelector(({ language }) => language);

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.rowLayout}>
        <ChangeViewBtns renderType={renderType} setRenderType={setRenderType} />
        <SettingsBtn />
      </View>
      <View>
        <Button mode="contained" style={{ borderRadius: 8 }} onPress={() => filteringModalRef.current?.present()}>
          <Text variant="bodyLarge" style={{ color: background }}>
            {language === Languages.russian ? 'Фильтр' : 'Filtering'}
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
