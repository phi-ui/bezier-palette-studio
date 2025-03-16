import { useShallow } from 'zustand/react/shallow';
import type { ChangeEventHandler } from 'react';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import useColorPicker from '@store/colorPicker';

function StepCount() {
  const { stepCount, updateStepCount } = useColorPicker(
    useShallow((state) => {
      const {
        stepCount: stepCountState,
        updateStepCount: updateStepCountState,
      } = state;
      return {
        stepCount: stepCountState,
        updateStepCount: updateStepCountState,
      };
    }),
  );

  const handleStepCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateStepCount(+event.currentTarget.value);
  };

  return (
    <div className="w-14 flex flex-col">
      <Label className="py-1.5" htmlFor="step-count">
        Steps
      </Label>
      <Input
        id="step-count"
        type="number"
        min={3}
        max={20}
        value={stepCount}
        onChange={handleStepCount}
      />
    </div>
  );
}

export default StepCount;
