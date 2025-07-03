import { useShallow } from 'zustand/react/shallow';
import { getSwatchData } from '@utils/index';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import Button from '@components/ui/button';
import useColorPicker from '@store/colorPicker';
import TokensInfoModal from '@components/TokensInfoModal';
import ColorsIcon from '@components/Icons/Colors';
import ExportIcon from '@components/Icons/Export';
import VariableIcon from '@components/Icons/Variable';

function Toolbar() {
  const { swatches, curveStyle } = useColorPicker(
    useShallow((state) => {
      const { swatches: swatchesState, curveStyle: curveStyleState } = state;
      return {
        swatches: swatchesState,
        curveStyle: curveStyleState,
      };
    }),
  );

  const atLeastOneSwatchCreated = swatches.length > 0;

  const handleColorOperation = (operation: string) => {
    const swatchData = getSwatchData(swatches, curveStyle);
    parent.postMessage(
      {
        pluginMessage: {
          type: operation,
          colors: swatchData,
          colorData: swatches,
        },
      },
      '*',
    );
  };

  return (
    <div className="rounded-lg p-4 flex gap-4 justify-end bg-elevation0 dark:bg-elevation1">
      <TokensInfoModal
        atLeastOneSwatchCreated={atLeastOneSwatchCreated}
        swatches={swatches}
        curveStyle={curveStyle}
      />
      <TooltipProvider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="flex gap-2"
              variant="secondary"
              disabled={!atLeastOneSwatchCreated}
              onClick={() => handleColorOperation('create-color-variables')}
            >
              <VariableIcon width={16} height={16} fill="currentColor" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Create Color Variables</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="flex gap-2"
              variant="secondary"
              disabled={!atLeastOneSwatchCreated}
              onClick={() => handleColorOperation('export-color-palette')}
            >
              <ExportIcon width={16} height={16} stroke="currentColor" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export to Frames</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        className="flex gap-2"
        disabled={!atLeastOneSwatchCreated}
        onClick={() => handleColorOperation('create-color-styles')}
      >
        <ColorsIcon width={16} height={16} stroke="white" />
        Create Styles
      </Button>
    </div>
  );
}

export default Toolbar;
