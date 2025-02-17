import { useShallow } from 'zustand/react/shallow';
import Button from '@components/ui/button';
import PaintBucketIcon from '@components/Icons/PaintBucket';
import useColorPicker from '@store/colorPicker';

function GenerateSwatchButtons() {
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
        createSwatch: createSwatchState,
        updateSwatch: updateSwatchState,
        unloadSwatch: unloadSwatchState,
      };
    }),
  );

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
      <Button className="flex gap-2" onClick={handleOnGenerateClick}>
        <PaintBucketIcon width={20} height={20} fill="white" />
        {buttonText}
      </Button>
    </div>
  );
}

export default GenerateSwatchButtons;
