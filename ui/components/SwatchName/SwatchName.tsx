import { useCallback, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { doesNameExistInArray, getNameFromHue } from '@utils/index';
import useColorPicker from '@store/colorPicker';
import Checkbox from '@components/ui/checkbox';

function SwatchName() {
  const {
    hue,
    startPoint,
    endPoint,
    startPointHandle,
    endPointHandle,
    swatchName,
    swatches,
    updateSwatchName,
    autoGenerateSwatchName,
    updateAutoGenerateSwatchName,
    swatchEditingId,
  } = useColorPicker(
    useShallow((state) => {
      const {
        hue: hueState,
        startPoint: startPointState,
        endPoint: endPointState,
        startPointHandle: startPointHandleState,
        endPointHandle: endPointHandleState,
        swatchName: swatchNameState,
        swatches: swatchesState,
        updateSwatchName: updateSwatchNameState,
        autoGenerateSwatchName: autoGenerateSwatchNameState,
        updateAutoGenerateSwatchName: updateAutoGenerateSwatchNameState,
        swatchEditingId: swatchEditingIdState,
      } = state;
      return {
        hue: hueState,
        startPoint: startPointState,
        endPoint: endPointState,
        startPointHandle: startPointHandleState,
        endPointHandle: endPointHandleState,
        swatchName: swatchNameState,
        swatches: swatchesState,
        updateSwatchName: updateSwatchNameState,
        autoGenerateSwatchName: autoGenerateSwatchNameState,
        updateAutoGenerateSwatchName: updateAutoGenerateSwatchNameState,
        swatchEditingId: swatchEditingIdState,
      };
    }),
  );

  const handleSwatchName: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateSwatchName(event.currentTarget.value);
  };

  const handleAutoGenerateSwatchName = () => {
    updateAutoGenerateSwatchName(!autoGenerateSwatchName);
  };

  const generateSwatchName = useCallback(() => {
    const name = getNameFromHue(
      hue,
      startPoint,
      endPoint,
      startPointHandle,
      endPointHandle,
    );
    const swatchNames = swatches
      .map((swatch) => {
        if (swatchEditingId !== swatch.id) {
          return swatch.name;
        }
        return '';
      })
      .filter(Boolean);
    const newName = doesNameExistInArray(swatchNames, name);
    return newName;
  }, [
    endPoint,
    endPointHandle,
    hue,
    startPoint,
    startPointHandle,
    swatchEditingId,
    swatches,
  ]);

  useEffect(() => {
    if (swatchEditingId) {
      const editingSwatch = swatches.find(
        (swatch) => swatch.id === swatchEditingId,
      );
      if (editingSwatch) {
        if (autoGenerateSwatchName) {
          const newName = generateSwatchName();
          updateSwatchName(newName);
        } else {
          updateSwatchName(editingSwatch.name);
        }
      }
    }
    if (autoGenerateSwatchName) {
      const newName = generateSwatchName();
      updateSwatchName(newName);
    }
  }, [
    autoGenerateSwatchName,
    generateSwatchName,
    hue,
    startPoint,
    startPointHandle,
    swatchEditingId,
    swatches,
    updateSwatchName,
  ]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <Label className="py-1.5" htmlFor="swatch-name">
          Name
        </Label>
        <Input
          id="swatch-name"
          type="text"
          className="w-32"
          value={swatchName}
          onChange={handleSwatchName}
          disabled={autoGenerateSwatchName}
        />
      </div>
      <div className="flex items-center gap-2 mt-2 -ml-4">
        <Checkbox
          id="auto-generate-checkbox"
          onClick={handleAutoGenerateSwatchName}
          checked={autoGenerateSwatchName}
        />
        <Label className="cursor-pointer" htmlFor="auto-generate-checkbox">
          Auto Generate
        </Label>
      </div>
    </div>
  );
}

export default SwatchName;
