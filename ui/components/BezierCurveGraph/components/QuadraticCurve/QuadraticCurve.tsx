import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { EditableCoordsType, Point as PointType } from '@appTypes/coords';
import type { CoordinatesAction } from '@store/types';
import {
  MAX_BOUNDARY,
  MIN_BOUNDARY,
} from '@components/BezierCurveGraph/constants';
import { getColorForCoordinates } from '@utils/index';
import useColorPicker from '@store/colorPicker';
import type { QuadraticCurveProps } from './types';
import Point from '../Point';
import Curve from '../Curve';
import Handle from '../Handle';
import CurvePoints from '../CurvePoints';

function QuadraticCurve({
  elementDimensions,
  elementPosition,
}: QuadraticCurveProps) {
  const {
    hue,
    updateHexColor,
    startPoint,
    updateStartPoint,
    endPoint,
    updateEndPoint,
    startPointHandle,
    updateStartPointHandle,
    endPointHandle,
    updateEndPointHandle,
    midPoint,
    updateMidPoint,
  } = useColorPicker(
    useShallow((state) => {
      const {
        hue: hueState,
        updateHexColor: updateHexColorState,
        startPoint: startPointState,
        updateStartPoint: updateStartPointState,
        endPoint: endPointState,
        midPoint: midPointState,
        updateMidPoint: updateMidPointState,
        updateEndPoint: updateEndPointState,
        startPointHandle: startPointHandleState,
        updateStartPointHandle: updateStartPointHandleState,
        endPointHandle: endPointHandleState,
        updateEndPointHandle: updateEndPointHandleState,
      } = state;

      return {
        hue: hueState,
        updateHexColor: updateHexColorState,
        startPoint: startPointState,
        updateStartPoint: updateStartPointState,
        endPoint: endPointState,
        updateEndPoint: updateEndPointState,
        midPoint: midPointState,
        updateMidPoint: updateMidPointState,
        startPointHandle: startPointHandleState,
        updateStartPointHandle: updateStartPointHandleState,
        endPointHandle: endPointHandleState,
        updateEndPointHandle: updateEndPointHandleState,
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
    if (type === 'midPoint') {
      // update hex color on mid point change
      const newColor = getColorForCoordinates(
        hue,
        { ...coords },
        MIN_BOUNDARY,
        MAX_BOUNDARY,
      );
      updateHexColor(newColor as string);
    }
  };

  return (
    <>
      <Handle
        x={startPointHandle.x}
        y={startPointHandle.y}
        pointCoords={{
          x: midPoint!.x,
          y: midPoint!.y,
        }}
      />
      <Handle
        x={endPointHandle.x}
        y={endPointHandle.y}
        pointCoords={{
          x: midPoint!.x,
          y: midPoint!.y,
        }}
      />
      <Point
        x={startPointHandle.x}
        y={startPointHandle.y}
        type="startPointHandle"
        parentCoords={elementPosition}
        handlePointCoords={handlePointCoords}
        maxBoundary={elementDimensions?.max}
        minBoundary={elementDimensions?.min}
      />
      <Point
        x={endPointHandle.x}
        y={endPointHandle.y}
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
      <Curve
        startPoint={startPoint}
        endPoint={midPoint!}
        controlPoint={startPointHandle}
      />
      <Curve
        startPoint={midPoint!}
        endPoint={endPoint}
        controlPoint={endPointHandle}
      />
      <CurvePoints />
      <Point
        hue={hue}
        x={midPoint!.x}
        y={midPoint!.y}
        type="midPoint"
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

export default QuadraticCurve;
