import { useGlobalSearchParams } from 'expo-router';
import { View, FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import ActivityListItem from '@/components/activity-list-item/activity-list-item';
import ErrorComponent from '@/components/error-component/error-component';
import { useGetActivitiesByUserIdQuery } from '@/redux/tracking-api';
import { normalizeLocations } from '@/utils/locations';

export default function UserTrackingList() {
  const { id, name } = useGlobalSearchParams();
  const { data, isSuccess, isError, isLoading, refetch, error } = useGetActivitiesByUserIdQuery(
    { id: `${id}`, page: 0, take: 10 },
    { skip: !id },
  );
  return (
    <View style={[{ flex: 1 }, (isLoading || isError || !data?.activities.length) && styles.centeredLayout]}>
      {isLoading && <ActivityIndicator size="large" />}
      {isError && <ErrorComponent refetch={refetch} error={error} />}
      {isSuccess && (
        <FlatList
          data={normalizeLocations({ activities: data?.activities })}
          renderItem={({
            item: {
              id,
              date,
              distance,
              locations: { start, end },
            },
          }) => <ActivityListItem date={date} id={id} start={start} end={end} distance={distance} />}
          ListEmptyComponent={<Text variant="bodyLarge">{`${name} ещё никуда не ходил`}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredLayout: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
