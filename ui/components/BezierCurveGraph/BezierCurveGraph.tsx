import { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { EditableCoordsType, Point as PointType } from '@appTypes/coords';
import type { CoordinatesAction } from '@store/types';
import { COLOR_PICKER_CONTAINER_SIZE } from '@constants/colors';
import useColorPicker from '@store/colorPicker';
import { MAX_BOUNDARY, MIN_BOUNDARY } from './constants';
import Curve from './components/Curve';
import Handle from './components/Handle';
import Point from './components/Point';
import CurvePoints from './components/CurvePoints';
import styles from './bezierCurveGraph.module.css';

function BezierCurveGraph() {
  const {
    hue,
    curveStyle,
    startPoint,
    updateStartPoint,
    endPoint,
    updateEndPoint,
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
      startPointHandle: updateStartPointHandle,
      endPointHandle: updateEndPointHandle,
    }),
    [
      updateEndPoint,
      updateEndPointHandle,
      updateStartPoint,
      updateStartPointHandle,
    ],
  );

  const handlePointCoords = (coords: PointType, type: EditableCoordsType) => {
    updateCoords[type](coords);
  };

  const containerRef = useRef<SVGSVGElement>(null);
  const [elementPosition, setElementPosition] = useState<PointType | undefined>(
    undefined,
  );
  const [elementDimensions, setElementDimensions] = useState<
    { min: PointType; max: PointType } | undefined
  >(undefined);

  useEffect(() => {
    if (containerRef.current) {
      const dimensions = containerRef.current.getBoundingClientRect();
      setElementPosition({
        x: dimensions.x,
        y: dimensions.y,
      });
      setElementDimensions({
        min: {
          x: 0,
          y: 0,
        },
        max: {
          x: dimensions.width,
          y: dimensions.height,
        },
      });
    }
  }, []);

  return (
    <svg
      ref={containerRef}
      className={styles.bezierCurveGraphContainer}
      width={COLOR_PICKER_CONTAINER_SIZE}
      height={COLOR_PICKER_CONTAINER_SIZE}
    >
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
    </svg>
  );
}

export default BezierCurveGraph;
