import { Href, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

import { User } from '@/constants/types';

export default function ListItem({ surname, name, middleName, position, phone, id }: Omit<User, 'lastSeen'>) {
  const { colors } = useTheme();
  const { push } = useRouter();
  const nameWithDots = `${surname} ${name[0].toUpperCase()}. ${middleName[0].toUpperCase()}.`;
  return (
    <TouchableRipple onPress={() => push(`/user/?name=${nameWithDots}&id=${id}` as Href)}>
      <View style={{ padding: 15, display: 'flex', rowGap: 5, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' }}>
        <Text
          style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: 16 }}>{`${surname} ${name} ${middleName}`}</Text>
        <Text style={{ color: '#828282' }}>{position}</Text>
        <Text style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: 16, color: colors.primary }}>{phone}</Text>
      </View>
    </TouchableRipple>
  );
}
