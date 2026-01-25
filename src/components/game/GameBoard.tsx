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
      <div className="relative z-10 min-h-screen flex flex-col items-center">
        
        {/* Top spacer - đẩy xuống khoảng 8% từ trên */}
        <div className="h-[8vh]" />
        
        {/* Dice area - căn với vị trí đĩa trên background */}
        <div className="w-full flex-1 flex items-start justify-center">
          <div className="w-[85vw] max-w-[600px] md:w-[70vw] lg:w-[55vw]">
            <DiceArea
              phase={phase}
              diceResults={diceResults}
              onReveal={handleReveal}
            />
          </div>
        </div>

        {/* Bottom: Shake button - đặt ngay dưới đĩa */}
        <div className="pb-[12vh] md:pb-[15vh]">
          <ShakeButton
            onClick={handleShakeClick}
            disabled={phase === 'shaking' || phase === 'revealing'}
          />
        </div>
      </div>
    </div>
  );
};
