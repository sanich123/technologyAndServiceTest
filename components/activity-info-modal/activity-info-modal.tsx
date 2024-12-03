import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useGlobalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

import ActionBtns from '../action-btns/action-btns';
import ActivityMetrics from '../activity-metrics/activity-metrics';
import ErrorComponent from '../error-component/error-component';

import { METRICS_TITLES } from '@/constants/enums';
import { ActivityModalProps } from '@/constants/types';
import { useAppSelector } from '@/redux/store';
import { useGetActivityByActivityIdQuery } from '@/redux/tracking-api';
import { formatDistance, formatDuration, getFormattedDate, getSpeedInKmHours } from '@/utils/locations';

export default function ActivityInfoModal({ activityInfoModalRef, activityId, start, finish }: ActivityModalProps) {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    [],
  );
  const {
    colors: { onSecondary, primary },
  } = useTheme();
  const {
    data: activity,
    isError,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetActivityByActivityIdQuery(activityId, { skip: !activityId });
  const { language } = useAppSelector(({ language }) => language);
  const { phone } = useGlobalSearchParams();
  return (
    <BottomSheetModal
      ref={activityInfoModalRef}
      index={0}
      snapPoints={['43%']}
      backdropComponent={renderBackdrop}
      handleStyle={{
        backgroundColor: onSecondary,
        ...styles.handleStyles,
      }}
      backgroundStyle={{ backgroundColor: onSecondary }}
      handleIndicatorStyle={{ backgroundColor: primary }}>
      <BottomSheetView style={[{ flex: 1, padding: 10, backgroundColor: onSecondary }]}>
        {isSuccess && (
          <View style={{ marginHorizontal: 15 }}>
            <View style={styles.layout}>
              <Text style={styles.boldText}>{`${getFormattedDate(activity?.date)}, ${start} - ${finish}`}</Text>
            </View>
            <View style={styles.metricsLayout}>
              <ActivityMetrics title={METRICS_TITLES[language].duration} value={formatDuration(activity?.duration)} />
              <ActivityMetrics title={METRICS_TITLES[language].distance} value={formatDistance(activity?.distance)} />
              <ActivityMetrics
                title={METRICS_TITLES[language].speed}
                value={`${getSpeedInKmHours(activity?.duration, activity?.distance)}`}
              />
            </View>
            <ActionBtns phone={phone.toString()} />
          </View>
        )}
        {isLoading && <ActivityIndicator size="large" />}
        {isError && <ErrorComponent refetch={refetch} error={error} />}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  layout: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    paddingVertical: 15,
  },
  boldText: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 18,
  },
  metricsLayout: { paddingVertical: 15, display: 'flex', rowGap: 15 },
  handleStyles: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
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
