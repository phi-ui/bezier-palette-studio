import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import ColorPicker from '@components/ColorPicker';
import StepCount from '@components/StepCount';
import CurveTypeSelect from '@components/CurveType';
import CurveStyle from '@components/CurveStyle';
import DarkModeToggle from '@components/DarkModeToggle';
import GenerateSwatchButton from '@components/GenerateSwatchButton';
import SwatchName from '@components/SwatchName';
import PluginInfo from '@components/PluginInfo';
import HexColor from '@components/HexColor';
import useColorPicker from '@store/colorPicker';
import styles from './colorPickerInput.module.css';

function ColorPickerInput() {
  const swatchGeneratorClasses = clsx(
    styles.swatchGenerator,
    'rounded-lg p-4 m-4 bg-elevation0 dark:bg-elevation1',
  );

  const { curveStyle } = useColorPicker(
    useShallow((state) => {
      const { curveStyle: curveStyleState } = state;
      return {
        curveStyle: curveStyleState,
      };
    }),
  );

  return (
    <div className={swatchGeneratorClasses}>
      <div className="flex justify-between mb-4">
        <SwatchName />
        <CurveStyle />
      </div>
      <ColorPicker />
      <div className="flex gap-4 mb-4 items-end">
        <StepCount />
        {curveStyle === 'presets' ? <CurveTypeSelect /> : null}
        {curveStyle === 'polyBezier' ? <HexColor /> : null}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <DarkModeToggle />
          <PluginInfo />
        </div>
        <GenerateSwatchButton />
      </div>
    </div>
  );
}

export default ColorPickerInput;
