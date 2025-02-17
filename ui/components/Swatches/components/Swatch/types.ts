import type { CurveStyle, Swatch } from '@store/types';

export type SwatchProps = {
  swatch: Swatch;
  isEditing: boolean;
  curveStyle: CurveStyle;
  loadSwatch: (id: string) => void;
  deleteSwatch: (id: string) => void;
  duplicateSwatch: (id: string) => void;
};
