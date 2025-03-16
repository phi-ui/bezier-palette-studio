import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
  SelectGroup,
} from '@components/ui/select';
import { curvesTypes, curveSubTypes } from '@constants/curves';
import useColorPicker from '@store/colorPicker';
import { getRelativePositionForHandles } from './utils';

function CurveType() {
  const {
    curveStyle,
    curveType,
    updateCurveType,
    curveSubType,
    updateCurveSubType,
    startPoint,
    endPoint,
    updateStartPointHandle,
    updateEndPointHandle,
  } = useColorPicker(
    useShallow((state) => {
      const {
        curveStyle: curveStyleState,
        curveType: curveTypeState,
        updateCurveType: updateCurveTypeState,
        curveSubType: curveSubTypeState,
        updateCurveSubType: updateCurveSubTypeState,
        startPoint: startPointState,
        endPoint: endPointState,
        updateStartPointHandle: updateStartPointHandleState,
        updateEndPointHandle: updateEndPointHandleState,
      } = state;
      return {
        curveStyle: curveStyleState,
        curveType: curveTypeState,
        updateCurveType: updateCurveTypeState,
        curveSubType: curveSubTypeState,
        updateCurveSubType: updateCurveSubTypeState,
        startPoint: startPointState,
        endPoint: endPointState,
        updateStartPointHandle: updateStartPointHandleState,
        updateEndPointHandle: updateEndPointHandleState,
      };
    }),
  );
  const curveTypeOptions = Object.values(curvesTypes);
  const subTypeOptions = Object.values(curveSubTypes);

  useEffect(() => {
    if (
      curveStyle === 'presets' &&
      curveType &&
      ((curvesTypes[curveType].subTypes && curveSubType) ||
        !curvesTypes[curveType].subTypes)
    ) {
      const { startHandleX, startHandleY, endHandleX, endHandleY } =
        getRelativePositionForHandles(
          startPoint,
          endPoint,
          curveType,
          curveSubType,
        );
      updateStartPointHandle({
        x: startHandleX,
        y: startHandleY,
      });

      updateEndPointHandle({
        x: endHandleX,
        y: endHandleY,
      });
    }
  }, [
    curveType,
    curveSubType,
    updateStartPointHandle,
    startPoint,
    endPoint,
    updateEndPointHandle,
    curveStyle,
  ]);

  useEffect(() => {
    if (curveType && !curvesTypes[curveType].subTypes) {
      updateCurveSubType('');
    }
  }, [curveType, updateCurveSubType]);

  return (
    <>
      <div className="w-40 flex flex-col gap-2">
        <SelectGroup>
          <SelectLabel className="px-0 py-1.5 h-[1.5rem] inline-block">
            Curve Type
          </SelectLabel>
          <Select
            onValueChange={updateCurveType}
            value={curveType}
            disabled={curveStyle !== 'presets'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Curve" />
            </SelectTrigger>
            <SelectContent>
              {curveTypeOptions.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SelectGroup>
      </div>
      <div className="w-54 flex flex-1 flex-col gap-2">
        <SelectGroup>
          <SelectLabel className="px-0 py-1.5 h-[1.5rem] inline-block">
            Curve Transition
          </SelectLabel>
          <Select
            onValueChange={updateCurveSubType}
            value={curveSubType}
            disabled={
              curveStyle !== 'presets' ||
              !curveType ||
              !!(curveType && !curvesTypes[curveType].subTypes)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Curve Transition" />
            </SelectTrigger>
            <SelectContent>
              {curveType &&
                curvesTypes[curveType].subTypes &&
                subTypeOptions.map((subType) => (
                  <SelectItem key={subType.id} value={subType.id}>
                    {subType.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </SelectGroup>
      </div>
    </>
  );
}

export default CurveType;
