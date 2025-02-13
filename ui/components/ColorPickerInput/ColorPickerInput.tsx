import clsx from 'clsx';
import ColorPicker from '@components/ColorPicker';
import StepCount from '@components/StepCount';
import CurveTypeSelect from '@components/CurveType';
import CurveStyle from '@components/CurveStyle';
import DarkModeToggle from '@components/DarkModeToggle';
import GenerateSwatchButton from '@components/GenerateSwatchButton';
import SwatchName from '@components/SwatchName';
import PluginInfo from '@components/PluginInfo';
import styles from './colorPickerInput.module.css';

function ColorPickerInput() {
  const swatchGeneratorClasses = clsx(
    styles.swatchGenerator,
    'rounded-lg p-4 m-4 bg-elevation0 dark:bg-elevation1',
  );
  return (
    <div className={swatchGeneratorClasses}>
      <div className="flex items-end justify-between mb-4">
        <SwatchName />
        <StepCount />
      </div>
      <ColorPicker />
      <div className="flex gap-4 mb-4 items-end">
        <CurveStyle />
        <CurveTypeSelect />
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
