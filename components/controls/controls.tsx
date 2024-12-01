import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { View } from 'react-native';
import { Button, Icon, Text, useTheme } from 'react-native-paper';

import { RenderType } from './const';
import ChangeViewBtns from '../change-view-btns/change-view-btns';

export default function Controls({
  renderType,
  setRenderType,
  filteringModalRef,
}: {
  renderType: RenderType;
  setRenderType: (arg: RenderType) => void;
  filteringModalRef: RefObject<BottomSheetModal>;
}) {
  const {
    colors: { primary, background },
  } = useTheme();

  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <ChangeViewBtns renderType={renderType} setRenderType={setRenderType} />
        <Icon size={36} source="cog" color={primary} />
      </View>
      <View>
        <Button mode="contained" style={{ borderRadius: 8 }} onPress={() => filteringModalRef.current?.present()}>
          <Text variant="bodyLarge" style={{ color: background }}>
            Фильтр
          </Text>
        </Button>
      </View>
    </View>
  );
}
