import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';

export interface FilteringModalProps {
  filteringModalRef: RefObject<BottomSheetModal>;
  setFilterByPosition: (arg: string[]) => void;
  filterByPosition: string[];
}
