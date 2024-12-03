import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';

import { RenderType } from './const';

export interface ControlsProps {
  renderType: RenderType;
  setRenderType: (arg: RenderType) => void;
  filteringModalRef: RefObject<BottomSheetModal>;
}
