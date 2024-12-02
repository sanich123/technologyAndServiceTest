import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { IconButton, useTheme } from 'react-native-paper';

import ChangeLanguageModal from '../change-language-modal/change-language-modal';

export default function SettingsBtn() {
  const languagesModalRef = useRef<BottomSheetModal>(null);
  const {
    colors: { primary },
  } = useTheme();
  return (
    <>
      <IconButton
        size={36}
        icon="cog"
        iconColor={primary}
        onPress={() => languagesModalRef.current?.present()}
        style={{ marginLeft: 0 }}
      />
      <ChangeLanguageModal languagesModalRef={languagesModalRef} />
    </>
  );
}
