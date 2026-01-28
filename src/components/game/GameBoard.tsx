import { DiceArea } from './DiceArea';
import { ShakeButton } from './ShakeButton';
import { AntBoard } from './AntBoard';
import { useGameLogic } from '@/hooks/useGameLogic';

// Import assets
import backgroundImg from '@/assets/background.png';
import titleImg from '@/assets/title.png';

/**
 * Main game board component
 * Layout: 16:9 base with 3:1 LED screen support
 * 
 * Structure:
 * - Title (top-left)
 * - Left: Dĩa + Bát + Nút LẮC
 * - Right: Bảng 6 chú kiến
 */
export const GameBoard = () => {
  const {
    gameState,
    startShaking,
    revealResult,
  } = useGameLogic();

  const { phase, diceResults } = gameState;

  // Handle shake button click
  const handleShakeClick = () => {
    if (phase === 'waiting' || phase === 'result' || phase === 'selecting') {
      startShaking();
    }
  };

  // Handle bowl click to reveal results
  const handleBowlClick = () => {
    if (phase === 'shaking') {
      revealResult();
    }
  };

  // Get highlighted ants from dice results
  const highlightedAnts = phase === 'result' ? diceResults : [];

  return (
    <div 
      className="w-full h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Main content container - responsive for 16:9 and 3:1 */}
      <div className="relative z-10 w-full h-full flex flex-row items-center justify-center px-[4%] py-[2%]">
        
        {/* Left side: Title + Dĩa + Bát + Nút LẮC - aligned vertically */}
        <div className="flex flex-col items-center justify-center h-full flex-1 max-w-[45%] gap-[2vh]">
          {/* Title - Kiến Luck */}
          <div className="flex-shrink-0">
            <img
              src={titleImg}
              alt="Kiến Luck"
              className="w-[22vw] min-w-[180px] max-w-[400px] h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Dice area with plate and bowl */}
          <div className="w-full max-w-[450px] flex-shrink-0">
            <DiceArea
              phase={phase}
              diceResults={diceResults}
              onBowlClick={handleBowlClick}
            />
          </div>

          {/* Shake button */}
          <div className="flex-shrink-0">
            <ShakeButton
              onClick={handleShakeClick}
              disabled={phase === 'shaking' || phase === 'revealing'}
            />
          </div>
        </div>

        {/* Right side: Bảng 6 chú kiến */}
        <div className="flex-1 max-w-[50%] h-[85%] flex items-start justify-center pt-[2%]">
          <div className="w-full h-full max-h-[550px]">
            <AntBoard highlightedAnts={highlightedAnts} />
          </div>
        </div>
      </div>
    </div>
  );
};
