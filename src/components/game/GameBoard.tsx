import { useEffect, useRef } from 'react';
import { DiceArea } from './DiceArea';
import { ShakeButton } from './ShakeButton';
import { AntBoard } from './AntBoard';
import { useGameLogic } from '@/hooks/useGameLogic';

// Import background
import backgroundImg from '@/assets/background.png';

/**
 * Main game board component
 * Layout theo design:
 * - Left: Dĩa + Bát + Nút LẮC
 * - Right: Bảng 6 chú kiến
 */
export const GameBoard = () => {
  const {
    gameState,
    startShaking,
    revealResult,
    resetGame,
  } = useGameLogic();

  const { phase, diceResults } = gameState;
  const shakeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Xử lý click nút LẮC
  const handleShakeClick = () => {
    if (phase === 'waiting' || phase === 'result' || phase === 'selecting') {
      startShaking();
    }
  };

  // Tự động dừng lắc sau 5 giây
  useEffect(() => {
    if (phase === 'shaking') {
      // Clear timer cũ nếu có
      if (shakeTimerRef.current) {
        clearTimeout(shakeTimerRef.current);
      }
    }
    
    return () => {
      if (shakeTimerRef.current) {
        clearTimeout(shakeTimerRef.current);
      }
    };
  }, [phase]);

  // Xử lý click vào bát để mở
  const handleBowlClick = () => {
    if (phase === 'shaking') {
      revealResult();
    }
  };

  // Lấy danh sách kiến được highlight từ kết quả xúc xắc
  const highlightedAnts = phase === 'result' ? diceResults : [];

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Main content - 2 columns layout */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          
          {/* Left side: Dĩa + Bát + Nút LẮC */}
          <div className="flex flex-col items-center gap-4 md:gap-6">
            {/* Dice area với dĩa và bát */}
            <div className="w-[80vw] max-w-[450px] lg:w-[35vw] lg:max-w-[500px]">
              <DiceArea
                phase={phase}
                diceResults={diceResults}
                onBowlClick={handleBowlClick}
              />
            </div>

            {/* Shake button - ngay dưới dĩa */}
            <ShakeButton
              onClick={handleShakeClick}
              disabled={phase === 'shaking' || phase === 'revealing'}
            />

            {/* Hint text */}
            <div className="text-center">
              {phase === 'waiting' && (
                <p className="text-foreground/90 text-lg md:text-xl font-bold animate-pulse">
                  🎯 Nhấn LẮC để bắt đầu!
                </p>
              )}
              {phase === 'shaking' && (
                <p className="text-primary font-bold text-lg md:text-xl animate-bounce">
                  🔥 Click vào bát để mở!
                </p>
              )}
              {phase === 'result' && (
                <p className="text-primary font-bold text-lg md:text-xl">
                  ✨ Nhấn LẮC để chơi lại!
                </p>
              )}
            </div>
          </div>

          {/* Right side: Bảng 6 chú kiến */}
          <div className="w-[85vw] max-w-[500px] lg:w-[40vw] lg:max-w-[550px]">
            <AntBoard highlightedAnts={highlightedAnts} />
          </div>
        </div>
      </div>
    </div>
  );
};
