import clsx from 'clsx';
import camelCase from 'camelcase';
import type { MouseEventHandler } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { getColorsFromCoordinates } from '@utils';
import Button from '@components/ui/button';
import CopyIcon from '@components/Icons/Copy';
import Color from '@components/Color';
import EditIcon from '@components/Icons/Edit';
import DeleteIcon from '@components/Icons/Delete';
import type { SwatchProps } from './types';

function Swatch({
  deleteSwatch,
  loadSwatch,
  duplicateSwatch,
  swatch,
  isEditing,
  curveStyle,
}: SwatchProps) {
  const { id } = swatch;

  const swatchAccordionClasses = clsx(
    'border border-border border-solid mb-4 rounded-lg overflow-hidden bg-elevation0 dark:bg-elevation2',
    isEditing ? 'border-primary-border' : '',
  );

  const colors = getColorsFromCoordinates(swatch, curveStyle);

  const editColorSwatch: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    loadSwatch(id);
  };

  const deleteColorSwatch: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    deleteSwatch(id);
  };

  const duplicateColorSwatch: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.stopPropagation();
    duplicateSwatch(id);
  };

  return (
    <AccordionItem value={swatch.id} className={swatchAccordionClasses}>
      <AccordionTrigger className="p-4" asChild={false}>
        <div className="flex-1">{swatch.name}</div>
        <div className="mr-3 flex gap-2">
          <TooltipProvider delayDuration={1}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={duplicateColorSwatch}
                >
                  <CopyIcon width={18} height={18} stroke="currentColor" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Duplicate Swatch</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={1}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={editColorSwatch}
                  disabled={isEditing}
                >
                  <EditIcon width={18} height={18} stroke="currentColor" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Swatch</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={1}>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon" onClick={deleteColorSwatch}>
                  <DeleteIcon
                    width={18}
                    height={18}
                    stroke="hsl(var(--destructive))"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Swatch</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <div className="w-full overflow-y-auto rounded-xl">
          {colors.map((color, index) => {
            const number = (index + 1) * 100;
            return (
              <Color
                key={`${swatch.id}_${color}`}
                color={color}
                token={`${camelCase(swatch.name)}.${number}`}
                number={number}
              />
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default Swatch;
