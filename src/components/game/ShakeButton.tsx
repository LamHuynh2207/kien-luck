import { cn } from '@/lib/utils';
import lacButtonImg from '@/assets/lac-button.png';

interface ShakeButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Nút LẮC !!! - luôn dùng hình ảnh lac-button.png
 */
export const ShakeButton = ({ onClick, disabled }: ShakeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative w-48 md:w-56 mx-auto block',
        'transition-all duration-200',
        'hover:scale-105 active:scale-95',
        'focus:outline-none',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100',
      )}
    >
      <img
        src={lacButtonImg}
        alt="Lắc!!!"
        className="w-full h-auto drop-shadow-lg"
      />
      
      {/* Glow effect */}
      {!disabled && (
        <div className={cn(
          'absolute inset-0 -z-10',
          'bg-primary/30 blur-xl',
          'animate-pulse',
        )} />
      )}
    </button>
  );
};
