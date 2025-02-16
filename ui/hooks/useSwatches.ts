import type { Point } from '@appTypes/coords';
import useColorPicker from '@store/colorPicker';
import { Bezier } from 'bezier-js';
import { useShallow } from 'zustand/react/shallow';

const useSwatches = () => {
  const {
    hue,
    startPoint,
    endPoint,
    midPoint,
    startPointHandle,
    endPointHandle,
    stepCount,
    curveStyle,
  } = useColorPicker(
    useShallow((state) => {
      const {
        hue: hueState,
        startPoint: startPointState,
        endPoint: endPointState,
        midPoint: midPointState,
        startPointHandle: startPointHandleState,
        endPointHandle: endPointHandleState,
        stepCount: stepCountState,
        curveStyle: curveStyleState,
      } = state;

      return {
        hue: hueState,
        startPoint: startPointState,
        endPoint: endPointState,
        midPoint: midPointState,
        startPointHandle: startPointHandleState,
        endPointHandle: endPointHandleState,
        stepCount: stepCountState,
        curveStyle: curveStyleState,
      };
    }),
  );

  const { x: x1, y: y1 } = startPoint;
  const { x: x2, y: y2 } = endPoint;
  const { x: cx1, y: cy1 } = startPointHandle;
  const { x: cx2, y: cy2 } = endPointHandle;

  let swatchCoordinates: Point[] = [];
  if (curveStyle === 'polyBezier' && midPoint) {
    const { x: mx, y: my } = midPoint;
    const dividedSteps = Math.ceil(stepCount / 2);
    const curve1 = new Bezier(x1, y1, cx1, cy1, mx, my);
    const curve2 = new Bezier(mx, my, cx2, cy2, x2, y2);
    const colorsCords1 = curve1.getLUT(
      stepCount % 2 === 0 ? dividedSteps : dividedSteps - 1,
    );
    colorsCords1.pop();
    const colorsCords2 = curve2.getLUT(dividedSteps - 1);
    colorsCords2.shift();
    swatchCoordinates = [...colorsCords1, ...colorsCords2];
  } else {
    const curve = new Bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
    swatchCoordinates = curve.getLUT(stepCount - 1);
  }

  return { swatchCoordinates, hue };
};

export default useSwatches;
