import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { Point as PointType } from '@appTypes/coords';
import { COLOR_PICKER_CONTAINER_SIZE } from '@constants/colors';
import useColorPicker from '@store/colorPicker';
import CubicCurve from './components/CubicCurve';
import QuadraticCurve from './components/QuadraticCurve';
import styles from './bezierCurveGraph.module.css';

function BezierCurveGraph() {
  const { curveStyle } = useColorPicker(
    useShallow((state) => {
      const { curveStyle: curveStyleState } = state;

      return {
        curveStyle: curveStyleState,
      };
    }),
  );

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
      {curveStyle === 'polyBezier' ? (
        <QuadraticCurve
          elementPosition={elementPosition}
          elementDimensions={elementDimensions}
        />
      ) : (
        <CubicCurve
          elementPosition={elementPosition}
          elementDimensions={elementDimensions}
        />
      )}
    </svg>
  );
}

export default BezierCurveGraph;
