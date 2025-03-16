import type { Point } from '@appTypes/coords';

export type MandatoryCurveProps = {
  startPoint: Point;
  endPoint: Point;
};

export type CubicCurveProps = {
  startPointHandle: Point;
  endPointHandle: Point;
};

export type QuadraticCurveProps = {
  controlPoint: Point;
};

export type CurveProps = MandatoryCurveProps &
  (CubicCurveProps | QuadraticCurveProps);
