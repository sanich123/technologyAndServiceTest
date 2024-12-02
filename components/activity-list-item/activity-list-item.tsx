import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { TouchableRipple, useTheme, Text } from 'react-native-paper';

import { Languages } from '@/constants/enums';
import { ActivityListItemProps } from '@/constants/types';
import { useAppSelector } from '@/redux/store';
import { formatDistance } from '@/utils/locations';

export default function ActivityListItem({ date, id, start, end, distance }: ActivityListItemProps) {
  const {
    colors: { primary, background },
  } = useTheme();
  const { push } = useRouter();
  const { language } = useAppSelector(({ language }) => language);
  const isRussian = language === Languages.russian;

  return (
    <TouchableRipple onPress={() => push(`/user/activity?activityId=${id}`)}>
      <View style={{ display: 'flex' }}>
        <View style={{ padding: 15, backgroundColor: background }}>
          <Text style={{ ...styles.fontStyles, fontSize: 16 }}>
            {new Date(date).toLocaleDateString(isRussian ? 'ru' : 'en', { day: 'numeric', month: 'long' })}
          </Text>
        </View>

        <View style={styles.timeDistanceLayout}>
          <Text
            style={{
              ...styles.fontStyles,
              fontSize: 16,
              color: primary,
            }}>{`${start} - ${end}`}</Text>

          <Text
            style={{
              ...styles.fontStyles,
              fontSize: 14,
              color: '#828282',
            }}>
            {formatDistance(distance)}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  fontStyles: {
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  timeDistanceLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#E2E2E2',
    borderBottomColor: '#E2E2E2',
  },
});
