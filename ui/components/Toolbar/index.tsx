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

function Toolbar() {
  const { swatches } = useColorPicker(
    useShallow((state) => {
      const { swatches: swatchesState } = state;
      return { swatches: swatchesState };
    }),
  );

  const atLeastOneSwatchCreated = swatches.length > 0;

  const handleColorOperation = (operation: string) => {
    const swatchData = getSwatchData(swatches);
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
    <div className="border border-solid border-zinc-200 rounded-lg p-4 flex gap-4 justify-end">
      <TokensInfoModal
        atLeastOneSwatchCreated={atLeastOneSwatchCreated}
        swatches={swatches}
      />
      <TooltipProvider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="icon"
              className="flex gap-2"
              variant="secondary"
              disabled={!atLeastOneSwatchCreated}
              onClick={() => handleColorOperation('export-color-palette')}
            >
              <ExportIcon width={16} height={16} />
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
