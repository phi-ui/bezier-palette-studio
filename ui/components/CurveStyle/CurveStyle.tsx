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
  const { curveStyle, updateCurveStyle } = useColorPicker(
    useShallow((state) => {
      const {
        curveStyle: curveStyleState,
        updateCurveStyle: updateCurveStyleState,
      } = state;
      return {
        curveStyle: curveStyleState,
        updateCurveStyle: updateCurveStyleState,
      };
    }),
  );

  const handleCurveStyle = (value: keyof typeof curveStyles) => {
    updateCurveStyle(value);
  };

  const curveStylesOptions = Object.values(curveStyles);

  return (
    <div className="flex justify-end gap-2 w-40">
      <SelectGroup className='w-full'>
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
      </SelectGroup>
    </div>
  );
}

export default CurveStyle;
