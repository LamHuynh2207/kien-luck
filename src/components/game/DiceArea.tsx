import { cn } from '@/lib/utils';
import { GamePhase } from '@/types/game';

// Import images
import bowlImg from '@/assets/bat.png';
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
  onReveal: () => void;
}

/**
 * Khu vực xúc xắc với bát che
 * - Hiển thị 3 xúc xắc trên đĩa
 * - Animation bát che/mở
 * - Hiệu ứng lắc khi đang shake
 */
export const DiceArea = ({ phase, diceResults, onReveal }: DiceAreaProps) => {
  const handleRevealClick = () => {
    if (phase === 'shaking') {
      onReveal();
    }
  };

  // Hiển thị xúc xắc kết quả
  const showResults = phase === 'result' && diceResults.length === 3;

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Container chính - căn giữa vị trí đĩa trên background */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center">
        
        {/* Dice container - layout kim tự tháp (1 trên, 2 dưới) */}
        <div className={cn(
          'absolute inset-0 flex flex-col items-center justify-center',
          'pointer-events-none z-10',
        )}>
          {showResults && (
            <div className="flex flex-col items-center gap-2">
              {/* Dice on top */}
              <div className="animate-fade-in">
                <img
                  src={DICE_IMAGES[diceResults[0] - 1]}
                  alt={`Dice ${diceResults[0]}`}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* 2 dice on bottom */}
              <div className="flex gap-4">
                <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
                  <img
                    src={DICE_IMAGES[diceResults[1] - 1]}
                    alt={`Dice ${diceResults[1]}`}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <img
                    src={DICE_IMAGES[diceResults[2] - 1]}
                    alt={`Dice ${diceResults[2]}`}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Placeholder khi chưa có kết quả */}
          {!showResults && phase !== 'shaking' && (
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="text-5xl">🎲</div>
              <div className="flex gap-4">
                <div className="text-5xl">🎲</div>
                <div className="text-5xl">🎲</div>
              </div>
            </div>
          )}
        </div>

        {/* Bowl overlay - using bat.png */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-700 ease-out',
            'flex items-center justify-center cursor-pointer z-20',
            // Hide bowl when showing results
            phase === 'result' && 'opacity-0 scale-75 pointer-events-none',
            phase === 'revealing' && 'opacity-0 scale-75 pointer-events-none',
            // Show and shake during shaking phase
            phase === 'shaking' && 'opacity-100 scale-100 animate-bowl-shake',
            // Initial position for other phases
            (phase === 'selecting' || phase === 'waiting') && 'opacity-100 scale-100',
          )}
          onClick={handleRevealClick}
        >
          <img
            src={bowlImg}
            alt="Bát"
            className={cn(
              'w-3/4 h-auto object-contain drop-shadow-2xl',
              phase === 'shaking' && 'cursor-pointer hover:brightness-110',
            )}
          />
          
          {/* Click to reveal hint */}
          {phase === 'shaking' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                'bg-background/90 text-foreground px-6 py-3 rounded-xl',
                'font-bold text-lg shadow-lg animate-pulse',
              )}>
                👆 Click để MỞ!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phase indicator - đơn giản */}
      <div className="text-center mt-2">
        {phase === 'waiting' && (
          <p className="text-foreground/80 text-lg font-semibold animate-pulse">
            Sẵn sàng chơi...
          </p>
        )}
        {phase === 'selecting' && (
          <p className="text-primary font-bold text-xl animate-pulse">
            🎯 Nhấn LẮC để bắt đầu!
          </p>
        )}
        {phase === 'shaking' && (
          <p className="text-primary font-bold text-xl animate-bounce">
            🔥 Click bát để mở!
          </p>
        )}
      </div>
    </div>
  );
};
