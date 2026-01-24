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

  // Button label dựa vào phase
  const getButtonLabel = () => {
    switch (phase) {
      case 'waiting':
        return undefined; // Dùng hình
      case 'selecting':
        return 'BẮT ĐẦU LẮC!';
      case 'shaking':
        return 'ĐANG LẮC...';
      case 'result':
        return '🔄 LẮC LẠI';
      default:
        return undefined;
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 lg:p-8">
        {/* Dice area - centered */}
        <div className="w-full max-w-lg">
          <DiceArea
            phase={phase}
            diceResults={diceResults}
            onReveal={handleReveal}
          />
        </div>

        {/* Bottom: Shake button */}
        <div className="mt-8">
          <ShakeButton
            onClick={handleShakeClick}
            disabled={phase === 'shaking' || phase === 'revealing'}
            label={getButtonLabel()}
          />
        </div>
      </div>
    </div>
  );
};
