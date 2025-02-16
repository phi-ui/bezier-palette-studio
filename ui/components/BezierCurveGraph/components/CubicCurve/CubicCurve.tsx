import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { CoordinatesAction } from '@store/types';
import type { EditableCoordsType, Point as PointType } from '@appTypes/coords';
import {
  MAX_BOUNDARY,
  MIN_BOUNDARY,
} from '@components/BezierCurveGraph/constants';
import useColorPicker from '@store/colorPicker';
import type { CubicCurveProps } from './types';
import Curve from '../Curve';
import CurvePoints from '../CurvePoints';
import Handle from '../Handle';
import Point from '../Point';

function CubicCurve({ elementDimensions, elementPosition }: CubicCurveProps) {
  const {
    hue,
    curveStyle,
    startPoint,
    updateStartPoint,
    endPoint,
    updateEndPoint,
    updateMidPoint,
    startPointHandle,
    updateStartPointHandle,
    endPointHandle,
    updateEndPointHandle,
  } = useColorPicker(
    useShallow((state) => {
      const {
        hue: hueState,
        curveStyle: curveStyleState,
        startPoint: startPointState,
        updateStartPoint: updateStartPointState,
        endPoint: endPointState,
        updateEndPoint: updateEndPointState,
        startPointHandle: startPointHandleState,
        updateStartPointHandle: updateStartPointHandleState,
        endPointHandle: endPointHandleState,
        updateEndPointHandle: updateEndPointHandleState,
        updateMidPoint: updateMidPointState,
      } = state;

      return {
        hue: hueState,
        curveStyle: curveStyleState,
        startPoint: startPointState,
        updateStartPoint: updateStartPointState,
        endPoint: endPointState,
        updateEndPoint: updateEndPointState,
        startPointHandle: startPointHandleState,
        updateStartPointHandle: updateStartPointHandleState,
        endPointHandle: endPointHandleState,
        updateEndPointHandle: updateEndPointHandleState,
        updateMidPoint: updateMidPointState,
      };
    }),
  );
  const updateCoords: Record<
    EditableCoordsType,
    CoordinatesAction[keyof CoordinatesAction]
  > = useMemo(
    () => ({
      startPoint: updateStartPoint,
      endPoint: updateEndPoint,
      midPoint: updateMidPoint,
      startPointHandle: updateStartPointHandle,
      endPointHandle: updateEndPointHandle,
    }),
    [
      updateEndPoint,
      updateEndPointHandle,
      updateStartPoint,
      updateStartPointHandle,
      updateMidPoint,
    ],
  );

  const handlePointCoords = (coords: PointType, type: EditableCoordsType) => {
    updateCoords[type](coords);
  };

  return (
    <>
      <Handle
        x={startPointHandle.x}
        y={startPointHandle.y}
        pointCoords={{
          x: startPoint.x,
          y: startPoint.y,
        }}
      />

      <Handle
        x={endPointHandle.x}
        y={endPointHandle.y}
        pointCoords={{
          x: endPoint.x,
          y: endPoint.y,
        }}
      />
      <Curve
        startPoint={startPoint}
        endPoint={endPoint}
        startPointHandle={startPointHandle}
        endPointHandle={endPointHandle}
      />
      <CurvePoints />
      <Point
        x={startPointHandle.x}
        y={startPointHandle.y}
        disabled={curveStyle === 'presets'}
        type="startPointHandle"
        parentCoords={elementPosition}
        handlePointCoords={handlePointCoords}
        maxBoundary={elementDimensions?.max}
        minBoundary={elementDimensions?.min}
      />
      <Point
        x={endPointHandle.x}
        y={endPointHandle.y}
        disabled={curveStyle === 'presets'}
        type="endPointHandle"
        parentCoords={elementPosition}
        handlePointCoords={handlePointCoords}
        maxBoundary={elementDimensions?.max}
        minBoundary={elementDimensions?.min}
      />
      <Point
        hue={hue}
        x={startPoint.x}
        y={startPoint.y}
        type="startPoint"
        maxBoundary={MAX_BOUNDARY}
        minBoundary={MIN_BOUNDARY}
        parentCoords={elementPosition}
        handlePointCoords={handlePointCoords}
      />
      <Point
        hue={hue}
        x={endPoint.x}
        y={endPoint.y}
        type="endPoint"
        maxBoundary={MAX_BOUNDARY}
        minBoundary={MIN_BOUNDARY}
        parentCoords={elementPosition}
        handlePointCoords={handlePointCoords}
      />
    </>
  );
}

export default CubicCurve;
