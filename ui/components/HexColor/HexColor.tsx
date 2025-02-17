import type { ChangeEventHandler } from 'react';
import clsx from 'clsx';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { isHexValid } from '@utils/index';
import useColorPicker from '@store/colorPicker';
import InfoIcon from '@components/Icons/Info';

function HexColor() {
  const [isValid, setIsValid] = useState(true);

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

  const handleHexColor: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.currentTarget;
    const isColorValid = isHexValid(value);
    setIsValid(isColorValid);
    updateHexColor(value, isColorValid);
  };

  const isPolyBezierCurve = curveStyle === 'polyBezier';
  const inputClasses = clsx({
    'border border-destructive': !isValid,
  });

  return (
    <div className="w-32 flex flex-col">
      <Label className="py-1.5" htmlFor="hex-color">
        Hex Color
      </Label>
      <div className="flex items-center gap-2">
        <Input
          id="hex-color"
          className={inputClasses}
          maxLength={7}
          value={isPolyBezierCurve ? hexColor : '-'}
          disabled={!isPolyBezierCurve}
          onChange={handleHexColor}
        />
        {!isHexValid(hexColor) && (
          <TooltipProvider delayDuration={1}>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon stroke="hsl(var(--destructive))" />
              </TooltipTrigger>
              <TooltipContent>Invalid hex value</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}

export default HexColor;
