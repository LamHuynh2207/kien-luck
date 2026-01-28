import { cn } from '@/lib/utils';
import { GamePhase } from '@/types/game';

// Import images
import bowlImg from '@/assets/bat.png';
import plateImg from '@/assets/plate.png';
import dice1 from '@/assets/dice-1.png';
import dice2 from '@/assets/dice-2.png';
import dice3 from '@/assets/dice-3.png';
import dice4 from '@/assets/dice-4.png';
import dice5 from '@/assets/dice-5.png';
import dice6 from '@/assets/dice-6.png';

const DICE_IMAGES = [dice1, dice2, dice3, dice4, dice5, dice6];

interface DiceAreaProps {
  phase: GamePhase;
  diceResults: number[];
  onBowlClick?: () => void;
}

/**
 * Dice area with plate and bowl
 * - Shows plate as base
 * - Bowl covers dice, slides left when revealed
 * - 3 dice displayed in overlapping layout when revealed
 */
export const DiceArea = ({ phase, diceResults, onBowlClick }: DiceAreaProps) => {
  const showResults = phase === 'result' && diceResults.length === 3;

  return (
    <div className="relative w-full">
      {/* Plate base */}
      <div className="relative w-full aspect-[16/10]">
        <img
          src={plateImg}
          alt="Dĩa"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        
        {/* Dice container - centered on plate with overlapping layout */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            'relative flex items-center justify-center',
            'transition-opacity duration-500',
            showResults ? 'opacity-100' : 'opacity-0',
          )}>
            {showResults && (
              <div className="relative w-[18vw] min-w-[140px] max-w-[280px] h-[10vw] min-h-[80px] max-h-[160px]">
                {/* Middle dice - behind */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-fade-in">
                  <img
                    src={DICE_IMAGES[diceResults[0] - 1]}
                    alt={`Dice ${diceResults[0]}`}
                    className="w-[6vw] min-w-[55px] max-w-[100px] aspect-square object-contain drop-shadow-2xl"
                  />
                </div>
                
                {/* Left dice - overlapping middle */}
                <div 
                  className="absolute left-[10%] top-1/2 -translate-y-1/2 z-20 animate-fade-in" 
                  style={{ animationDelay: '0.1s' }}
                >
                  <img
                    src={DICE_IMAGES[diceResults[1] - 1]}
                    alt={`Dice ${diceResults[1]}`}
                    className="w-[6vw] min-w-[55px] max-w-[100px] aspect-square object-contain drop-shadow-2xl"
                  />
                </div>
                
                {/* Right dice - overlapping middle */}
                <div 
                  className="absolute right-[10%] top-1/2 -translate-y-1/2 z-20 animate-fade-in" 
                  style={{ animationDelay: '0.2s' }}
                >
                  <img
                    src={DICE_IMAGES[diceResults[2] - 1]}
                    alt={`Dice ${diceResults[2]}`}
                    className="w-[6vw] min-w-[55px] max-w-[100px] aspect-square object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bowl overlay - clickable when shaking, slides left when opened */}
        <div
          onClick={phase === 'shaking' ? onBowlClick : undefined}
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'transition-all duration-700 ease-out z-20',
            // Slide left when revealing/result
            (phase === 'result' || phase === 'revealing') && '-translate-x-[150%] opacity-0',
            // Shake animation during shaking phase
            phase === 'shaking' && 'animate-bowl-shake cursor-pointer',
          )}
        >
          <img
            src={bowlImg}
            alt="Bát"
            className={cn(
              'w-[70%] h-auto object-contain drop-shadow-2xl',
              '-mt-[10%]',
            )}
          />
        </div>
      </div>
    </div>
  );
};
