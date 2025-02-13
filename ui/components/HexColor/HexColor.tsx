import { useShallow } from 'zustand/react/shallow';
import type { ChangeEventHandler } from 'react';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import useColorPicker from '@store/colorPicker';

function HexColor() {
  const { hexColor, curveStyle, updateHexColor } = useColorPicker(
    useShallow((state) => {
      const {
        hexColor: hexColorState,
        curveStyle: curveStyleState,
        updateHexColor: updateHexColorState,
      } = state;
      return {
        curveStyle: curveStyleState,
        hexColor: hexColorState,
        updateHexColor: updateHexColorState,
      };
    }),
  );

  const handleStepCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateHexColor(event.currentTarget.value);
  };

  const isPolyBezierCurve = curveStyle === 'polyBezier';

  return (
    <div className="w-20 flex flex-col">
      <Label className="py-1.5" htmlFor="step-count">
        Hex Color
      </Label>
      <Input
        id="hex-color"
        min={2}
        max={20}
        value={isPolyBezierCurve ? hexColor : '-'}
        disabled={!isPolyBezierCurve}
        onChange={handleStepCount}
      />
    </div>
  );
}

export default HexColor;
