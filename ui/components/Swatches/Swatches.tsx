import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { Swatches as SwatchesType } from '@store/types';
import { Accordion } from '@components/ui/accordion';
import BlankPalette from '@components/Icons/BlankPalette';
import useColorPicker from '@store/colorPicker';
import Load from '@components/Icons/Load';
import Button from '@components/ui/button';
import Swatch from './components/Swatch';

function Swatches() {
  const [swatchData, setSwatchData] = useState<SwatchesType>([]);
  const [stylesLastSaveDataTime, setStylesLastSaveDataTime] =
    useState<string>('');

  const {
    swatches,
    swatchEditingId,
    curveStyle,
    deleteSwatch,
    loadSwatch,
    duplicateSwatch,
    importSwatches,
  } = useColorPicker(
    useShallow((state) => {
      const {
        swatches: swatchesState,
        swatchEditingId: swatchEditingIdState,
        curveStyle: curveStyleState,
        deleteSwatch: deleteSwatchState,
        duplicateSwatch: duplicateSwatchState,
        loadSwatch: loadSwatchState,
        importSwatches: importSwatchesState,
      } = state;
      return {
        swatches: swatchesState,
        swatchEditingId: swatchEditingIdState,
        curveStyle: curveStyleState,
        deleteSwatch: deleteSwatchState,
        duplicateSwatch: duplicateSwatchState,
        loadSwatch: loadSwatchState,
        importSwatches: importSwatchesState,
      };
    }),
  );

  useEffect(() => {
    window.onmessage = (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const pluginMessage = event.data.pluginMessage as {
        type: string;
        payload: {
          paletteData: SwatchesType;
          timestamp: number;
        };
      };
      if (pluginMessage?.type === 'send-palette-data') {
        const { timestamp, paletteData } = pluginMessage.payload;
        setSwatchData(paletteData);
        const date = new Date(timestamp);
        const time = date.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
        setStylesLastSaveDataTime(time);
      }
    };
    parent.postMessage(
      {
        pluginMessage: {
          type: 'import-color-palette',
        },
      },
      '*',
    );
  }, [swatches]);

  const loadStyles = () => {
    if (swatchData) {
      importSwatches(swatchData);
    }
  };

  const getSwatches = () => {
    if (swatches?.length) {
      return (
        <Accordion type="single" collapsible className="w-full">
          {swatches.map((swatch) => (
            <Swatch
              key={swatch.id}
              swatch={swatch}
              isEditing={swatchEditingId === swatch.id}
              curveStyle={curveStyle}
              duplicateSwatch={duplicateSwatch}
              deleteSwatch={deleteSwatch}
              loadSwatch={loadSwatch}
            />
          ))}
        </Accordion>
      );
    }

    return (
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        <div>
          <BlankPalette width={128} height={128} fill="currentColor" />
        </div>
        <p>Your palette seems blank. Let&apos;s fill in some color in it.</p>
        {swatchData?.length ? (
          <>
            <p className="text-center">Or,</p>
            <p className="text-center">
              You already have previously created styles on <br />
              <strong>{stylesLastSaveDataTime}</strong>,<br />
              do you want to import these styles?
            </p>
            <Button
              variant="outline"
              className="flex gap-2"
              onClick={loadStyles}
            >
              <Load fill="currentColor" /> Import Styles
            </Button>
          </>
        ) : null}
      </div>
    );
  };

  return (
    <div className="flex-1 p-4 overflow-auto rounded-lg bg-elevation0 dark:bg-elevation1">
      {getSwatches()}
    </div>
  );
}

export default Swatches;
