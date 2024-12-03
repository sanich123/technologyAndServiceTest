import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Fragment, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, RadioButton, Text, TouchableRipple, useTheme } from 'react-native-paper';

import { FilteringModalProps } from './types';
import ResetFiltersBtn from '../reset-filters-btn/reset-filters-btn';

import { USERS } from '@/constants/mocks';

export default function FilteringModal({
  filteringModalRef,
  setFilterByPosition,
  filterByPosition,
}: FilteringModalProps) {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    [],
  );
  const {
    colors: { onSecondary, primary },
  } = useTheme();

  return (
    <BottomSheetModal
      ref={filteringModalRef}
      index={0}
      snapPoints={['50%']}
      backdropComponent={renderBackdrop}
      handleStyle={{
        backgroundColor: onSecondary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
      }}
      backgroundStyle={{ backgroundColor: onSecondary }}
      handleIndicatorStyle={{ backgroundColor: primary }}>
      <BottomSheetView style={{ flex: 1, padding: 10, backgroundColor: onSecondary }}>
        {[...new Set(USERS.map(({ position }) => position))].map((position) => (
          <Fragment key={position}>
            <TouchableRipple
              borderless
              style={styles.radioBtn}
              onPress={() => {
                if (filterByPosition.includes(position)) {
                  setFilterByPosition(filterByPosition.filter((recentPosition) => position !== recentPosition));
                } else {
                  setFilterByPosition([...filterByPosition, position]);
                }
              }}>
              <>
                <Text variant="titleMedium">{position}</Text>
                <RadioButton value={position} status={filterByPosition.includes(position) ? 'checked' : 'unchecked'} />
              </>
            </TouchableRipple>
            <Divider />
          </Fragment>
        ))}
        <ResetFiltersBtn setFilterByPosition={setFilterByPosition} />
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  radioBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});
