import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import { Languages } from '@/constants/enums';
import { useAppSelector } from '@/redux/store';

export default function ActionBtns() {
  const {
    colors: { primary, background },
  } = useTheme();
  const { language } = useAppSelector(({ language }) => language);
  const isRussian = language === Languages.russian;
  return (
    <View style={{ ...styles.rowLayout, marginTop: 40, columnGap: 10 }}>
      <Button mode="outlined" style={{ borderWidth: 1, borderColor: primary, borderRadius: 10, width: '50%' }}>
        <Text style={{ ...styles.title, fontSize: 14, color: primary }}>{`${isRussian ? 'Написать' : 'Chat'}`}</Text>
      </Button>
      <Button mode="contained" style={{ borderRadius: 10, width: '50%' }}>
        <Text
          style={{ ...styles.title, fontSize: 14, color: background }}>{`${isRussian ? 'Позвонить' : 'Call'}`}</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto',
    fontWeight: 500,
  },
  rowLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
