import { cn } from '@/lib/utils';
import lacButtonImg from '@/assets/lac-button.png';

interface ShakeButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

/**
 * Nút LẮC !!! với hiệu ứng press
 */
export const ShakeButton = ({ onClick, disabled, label }: ShakeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative w-full max-w-xs mx-auto block',
        'transition-all duration-200',
        'hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-4 focus:ring-primary/50',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100',
      )}
    >
      {label ? (
        // Custom button with text
        <div className={cn(
          'px-8 py-4 rounded-xl',
          'bg-primary text-primary-foreground',
          'font-bold text-xl',
          'border-4 border-secondary',
          'shadow-lg',
        )}>
          {label}
        </div>
      ) : (
        // Image button
        <img
          src={lacButtonImg}
          alt="Lắc!!!"
          className="w-full h-auto drop-shadow-lg"
        />
      )}
      
      {/* Glow effect */}
      {!disabled && (
        <div className={cn(
          'absolute inset-0 rounded-xl -z-10',
          'bg-primary/30 blur-xl',
          'animate-pulse',
        )} />
      )}
    </button>
  );
};
