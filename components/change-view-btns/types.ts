import { RenderType } from '../controls/const';

export interface ChangeViewBtnsProps {
  renderType: RenderType;
  setRenderType: (arg: RenderType) => void;
}
