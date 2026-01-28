import { cn } from '@/lib/utils';
import lacButtonImg from '@/assets/lac-button.png';

interface ShakeButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Shake button using the lac-button.png image
 * Triggers dice rolling animation
 */
export const ShakeButton = ({ onClick, disabled = false }: ShakeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative transition-all duration-300',
        'hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-xl',
        disabled && 'opacity-60 cursor-not-allowed hover:scale-100',
        !disabled && 'hover:brightness-110 hover:drop-shadow-[0_0_20px_hsl(45_100%_50%/0.5)]',
      )}
    >
      <img
        src={lacButtonImg}
        alt="LẮC"
        className="w-[12vw] min-w-[100px] max-w-[180px] h-auto object-contain drop-shadow-lg"
      />
    </button>
  );
};
