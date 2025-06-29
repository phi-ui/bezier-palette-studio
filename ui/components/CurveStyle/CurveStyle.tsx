import Checkbox from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@components/ui/select';
import { curveStyles } from '@constants/curves';
import useColorPicker from '@store/colorPicker';
import { useShallow } from 'zustand/react/shallow';

function CurveStyle() {
  const { curveStyle, isConventional, updateCurveStyle, updateIsConventional } =
    useColorPicker(
      useShallow((state) => {
        const {
          curveStyle: curveStyleState,
          isConventional: isConventionalState,
          updateCurveStyle: updateCurveStyleState,
          updateIsConventional: updateIsConventionalState,
        } = state;
        return {
          curveStyle: curveStyleState,
          isConventional: isConventionalState,
          updateCurveStyle: updateCurveStyleState,
          updateIsConventional: updateIsConventionalState,
        };
      }),
    );

  const handleCurveStyle = (value: keyof typeof curveStyles) => {
    updateCurveStyle(value);
    if (!curveStyles[value].enableConventional) {
      updateIsConventional(true);
    }
  };

  const toggleConventionalCurve = () => {
    updateIsConventional(!isConventional);
  };

  const curveStylesOptions = Object.values(curveStyles);

  return (
    <div className="flex justify-end gap-2 w-40">
      <SelectGroup className="w-full">
        <Label className="px-0 py-1.5 h-[1.5rem] inline-block">
          Curve Style
        </Label>
        <Select onValueChange={handleCurveStyle} value={curveStyle}>
          <SelectTrigger>
            <SelectValue placeholder="Select Curve" />
          </SelectTrigger>
          <SelectContent>
            {curveStylesOptions.map((style) => (
              <SelectItem key={style.id} value={style.id}>
                <div className="flex gap-2">
                  {style.icon}
                  {style.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 mt-2">
          <Checkbox
            id="conventional-curve"
            onClick={toggleConventionalCurve}
            checked={isConventional}
            disabled={!curveStyles[curveStyle].enableConventional}
          />
          <Label className="cursor-pointer" htmlFor="conventional-curve">
            Conventional
          </Label>
        </div>
      </SelectGroup>
    </div>
  );
}

export default CurveStyle;
