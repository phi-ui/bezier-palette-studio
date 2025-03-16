import { doesNameExistInArray, getNameFromHue, uuid } from '@utils';
import cloneDeep from 'lodash/cloneDeep';
import convertColor from 'color-convert';
import type { HueValue } from '@appTypes/color';
import {
  COLOR_PICKER_CONTAINER_SIZE,
  COLOR_PICKER_SIZE,
} from '@constants/colors';
import type {
  CoordinatesAction,
  CoordinatesState,
  GetFunction,
  InputsAction,
  InputsState,
  PresetsAction,
  PresetsState,
  SetFunction,
  Swatches,
  SwatchesAction,
  SwatchesState,
} from './types';
import {
  CUBIC_BEZIER_DEFAULT_VALUES,
  DEFAULT_HEX_COLOR,
  INPUT_DEFAULT_VALUES,
  POLY_BEZIER_DEFAULT_VALUES,
} from './constants';

export const createInputsSlice = (
  set: SetFunction,
): InputsState & InputsAction => ({
  // initial state values
  ...INPUT_DEFAULT_VALUES,

  // state update action
  updateHue: (hue, newHexColor) => {
    if (newHexColor) {
      set({ hue, hexColor: newHexColor });
    } else {
      set({ hue });
    }
  },

  updateCurveType: (curveType) => set({ curveType }),

  updateCurveSubType: (curveSubType) => set({ curveSubType }),

  updateStepCount: (stepCount) => set({ stepCount }),

  updateSwatchName: (swatchName) => set({ swatchName }),

  updateCurveStyle: (curveStyle) => {
    const coords =
      curveStyle === 'polyBezier'
        ? POLY_BEZIER_DEFAULT_VALUES
        : CUBIC_BEZIER_DEFAULT_VALUES;
    set({ curveStyle, hexColor: DEFAULT_HEX_COLOR, ...coords });
  },

  updateHexColor: (hexColor, isColorValid) => {
    const colorPickerPadding =
      (COLOR_PICKER_CONTAINER_SIZE - COLOR_PICKER_SIZE) / 2;
    const [hue, saturation, value] = convertColor.hex.hsv(hexColor);
    const x = (saturation * COLOR_PICKER_SIZE) / 100;
    const y = ((100 - value) * COLOR_PICKER_SIZE) / 100;

    if (isColorValid) {
      // set midpoint coordinate and hue if user explicitly sets hex value
      set({
        hexColor,
        hue: hue as HueValue,
        midPoint: { x: x + colorPickerPadding, y: y + colorPickerPadding },
      });
    } else {
      // if not valid or the hex value being set programmatically directly update the value
      set({
        hexColor,
      });
    }
  },

  updateAutoGenerateSwatchName: (autoGenerateSwatchName) =>
    set({ autoGenerateSwatchName }),
});

export const createCoordinatesSlice = (
  set: SetFunction,
): CoordinatesState & CoordinatesAction => ({
  // initial state values
  ...CUBIC_BEZIER_DEFAULT_VALUES,

  // state update action
  updateStartPoint: (startPoint) => set({ startPoint }),

  updateEndPoint: (endPoint) => set({ endPoint }),

  updateMidPoint: (midPoint) => set({ midPoint }),

  updateStartPointHandle: (startPointHandle) => set({ startPointHandle }),

  updateEndPointHandle: (endPointHandle) => set({ endPointHandle }),
});

export const createPresetsSlice = (
  set: SetFunction,
  get: GetFunction,
): PresetsState & PresetsAction => ({
  presets: [],
  loadPreset: (id: string) => {
    const preset = get().presets.find((p) => p.id === id);
    if (preset) {
      set({
        hue: preset.hue,
        stepCount: preset.stepCount,
        startPoint: preset.startPoint,
        midPoint: preset.midPoint,
        endPoint: preset.endPoint,
        startPointHandle: preset.startPoint,
        endPointHandle: preset.endPointHandle,
        hexColor: preset.hexColor,
      });
    }
  },
});

export const createSwatchesSlice = (
  set: SetFunction,
  get: GetFunction,
): SwatchesState & SwatchesAction => ({
  swatches: [],
  swatchEditingId: null,
  createSwatch: (swatch) => {
    const { swatches } = get();
    const swatchesCopy = cloneDeep(swatches);
    swatchesCopy.push({ ...swatch, id: uuid() });
    set({ swatches: swatchesCopy });
  },

  updateSwatch: (swatch) => {
    const { swatches, swatchEditingId } = get();
    const swatchesCopy = cloneDeep(swatches);
    const index = swatchesCopy.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (swatch) => swatch.id === swatchEditingId,
    );
    if (index >= 0) {
      swatchesCopy[index] = swatch;
    }
    set({ swatches: swatchesCopy });
  },

  duplicateSwatch: (id: string) => {
    const { swatches } = get();
    const swatch = swatches.find((s) => s.id === id);
    if (swatch) {
      const { id: swatchId, name, ...restSwatchData } = swatch;
      const swatchName = `${name} Copy`;
      const swatchNames = swatches.map((s) => s.name);
      const newName = doesNameExistInArray(swatchNames, swatchName);
      const swatchesCopy = cloneDeep(swatches);
      swatchesCopy.push({ ...restSwatchData, name: newName, id: uuid() });
      set({ swatches: swatchesCopy });
    }
  },

  deleteSwatch: (id) => {
    const { swatches, hue } = get();
    const swatchesCopy = cloneDeep(swatches);
    const index = swatchesCopy.findIndex((swatch) => swatch.id === id);
    swatchesCopy.splice(index, 1);

    const { endPoint, endPointHandle, startPoint, startPointHandle } =
      CUBIC_BEZIER_DEFAULT_VALUES;
    const swatchName = getNameFromHue(
      hue,
      startPoint,
      endPoint,
      startPointHandle,
      endPointHandle,
    );
    const swatchNames = swatches.map((swatch) => swatch.name);
    const newName = doesNameExistInArray(swatchNames, swatchName);
    set({
      swatchName: newName,
      swatches: swatchesCopy,
      swatchEditingId: null,
    });
  },

  loadSwatch: (id) => {
    const { swatches } = get();
    const swatch = swatches.find((s) => s.id === id);
    if (swatch) {
      const {
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        curveStyle,
        hexColor,
        autoGenerateSwatchName,
        curveSubType,
        curveType,
        swatchName,
        midPoint,
      } = swatch;
      set({
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        hexColor,
        curveStyle,
        swatchEditingId: id,
        autoGenerateSwatchName,
        curveSubType,
        curveType,
        swatchName,
        midPoint,
      });
    }
  },

  unloadSwatch: () => {
    set({ swatchEditingId: null });
  },

  importSwatches: (swatches: Swatches) => {
    set({ swatches });
  },
});
