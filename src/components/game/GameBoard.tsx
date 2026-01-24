import { DiceArea } from './DiceArea';
import { ShakeButton } from './ShakeButton';
import { useGameLogic } from '@/hooks/useGameLogic';

// Import background
import backgroundImg from '@/assets/back.png';

/**
 * Main game board component - Simplified version
 * Layout: 
 * - Center: Dice area với bát che
 * - Bottom: Nút LẮC
 */
export const GameBoard = () => {
  const {
    gameState,
    startShaking,
    shakeStart,
    revealResult,
    resetGame,
  } = useGameLogic();

  const { phase, diceResults } = gameState;

  // Xử lý click nút LẮC
  const handleShakeClick = () => {
    if (phase === 'waiting' || phase === 'result') {
      startShaking();
    } else if (phase === 'selecting') {
      shakeStart();
    }
  };

  // Xử lý reveal kết quả
  const handleReveal = () => {
    if (phase === 'shaking') {
      revealResult();
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Content container - căn chỉnh theo vị trí đĩa trên background */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
        {/* Spacer để đẩy DiceArea xuống đúng vị trí đĩa trên background */}
        <div className="flex-1" />
        
        {/* Dice area - căn giữa */}
        <div className="w-full max-w-md">
          <DiceArea
            phase={phase}
            diceResults={diceResults}
            onReveal={handleReveal}
          />
        </div>

        {/* Bottom: Shake button - luôn dùng hình ảnh */}
        <div className="mt-4 mb-8">
          <ShakeButton
            onClick={handleShakeClick}
            disabled={phase === 'shaking' || phase === 'revealing'}
          />
        </div>
        
        <div className="flex-1" />
      </div>
    </div>
  );
};
