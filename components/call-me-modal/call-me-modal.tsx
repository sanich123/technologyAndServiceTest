import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import ActionBtns from '../action-btns/action-btns';

import { CallMeModalProps } from '@/constants/types';

export default function CallMeModal({ callMeModalRef, phone }: CallMeModalProps) {
  const {
    colors: { onSecondary, primary },
  } = useTheme();

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    [],
  );
  return (
    <BottomSheetModal
      ref={callMeModalRef}
      index={0}
      snapPoints={['40%']}
      backdropComponent={renderBackdrop}
      handleStyle={{ backgroundColor: onSecondary, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      backgroundStyle={{ backgroundColor: onSecondary }}
      handleIndicatorStyle={{ backgroundColor: primary }}>
      <BottomSheetView style={{ backgroundColor: onSecondary }}>
        <View style={{ flex: 1, padding: 10 }}>
          <ActionBtns phone={phone} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
