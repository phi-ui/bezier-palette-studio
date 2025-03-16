import { useShallow } from 'zustand/react/shallow';
import { isHexValid } from '@utils/index';
import Button from '@components/ui/button';
import PaintBucketIcon from '@components/Icons/PaintBucket';
import useColorPicker from '@store/colorPicker';

function GenerateSwatchButton() {
  const {
    endPoint,
    endPointHandle,
    hue,
    hexColor,
    startPoint,
    startPointHandle,
    stepCount,
    swatchEditingId,
    swatchName,
    midPoint,
    curveStyle,
    curveType,
    curveSubType,
    autoGenerateSwatchName,
    isConventional,
    createSwatch,
    updateSwatch,
    unloadSwatch,
  } = useColorPicker(
    useShallow((state) => {
      const {
        endPoint: endPointState,
        endPointHandle: endPointHandleState,
        hue: hueState,
        hexColor: hexColorState,
        startPoint: startPointState,
        midPoint: midPointState,
        startPointHandle: startPointHandleState,
        stepCount: stepCountState,
        swatchEditingId: swatchEditingIdState,
        swatchName: swatchNameState,
        curveStyle: curveStyleState,
        curveType: curveTypeState,
        curveSubType: curveSubTypeState,
        autoGenerateSwatchName: autoGenerateSwatchNameState,
        isConventional: isConventionalState,
        createSwatch: createSwatchState,
        updateSwatch: updateSwatchState,
        unloadSwatch: unloadSwatchState,
      } = state;

      return {
        endPoint: endPointState,
        endPointHandle: endPointHandleState,
        hue: hueState,
        hexColor: hexColorState,
        midPoint: midPointState,
        startPoint: startPointState,
        startPointHandle: startPointHandleState,
        stepCount: stepCountState,
        swatchEditingId: swatchEditingIdState,
        swatchName: swatchNameState,
        curveStyle: curveStyleState,
        curveType: curveTypeState,
        curveSubType: curveSubTypeState,
        autoGenerateSwatchName: autoGenerateSwatchNameState,
        isConventional: isConventionalState,
        createSwatch: createSwatchState,
        updateSwatch: updateSwatchState,
        unloadSwatch: unloadSwatchState,
      };
    }),
  );

  const areInputsValid = () => {
    if (curveStyle === 'polyBezier') return isHexValid(hexColor);

    return true;
  };

  const handleOnGenerateClick = () => {
    if (swatchEditingId) {
      updateSwatch({
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        name: swatchName,
        id: swatchEditingId,
        midPoint,
        hexColor,
        curveStyle,
        curveType,
        autoGenerateSwatchName,
        swatchName,
        curveSubType,
        isConventional,
      });
    } else {
      createSwatch({
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        name: swatchName,
        midPoint,
        hexColor,
        curveStyle,
        curveType,
        autoGenerateSwatchName,
        swatchName,
        curveSubType,
        isConventional,
      });
    }
  };

  const buttonText = swatchEditingId ? 'Update Swatch' : 'Generate Swatch';

  return (
    <div className="flex justify-end gap-4">
      {swatchEditingId ? (
        <Button variant="ghost" onClick={unloadSwatch}>
          Unload Swatch
        </Button>
      ) : null}
      <Button
        className="flex gap-2"
        onClick={handleOnGenerateClick}
        disabled={!areInputsValid()}
      >
        <PaintBucketIcon width={20} height={20} fill="white" />
        {buttonText}
      </Button>
    </div>
  );
}

export default GenerateSwatchButton;
