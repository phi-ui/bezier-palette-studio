import { getTokensData } from '@utils/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import Button from '@components/ui/button';
import CurlyBracketsIcon from '@components/Icons/CurlyBrackets';
import CodeBlock from '@components/CodeBlock';
import type { TokensInfoModalProps } from './type';

function TokensInfoModal({
  atLeastOneSwatchCreated,
  swatches,
  curveStyle,
  hexColor,
}: TokensInfoModalProps) {
  const swatchData = JSON.stringify(
    getTokensData(swatches, curveStyle, hexColor),
  );

  return (
    <Dialog>
      <TooltipProvider delayDuration={1}>
        <Tooltip>
          <DialogTrigger disabled={!atLeastOneSwatchCreated} asChild>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="flex gap-2"
                disabled={!atLeastOneSwatchCreated}
              >
                <CurlyBracketsIcon width={16} height={16} fill="currentColor" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>Tokens</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Tokens</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <CodeBlock code={swatchData} />
      </DialogContent>
    </Dialog>
  );
}

export default TokensInfoModal;
