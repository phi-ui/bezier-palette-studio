import type { CubicCurveProps, CurveProps, MandatoryCurveProps } from './types';

function isCubicCurve(
  curve: CurveProps,
): curve is MandatoryCurveProps & CubicCurveProps {
  return 'endPointHandle' in curve;
}

function Curve(props: CurveProps) {
  let path = '';
  if (isCubicCurve(props)) {
    const { startPoint, startPointHandle, endPoint, endPointHandle } = props;
    const { x: x1, y: y1 } = startPoint;
    const { x: x2, y: y2 } = endPoint;
    const { x: cx1, y: cy1 } = startPointHandle;
    const { x: cx2, y: cy2 } = endPointHandle;

    path = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  } else {
    const { startPoint, endPoint, controlPoint } = props;
    const { x: x1, y: y1 } = startPoint;
    const { x: x2, y: y2 } = endPoint;
    const { x: cx1, y: cy1 } = controlPoint;

    path = `M ${x1} ${y1} Q ${cx1} ${cy1}, ${x2} ${y2}`;
  }

  return <path d={path} stroke="white" fill="transparent" />;
}

export default Curve;
