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
  const isBowlVisible = phase !== 'result' && phase !== 'revealing';
  const shouldShakeBowl = phase === 'shaking';
  const isBowlClickable = phase === 'shaking' || phase === 'waiting';

  return (
    <div className="relative w-full">
      {/* Plate base */}
      <div className="relative w-full aspect-[16/10]">
        <img
          src={plateImg}
          alt="Dĩa"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        
        {/* Dice container - centered on plate with tight pyramid layout */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative flex items-center justify-center transition-opacity duration-300 ${
            showResults ? 'opacity-100' : 'opacity-0'
          }`}>
            {showResults && (
              <div className="relative w-[26vw] min-w-[220px] max-w-[400px] h-[17vw] min-h-[140px] max-h-[260px]">
                {/* Top center dice */}
                <div className="absolute left-1/2 top-[10%] -translate-x-1/2 z-10 animate-fade-in">
                  <img
                    src={DICE_IMAGES[diceResults[0] - 1]}
                    alt={`Dice ${diceResults[0]}`}
                    className="w-[11vw] min-w-[90px] max-w-[160px] aspect-square object-contain drop-shadow-2xl"
                  />
                </div>
                {/* Bottom left dice - overlapping top */}
                <div className="absolute left-[5%] bottom-0 z-20 animate-fade-in">
                  <img
                    src={DICE_IMAGES[diceResults[1] - 1]}
                    alt={`Dice ${diceResults[1]}`}
                    className="w-[11vw] min-w-[90px] max-w-[160px] aspect-square object-contain drop-shadow-2xl"
                  />
                </div>
                {/* Bottom right dice - overlapping top */}
                <div className="absolute right-[5%] bottom-0 z-20 animate-fade-in">
                  <img
                    src={DICE_IMAGES[diceResults[2] - 1]}
                    alt={`Dice ${diceResults[2]}`}
                    className="w-[11vw] min-w-[90px] max-w-[160px] aspect-square object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bowl overlay - clickable when shaking or waiting, slides left when opened */}
        <div
          onClick={isBowlClickable ? onBowlClick : undefined}
          className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-700 ease-out ${
            isBowlVisible ? 'opacity-100 translate-x-0' : '-translate-x-[150%] opacity-0'
          } ${shouldShakeBowl ? 'animate-bowl-shake cursor-pointer' : ''} ${
            isBowlClickable && !shouldShakeBowl ? 'cursor-pointer' : ''
          }`}
        >
          <img
            src={bowlImg}
            alt="Bát"
            className="w-[70%] h-auto object-contain drop-shadow-2xl -mt-[10%]"
          />
        </div>
      </div>
    </div>
  );
};
