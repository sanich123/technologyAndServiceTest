import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useGlobalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, FAB, useTheme } from 'react-native-paper';

import ActivityInfoModal from '@/components/activity-info-modal/activity-info-modal';
import DisplayRoute from '@/components/display-route/display-route';
import ErrorComponent from '@/components/error-component/error-component';
import { useGetLocationsByActivityIdQuery } from '@/redux/tracking-api';
import { formatDateFromTimestamp } from '@/utils/locations';

export default function DisplayActivity() {
  const { activityId } = useGlobalSearchParams();
  const { data, isLoading, isError, isSuccess, refetch, error } = useGetLocationsByActivityIdQuery(`${activityId}`, {
    skip: !activityId,
  });
  const activityInfoModalRef = useRef<BottomSheetModal>(null);
  useEffect(() => {
    if (isSuccess) {
      activityInfoModalRef?.current?.present();
    }
  }, [isSuccess]);
  const { colors } = useTheme();
  return (
    <BottomSheetModalProvider>
      <View style={[{ flex: 1 }, (isLoading || isError) && styles.centeredLayout]}>
        {isLoading && <ActivityIndicator size="large" />}
        {isError && <ErrorComponent refetch={refetch} error={error} />}
        {isSuccess && <DisplayRoute locations={data?.locations} />}
        <FAB
          icon="information-outline"
          color="white"
          style={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: colors.primary }}
          onPress={() => activityInfoModalRef?.current?.present()}
        />
      </View>
      {isSuccess && data?.locations.length > 1 && (
        <ActivityInfoModal
          activityInfoModalRef={activityInfoModalRef}
          activityId={`${activityId}`}
          start={formatDateFromTimestamp(data?.locations[0].timestamp)}
          finish={formatDateFromTimestamp(data?.locations[data?.locations.length - 1].timestamp)}
        />
      )}
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  centeredLayout: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
