import { memo } from 'react';
import lacButtonImg from '@/assets/lac-button.png';

interface ShakeButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Shake button using the lac-button.png image
 * Triggers dice rolling animation
 */
export const ShakeButton = memo(({ onClick, disabled = false }: ShakeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
        disabled ? 'opacity-60 cursor-not-allowed hover:scale-100' : 'hover:brightness-110 hover:drop-shadow-[0_0_20px_hsl(45_100%_50%/0.5)]'
      }`}
    >
      <img
        src={lacButtonImg}
        alt="LẮC"
        className="w-[16vw] min-w-[130px] max-w-[240px] h-auto object-contain drop-shadow-lg"
        loading="eager"
      />
    </button>
  );
});
