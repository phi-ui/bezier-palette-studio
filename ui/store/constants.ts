import type { CoordinatesState, InputsState } from './types';

export const INPUT_DEFAULT_VALUES: InputsState = {
  hue: 0,
  curveType: '',
  curveSubType: '',
  swatchName: '',
  autoGenerateSwatchName: true,
  stepCount: 9,
  curveStyle: 'cubicBezier',
  hexColor: '-',
};

export const CUBIC_BEZIER_DEFAULT_VALUES: CoordinatesState = {
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

export const POLY_BEZIER_DEFAULT_VALUES: CoordinatesState = {
  startPoint: {
    x: 90,
    y: 80,
  },
  endPoint: {
    x: 362.5,
    y: 341,
  },
  startPointHandle: {
    x: 293.5,
    y: 70,
  },
  endPointHandle: {
    x: 377.5,
    y: 135,
  },
  midPoint: {
    x: 338.5,
    y: 107,
  },
};

export const DEFAULT_HEX_COLOR = '#E41C1C';
