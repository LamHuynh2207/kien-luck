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
  onBowlClick: () => void;
}

/**
 * Khu vực xúc xắc với dĩa và bát che
 * - Hiển thị dĩa oval
 * - Bát che trên dĩa
 * - Animation lắc bát và mở bát (trượt sang trái)
 * - Hiển thị 3 xúc xắc khi mở
 */
export const DiceArea = ({ phase, diceResults, onBowlClick }: DiceAreaProps) => {
  // Hiển thị xúc xắc kết quả
  const showResults = phase === 'result' && diceResults.length === 3;
  const isBowlVisible = phase !== 'result' && phase !== 'revealing';

  return (
    <div className="relative w-full">
      {/* Dĩa oval */}
      <div className="relative w-full aspect-[16/9]">
        <img
          src={plateImg}
          alt="Dĩa"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
        
        {/* Dice container - nằm trên dĩa */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            'flex flex-col items-center justify-center gap-2 md:gap-3',
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
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-2xl"
                  />
                </div>
                
                {/* 2 dice on bottom */}
                <div className="flex gap-4 md:gap-6 lg:gap-8">
                  <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
                    <img
                      src={DICE_IMAGES[diceResults[1] - 1]}
                      alt={`Dice ${diceResults[1]}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <img
                      src={DICE_IMAGES[diceResults[2] - 1]}
                      alt={`Dice ${diceResults[2]}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bowl overlay - trượt sang trái khi mở */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'transition-all duration-700 ease-out cursor-pointer z-20',
            // Trượt sang trái khi reveal/result
            phase === 'result' && '-translate-x-[150%] opacity-0',
            phase === 'revealing' && '-translate-x-[150%] opacity-0',
            // Lắc khi đang shaking
            phase === 'shaking' && 'animate-bowl-shake',
          )}
          onClick={onBowlClick}
        >
          <img
            src={bowlImg}
            alt="Bát"
            className={cn(
              'w-[85%] md:w-[80%] h-auto object-contain drop-shadow-2xl',
              // Offset bát lên trên một chút để che vừa dĩa
              '-mt-[15%]',
              phase === 'shaking' && 'cursor-pointer hover:brightness-110',
            )}
          />
          
          {/* Hint text khi đang lắc */}
          {phase === 'shaking' && (
            <div className="absolute inset-0 flex items-center justify-center -mt-[15%]">
              <div className={cn(
                'bg-background/90 text-foreground px-4 py-2 md:px-6 md:py-3 rounded-xl',
                'font-bold text-base md:text-lg shadow-lg animate-pulse',
              )}>
                👆 Click để MỞ!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
