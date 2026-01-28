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
}

/**
 * Dice area with plate and bowl
 * - Shows plate as base
 * - Bowl covers dice, slides left when revealed
 * - 3 dice displayed in pyramid layout when revealed
 */
export const DiceArea = ({ phase, diceResults }: DiceAreaProps) => {
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
        
        {/* Dice container - centered on plate */}
        <div className="absolute inset-0 flex items-center justify-center pt-[2%]">
          <div className={cn(
            'flex flex-col items-center justify-center gap-[3%]',
            'transition-opacity duration-500',
            showResults ? 'opacity-100' : 'opacity-0',
          )}>
            {showResults && (
              <>
                {/* 1 dice on top */}
                <div className="animate-fade-in">
                  <img
                    src={DICE_IMAGES[diceResults[0] - 1]}
                    alt={`Dice ${diceResults[0]}`}
                    className="w-[4.5vw] min-w-[50px] max-w-[90px] aspect-square object-contain drop-shadow-2xl"
                  />
                </div>
                
                {/* 2 dice on bottom */}
                <div className="flex gap-[1vw]">
                  <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
                    <img
                      src={DICE_IMAGES[diceResults[1] - 1]}
                      alt={`Dice ${diceResults[1]}`}
                      className="w-[4.5vw] min-w-[50px] max-w-[90px] aspect-square object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <img
                      src={DICE_IMAGES[diceResults[2] - 1]}
                      alt={`Dice ${diceResults[2]}`}
                      className="w-[4.5vw] min-w-[50px] max-w-[90px] aspect-square object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bowl overlay - slides left when opened */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'transition-all duration-700 ease-out z-20',
            // Slide left when revealing/result
            (phase === 'result' || phase === 'revealing') && '-translate-x-[150%] opacity-0',
            // Shake animation during shaking phase
            phase === 'shaking' && 'animate-bowl-shake',
          )}
        >
          <img
            src={bowlImg}
            alt="Bát"
            className={cn(
              'w-[75%] h-auto object-contain drop-shadow-2xl',
              '-mt-[12%]',
            )}
          />
        </div>
      </div>
    </div>
  );
};
