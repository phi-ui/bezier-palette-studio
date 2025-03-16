import type { Point } from '@appTypes/coords';
import type { HueValue } from '@appTypes/color';
import type { CurveType, CurveSubType } from '@appTypes/curves';

export type CurveStyle = 'cubicBezier' | 'polyBezier' | 'presets';

export type InputsState = {
  stepCount: number;
  hue: HueValue;
  curveType: CurveType | '';
  curveSubType: CurveSubType | '';
  curveStyle: CurveStyle;
  hexColor: string;
  swatchName: string;
  autoGenerateSwatchName: boolean;
};

export type CoordinatesState = {
  startPoint: Point;
  endPoint: Point;
  startPointHandle: Point;
  endPointHandle: Point;
  midPoint?: Point;
};

type Preset = InputsState & CoordinatesState & { id: string };
export type Swatch = Preset & { name: string };
type Presets = Preset[];
export type Swatches = Swatch[];

export type PresetsState = {
  presets: Presets;
};

export type SwatchesState = {
  swatches: Swatches;
  swatchEditingId: string | null;
};

export type InputsAction = {
  updateHue: (
    hue: InputsState['hue'],
    newHexColor?: InputsState['hexColor'],
  ) => void;
  updateStepCount: (hue: InputsState['stepCount']) => void;
  updateSwatchName: (hue: InputsState['swatchName']) => void;
  updateCurveType: (hue: InputsState['curveType']) => void;
  updateCurveSubType: (hue: InputsState['curveSubType']) => void;
  updateCurveStyle: (curveStyle: InputsState['curveStyle']) => void;
  updateHexColor: (
    hexColor: InputsState['hexColor'],
    isColorValid?: boolean,
  ) => void;
  updateAutoGenerateSwatchName: (
    autoGenerateSwatchName: InputsState['autoGenerateSwatchName'],
  ) => void;
};

export type CoordinatesAction = {
  updateStartPoint: (startPoint: CoordinatesState['startPoint']) => void;
  updateEndPoint: (endPoint: CoordinatesState['endPoint']) => void;
  updateMidPoint: (midPoint: CoordinatesState['midPoint']) => void;
  updateStartPointHandle: (
    startPointHandle: CoordinatesState['startPointHandle'],
  ) => void;
  updateEndPointHandle: (
    endPointHandle: CoordinatesState['endPointHandle'],
  ) => void;
};

export type PresetsAction = {
  loadPreset: (id: string) => void;
};

export type SwatchesAction = {
  createSwatch: (swatch: Omit<Swatch, 'id'>) => void;
  updateSwatch: (swatch: Swatch) => void;
  duplicateSwatch: (id: string) => void;
  deleteSwatch: (id: string) => void;
  loadSwatch: (id: string) => void;
  unloadSwatch: () => void;
  importSwatches: (swatches: Swatches) => void;
};

export type SetFunction = (
  partialState: Partial<
    InputsState & CoordinatesState & PresetsState & SwatchesState
  >,
) => void;

export type GetFunction = () => InputsState &
  InputsAction &
  CoordinatesState &
  CoordinatesAction &
  PresetsState &
  PresetsAction &
  SwatchesState &
  SwatchesAction;
