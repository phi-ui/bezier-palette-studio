import type { CoordinatesState, InputsState } from './types';

export const INPUT_DEFAULT_VALUES: InputsState = {
  hue: 0,
  curveType: '',
  curveSubType: '',
  swatchName: '',
  autoGenerateSwatchName: true,
  stepCount: 9,
  curveStyle: 'cubicBezier',
};

export const COORDINATES_DEFAULT_VALUES: CoordinatesState = {
  startPoint: {
    x: 90,
    y: 80,
  },
  endPoint: {
    x: 370,
    y: 300,
  },
  startPointHandle: {
    x: 360,
    y: 85,
  },
  endPointHandle: {
    x: 370,
    y: 65,
  },
};
