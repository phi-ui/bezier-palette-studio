import type { Point } from '@appTypes/coords';

export type QuadraticCurveProps = {
  elementPosition?: Point;
  elementDimensions?: {
    min: Point;
    max: Point;
  };
};
