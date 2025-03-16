import camelCase from 'camelcase';
import type { ClassValue } from 'clsx';
import { hex, score } from 'wcag-contrast';
import { clsx } from 'clsx';
import { Bezier } from 'bezier-js';
import { twMerge } from 'tailwind-merge';
import convertColor from 'color-convert';
import type { HueValue, SwatchData } from '@appTypes/color';
import type { Point } from '@appTypes/coords';
import type { Swatch, Swatches } from '@store/types';
import { COLOR_RANGES } from '@constants/colors';
import {
  FIXED_CURVE,
  MAX_BOUNDARY,
  MIN_BOUNDARY,
} from '@components/BezierCurveGraph/constants';

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColorForCoordinates(
  hue: HueValue,
  pointCoords: Point,
  minBoundary: Point,
  maxBoundary: Point,
  returnHexValue = true,
) {
  const { x, y } = pointCoords;
  const saturationPoint = x - minBoundary.x;
  const brightnessPoint = y - minBoundary.y;

  const colorPickerWidth = maxBoundary.x - minBoundary.x;
  const colorPickerHeight = maxBoundary.y - minBoundary.y;

  const saturation = clamp((saturationPoint / colorPickerWidth) * 100, 0, 100);
  const value = clamp(
    100 - (brightnessPoint / colorPickerHeight) * 100,
    0,
    100,
  );
  if (returnHexValue) {
    const newColor = convertColor.hsv.hex([hue, saturation, value]);
    return `#${newColor}`;
  }
  return [hue, saturation, value];
}

export const getColorsFromCoordinates = (swatch: Swatch): string[] => {
  const {
    hue,
    startPoint,
    endPoint,
    startPointHandle,
    endPointHandle,
    stepCount,
  } = swatch;

  const { x: x1, y: y1 } = startPoint;
  const { x: x2, y: y2 } = endPoint;
  const { x: cx1, y: cy1 } = startPointHandle;
  const { x: cx2, y: cy2 } = endPointHandle;

  const curve = new Bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  const colorsCords = curve.getLUT(stepCount - 1);

  return colorsCords.map((colorCord) => {
    const { x, y } = colorCord;
    return getColorForCoordinates(
      hue,
      { x, y },
      MIN_BOUNDARY,
      MAX_BOUNDARY,
    ) as string;
  });
};

export const getSwatchData = (swatches: Swatches): SwatchData[] =>
  swatches.map((swatch) => {
    const { name, id } = swatch;
    const swatchName = camelCase(name);
    const colors = getColorsFromCoordinates(swatch);
    return {
      id,
      name,
      token: swatchName,
      colors: colors.map((color, index) => {
        const blackTextContrastRatio = hex(color, '#000');
        const whiteTextContrastRatio = hex(color, '#fff');
        return {
          hex: color,
          rgb: convertColor.hex.rgb(color),
          name: `${(index + 1) * 100}`,
          token: `${swatchName}.${(index + 1) * 100}`,
          contrast: {
            white: {
              ratio: whiteTextContrastRatio,
              score: score(whiteTextContrastRatio),
            },
            black: {
              ratio: blackTextContrastRatio,
              score: score(blackTextContrastRatio),
            },
          },
        };
      }),
    };
  });

export const getTokensData = (swatches: Swatches) => {
  const swatchData: Record<string, Record<string, string>> = {};

  for (const swatch of swatches) {
    const { name } = swatch;
    const swatchName = camelCase(name);

    const colors = getColorsFromCoordinates(swatch);
    swatchData[swatchName] = colors.reduce(
      (acc, color, index) => {
        acc[(index + 1) * 100] = color;
        return acc;
      },
      {} as Record<string, string>,
    );
  }

  return swatchData;
};

export const uuid = () => Date.now().toString(36);

export const isNeutralColor = (
  startPoint: Point,
  endPoint: Point,
  startPointHandle: Point,
  endPointHandle: Point,
) => {
  const { x: x1, y: y1 } = startPoint;
  const { x: x2, y: y2 } = endPoint;
  const { x: cx1, y: cy1 } = startPointHandle;
  const { x: cx2, y: cy2 } = endPointHandle;

  const { x: fx1, y: fy1 } = FIXED_CURVE.startPoint;
  const { x: fx2, y: fy2 } = FIXED_CURVE.endPoint;
  const { x: fcx1, y: fcy1 } = FIXED_CURVE.startPointHandle;
  const { x: fcx2, y: fcy2 } = FIXED_CURVE.endPointHandle;

  /**
   * pointsPositionCount[0] will count how many sampled points lie on the left
   * side of the fixed curve.
   * pointsPositionCount[1] will count how many sampled points lie on the right
   * side of the fixed curve.
   */
  const pointsPositionCount = [0, 0];

  // create curves for both fixed and plotted curve using Bezier function
  const curve = new Bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  const fixedCurve = new Bezier(fx1, fy1, fcx1, fcy1, fcx2, fcy2, fx2, fy2);
  // iterate through the samples with increment of 0.1
  for (let i = 0; i <= 1; i += 0.1) {
    // get point on the curve based on sample i value
    const pointOnFixedCurve = fixedCurve.get(i);
    // represents direction of the curve using the tangent of the point at i
    const tangentForPoint = fixedCurve.derivative(i);

    // this gets the length (magnitude) of the tangent.
    const length = Math.hypot(tangentForPoint.x, tangentForPoint.y);
    // dividing by the magnitude normalizes the tangent into a unit vector.
    if (length !== 0) {
      tangentForPoint.x /= length;
      tangentForPoint.y /= length;
    }

    // The left–normal (rotating the tangent 90° anti-clockwise)
    const leftNormal: Point = { x: tangentForPoint.y, y: -tangentForPoint.x };

    const pointOnCurve = curve.get(i);
    // Create a vector from the fixed curve’s point to the other curve’s point.
    const diff: Point = {
      x: pointOnCurve.x - pointOnFixedCurve.x,
      y: pointOnCurve.y - pointOnFixedCurve.y,
    };

    const dot = diff.x * leftNormal.x + diff.y * leftNormal.y;
    if (dot <= 0) {
      // point on left
      pointsPositionCount[0] += 1;
    } else {
      // point on right
      pointsPositionCount[1] += 1;
    }
  }

  if (pointsPositionCount[0] > pointsPositionCount[1]) {
    return true;
  }
  return false;
};

export const getNameFromHue = (
  hue: HueValue,
  startPoint: Point,
  endPoint: Point,
  startPointHandle: Point,
  endPointHandle: Point,
) => {
  if (hue < 0 || hue > 360) {
    return 'Invalid hue value. Hue should be between 0 and 360.';
  }

  if (isNeutralColor(startPoint, endPoint, startPointHandle, endPointHandle)) {
    return 'Neutral';
  }

  for (const { range, name } of COLOR_RANGES) {
    if (range.some(([start, end]) => hue >= start && hue < end)) {
      return name;
    }
  }

  return 'Unknown';
};

export const doesNameExistInArray = (
  names: string[],
  name: string,
  counter?: number,
): string => {
  const nameToFind = counter ? `${name} ${counter}` : name;
  const index = names.indexOf(nameToFind);
  const newCounter = counter ?? 1;
  if (index >= 0) {
    return doesNameExistInArray(names, name, newCounter + 1);
  }
  return nameToFind;
};
