import { useState, useEffect } from 'react';
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
  const [isRevealing, setIsRevealing] = useState(false);

  // Xử lý reveal animation
  useEffect(() => {
    if (phase === 'revealing') {
      setIsRevealing(true);
    } else if (phase === 'waiting' || phase === 'selecting') {
      setIsRevealing(false);
    }
  }, [phase]);

  const handleRevealClick = () => {
    if (phase === 'shaking') {
      onReveal();
    }
  };

  // Hiển thị xúc xắc kết quả
  const showResults = phase === 'result' && diceResults.length === 3;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Plate / Đĩa */}
      <div className="plate-style w-full aspect-[4/3] flex items-center justify-center relative overflow-hidden">
        {/* Dice container */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 p-8">
          {showResults ? (
            // Hiển thị 3 xúc xắc kết quả
            diceResults.map((result, index) => (
              <div
                key={index}
                className={cn(
                  'w-1/3 max-w-[120px] animate-fade-in-up',
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <img
                  src={DICE_IMAGES[result - 1]}
                  alt={`Dice ${result}`}
                  className="w-full h-auto object-contain drop-shadow-lg"
                />
              </div>
            ))
          ) : (
            // Placeholder xúc xắc
            <div className="flex gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'w-16 h-16 rounded-lg bg-muted/30',
                    'flex items-center justify-center',
                    'text-4xl',
                  )}
                >
                  🎲
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bowl overlay */}
        <div
          className={cn(
            'absolute inset-0 transition-transform duration-700 ease-out',
            'flex items-center justify-center cursor-pointer',
            // Hide bowl when showing results
            phase === 'result' && '-translate-x-[120%]',
            phase === 'revealing' && '-translate-x-[120%]',
            // Show and shake during shaking phase
            phase === 'shaking' && 'translate-x-0 animate-bowl-shake',
            // Initial position for other phases
            (phase === 'selecting' || phase === 'waiting') && 'translate-x-0',
          )}
          onClick={handleRevealClick}
        >
          <img
            src={bowlImg}
            alt="Bowl"
            className={cn(
              'w-full h-full object-contain',
              phase === 'shaking' && 'cursor-pointer hover:brightness-110',
            )}
          />
          
          {/* Click to reveal hint */}
          {phase === 'shaking' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                'bg-background/90 text-foreground px-4 py-2 rounded-lg',
                'font-bold text-lg shadow-lg animate-pulse',
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
          <p className="text-foreground/80 animate-pulse">Sẵn sàng chơi...</p>
        )}
        {phase === 'selecting' && (
          <p className="text-primary font-bold animate-pulse">🎯 Hãy chọn 1 ô KIẾN!</p>
        )}
        {phase === 'shaking' && (
          <p className="text-primary font-bold animate-bounce">🔥 Click bát để mở!</p>
        )}
        {phase === 'result' && (
          <div className="flex justify-center gap-2 mt-2">
            {diceResults.map((r, i) => (
              <span key={i} className="text-2xl font-bold text-primary">
                {r}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
