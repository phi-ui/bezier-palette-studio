import type { CurveStyle, Swatches } from '@store/types';

export type TokensInfoModalProps = {
  atLeastOneSwatchCreated: boolean;
  swatches: Swatches;
  curveStyle: CurveStyle;
};
