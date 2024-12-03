import * as Linking from 'expo-linking';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import { Languages } from '@/constants/enums';
import { useAppSelector } from '@/redux/store';

export default function ActionBtns({ phone }: { phone: string }) {
  const {
    colors: { primary, background },
  } = useTheme();
  const { language } = useAppSelector(({ language }) => language);
  const isRussian = language === Languages.russian;

  return (
    <View style={{ ...styles.rowLayout, columnGap: 10 }}>
      <Button
        mode="outlined"
        style={{ borderWidth: 1, borderColor: primary, borderRadius: 10, width: '49%' }}
        onPress={async () => {
          try {
            Linking.openURL(`http://api.whatsapp.com/send?phone=${phone}`);
          } catch (error) {
            console.log(`Возможно на вашем телефона не установлено приложение Whatsapp, ${JSON.stringify(error)}`);
          }
        }}>
        <Text style={{ ...styles.title, fontSize: 14, color: primary }}>{`${isRussian ? 'Написать' : 'Chat'}`}</Text>
      </Button>
      <Button
        mode="contained"
        style={{ borderRadius: 10, width: '49%' }}
        onPress={async () => Linking.openURL(`tel:${phone}`)}>
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
