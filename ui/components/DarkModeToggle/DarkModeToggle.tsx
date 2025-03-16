import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import DarkMode from '@components/Icons/DarkMode';

function DarkModeToggle() {
  const handleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <TooltipProvider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroup
              type="single"
              variant="outline"
              defaultValue="darkMode"
              onClick={handleTheme}
            >
              <ToggleGroupItem
                className="toggle-group-item"
                value="darkMode"
                aria-label="Dark Mode"
              >
                <DarkMode fill="currentColor" />
              </ToggleGroupItem>
            </ToggleGroup>
          </TooltipTrigger>
          <TooltipContent>Toggle Dark Mode</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default DarkModeToggle;
