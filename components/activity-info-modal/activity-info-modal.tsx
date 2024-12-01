import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { RefObject, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';

import ErrorComponent from '../error-component/error-component';

import { useGetActivityByActivityIdQuery } from '@/redux/tracking-api';
import { formatDistance, formatDuration, getFormattedDate, getSpeedInKmHours } from '@/utils/locations';

export default function ActivityInfoModal({
  activityInfoModalRef,
  activityId,
  start,
  finish,
}: {
  activityInfoModalRef: RefObject<BottomSheetModal>;
  activityId: string;
  start: string;
  finish: string;
}) {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    [],
  );
  const {
    colors: { onSecondary, primary, background },
  } = useTheme();
  const {
    data: activity,
    isError,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetActivityByActivityIdQuery(activityId, { skip: !activityId });

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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#DADADA',
                paddingVertical: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: 700,
                  fontSize: 18,
                }}>{`${getFormattedDate(activity?.date)}, ${start} - ${finish}`}</Text>
            </View>
            <View style={{ paddingVertical: 15, display: 'flex', rowGap: 15 }}>
              <View style={styles.rowLayout}>
                <Text style={{ ...styles.title, fontSize: 16 }}>Продолжительность</Text>
                <Text style={{ ...styles.title, ...styles.value }}>{formatDuration(activity?.duration)}</Text>
              </View>
              <View style={styles.rowLayout}>
                <Text style={{ ...styles.title, fontSize: 16 }}>Расстояние</Text>
                <Text style={{ ...styles.title, ...styles.value }}>{formatDistance(activity?.distance)}</Text>
              </View>
              <View style={styles.rowLayout}>
                <Text style={{ ...styles.title, fontSize: 16 }}>Средняя скорость</Text>
                <Text
                  style={{
                    ...styles.title,
                    ...styles.value,
                  }}>{`${getSpeedInKmHours(activity?.duration, activity?.distance)}`}</Text>
              </View>
            </View>
            <View style={{ ...styles.rowLayout, marginTop: 40, columnGap: 10 }}>
              <Button mode="outlined" style={{ borderWidth: 1, borderColor: primary, borderRadius: 10, width: '50%' }}>
                <Text style={{ ...styles.title, fontSize: 14, color: primary }}>Написать</Text>
              </Button>
              <Button mode="contained" style={{ borderRadius: 10, width: '50%' }}>
                <Text style={{ ...styles.title, fontSize: 14, color: background }}>Позвонить</Text>
              </Button>
            </View>
          </View>
        )}
        {isLoading && <ActivityIndicator size="large" />}
        {isError && <ErrorComponent refetch={refetch} error={error} />}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
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
  value: {
    fontSize: 14,
    color: '#828282',
  },
  rowLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
