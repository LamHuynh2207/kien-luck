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
    <div className="relative w-full max-w-md mx-auto">
      {/* Plate / Đĩa - transparent to show background */}
      <div className="w-full aspect-square flex items-center justify-center relative">
        {/* Dice container */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 p-8">
          {showResults ? (
            // Hiển thị 3 xúc xắc kết quả
            diceResults.map((result, index) => (
              <div
                key={index}
                className={cn(
                  'w-1/3 max-w-[100px] animate-fade-in',
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <img
                  src={DICE_IMAGES[result - 1]}
                  alt={`Dice ${result}`}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            ))
          ) : (
            // Placeholder xúc xắc khi chưa có kết quả
            <div className="flex gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'w-16 h-16 rounded-lg',
                    'flex items-center justify-center',
                    'text-4xl opacity-50',
                  )}
                >
                  🎲
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bowl overlay - using bat.png */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-700 ease-out',
            'flex items-center justify-center cursor-pointer',
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
              'w-4/5 h-4/5 object-contain drop-shadow-2xl',
              phase === 'shaking' && 'cursor-pointer hover:brightness-110',
            )}
          />
          
          {/* Click to reveal hint */}
          {phase === 'shaking' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                'bg-background/90 text-foreground px-6 py-3 rounded-xl',
                'font-bold text-xl shadow-lg animate-pulse',
              )}>
                👆 Click để MỞ!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phase indicator */}
      <div className="text-center mt-4">
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
            🔥 Click bát để mở kết quả!
          </p>
        )}
        {phase === 'result' && (
          <div className="flex justify-center gap-4 mt-2">
            {diceResults.map((r, i) => (
              <span key={i} className="text-3xl font-bold text-primary drop-shadow-lg">
                {r}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
