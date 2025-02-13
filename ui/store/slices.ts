import { doesNameExistInArray, getNameFromHue, uuid } from '@utils';
import cloneDeep from 'lodash/cloneDeep';
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
import { COORDINATES_DEFAULT_VALUES, INPUT_DEFAULT_VALUES } from './constants';

export const createInputsSlice = (
  set: SetFunction,
): InputsState & InputsAction => ({
  // initial state values
  ...INPUT_DEFAULT_VALUES,

  // state update action
  updateHue: (hue) => set({ hue }),

  updateCurveType: (curveType) => set({ curveType }),

  updateCurveSubType: (curveSubType) => set({ curveSubType }),

  updateStepCount: (stepCount) => set({ stepCount }),

  updateSwatchName: (swatchName) => set({ swatchName }),

  updateCurveStyle: (curveStyle) => set({ curveStyle }),

  updateHexColor: (hexColor) => set({ hexColor }),

  updateAutoGenerateSwatchName: (autoGenerateSwatchName) =>
    set({ autoGenerateSwatchName }),
});

export const createCoordinatesSlice = (
  set: SetFunction,
): CoordinatesState & CoordinatesAction => ({
  // initial state values
  ...COORDINATES_DEFAULT_VALUES,

  // state update action
  updateStartPoint: (startPoint) => set({ startPoint }),

  updateEndPoint: (endPoint) => set({ endPoint }),

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
        endPoint: preset.endPoint,
        startPointHandle: preset.startPoint,
        endPointHandle: preset.endPointHandle,
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
    const { swatches } = get();
    const swatchesCopy = cloneDeep(swatches);
    const index = swatchesCopy.findIndex((swatch) => swatch.id === id);
    swatchesCopy.splice(index, 1);

    const { endPoint, endPointHandle, startPoint, startPointHandle } =
      COORDINATES_DEFAULT_VALUES;
    const swatchName = getNameFromHue(
      INPUT_DEFAULT_VALUES.hue,
      startPoint,
      endPoint,
      startPointHandle,
      endPointHandle,
    );
    const swatchNames = swatches.map((swatch) => swatch.name);
    const newName = doesNameExistInArray(swatchNames, swatchName);
    set({
      ...COORDINATES_DEFAULT_VALUES,
      ...INPUT_DEFAULT_VALUES,
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
      } = swatch;
      set({
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        swatchEditingId: id,
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
