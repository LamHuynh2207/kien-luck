import { AntCard as AntCardType, AntType } from '@/types/game';
import { cn } from '@/lib/utils';

// Import ant images
import antStudent from '@/assets/ant-student.png';
import antWarrior from '@/assets/ant-warrior.png';
import antTech from '@/assets/ant-tech.png';
import antGraduate from '@/assets/ant-graduate.png';
import antExplorer from '@/assets/ant-explorer.png';
import antSports from '@/assets/ant-sports.png';

const ANT_IMAGES: Record<AntType, string> = {
  student: antStudent,
  warrior: antWarrior,
  tech: antTech,
  graduate: antGraduate,
  explorer: antExplorer,
  sports: antSports,
};

interface AntCardProps {
  card: AntCardType;
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Component hiển thị 1 ô KIẾN
 * Có 4 trạng thái: normal, selected, win, lose
 */
export const AntCardComponent = ({ card, onClick, disabled }: AntCardProps) => {
  const { type, name, state } = card;

  return (
    <button
      onClick={onClick}
      disabled={disabled || state === 'lose'}
      className={cn(
        // Base styles
        'relative w-full aspect-square rounded-xl overflow-hidden',
        'transition-all duration-300 cursor-pointer',
        'bg-card border-2 border-border',
        'hover:scale-105 hover:shadow-lg active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        
        // State styles
        state === 'normal' && 'card-normal hover:border-primary',
        state === 'selected' && 'card-selected border-primary',
        state === 'win' && 'card-win border-[hsl(var(--success))]',
        state === 'lose' && 'card-lose',
        
        // Disabled
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
      )}
    >
      {/* Ant image */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <img
          src={ANT_IMAGES[type]}
          alt={name}
          className={cn(
            'w-full h-full object-contain',
            'transition-transform duration-300',
            state === 'selected' && 'animate-float',
          )}
        />
      </div>

      {/* Card number badge */}
      <div className={cn(
        'absolute top-2 left-2 w-8 h-8 rounded-full',
        'flex items-center justify-center',
        'bg-primary text-primary-foreground font-bold text-lg',
        'shadow-md',
        state === 'win' && 'bg-[hsl(var(--success))]',
      )}>
        {card.id}
      </div>

      {/* Name label */}
      <div className={cn(
        'absolute bottom-0 inset-x-0 py-2 px-3',
        'bg-gradient-to-t from-background/90 to-transparent',
        'text-center',
      )}>
        <span className={cn(
          'text-sm font-bold text-foreground',
          state === 'win' && 'text-[hsl(var(--success))]',
        )}>
          {name}
        </span>
      </div>

      {/* Win effect overlay */}
      {state === 'win' && (
        <div className="absolute inset-0 bg-[hsl(var(--success)/0.1)] pointer-events-none" />
      )}

      {/* Selected checkmark */}
      {state === 'selected' && (
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};
