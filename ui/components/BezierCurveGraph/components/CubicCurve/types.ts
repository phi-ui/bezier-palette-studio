import type { Point } from '@appTypes/coords';

export type CubicCurveProps = {
  elementPosition?: Point;
  elementDimensions?: {
    min: Point;
    max: Point;
  };
};
