import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { RefObject, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

import { USERS } from '@/constants/mocks';

export default function FilteringModal({
  filteringModalRef,
  setFilterByPosition,
}: {
  filteringModalRef: RefObject<BottomSheetModal>;
  setFilterByPosition: (arg: string) => void;
}) {
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
        <FlatList
          data={[...new Set(USERS.map(({ position }) => position)), 'Сбросить фильтрацию']}
          renderItem={({ item: position }) => (
            <TouchableRipple
              onPress={() => {
                setFilterByPosition(position === 'Сбросить фильтрацию' ? '' : position);
                filteringModalRef.current?.close();
              }}>
              <View>
                <Text variant="bodyLarge">{position}</Text>
              </View>
            </TouchableRipple>
          )}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}
