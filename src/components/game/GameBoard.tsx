import { useEffect, useRef } from 'react';
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
  const shakeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle shake button click
  const handleShakeClick = () => {
    if (phase === 'waiting' || phase === 'result' || phase === 'selecting') {
      startShaking();
    }
  };

  // Auto-reveal after 5 seconds of shaking
  useEffect(() => {
    if (phase === 'shaking') {
      if (shakeTimerRef.current) {
        clearTimeout(shakeTimerRef.current);
      }
      
      shakeTimerRef.current = setTimeout(() => {
        revealResult();
      }, 5000);
    }
    
    return () => {
      if (shakeTimerRef.current) {
        clearTimeout(shakeTimerRef.current);
      }
    };
  }, [phase, revealResult]);

  // Get highlighted ants from dice results
  const highlightedAnts = phase === 'result' ? diceResults : [];

  return (
    <div 
      className="w-full h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Title - top left */}
      <div className="absolute top-[3%] left-[3%] z-20">
        <img
          src={titleImg}
          alt="Kiến Luck"
          className="w-[15vw] min-w-[120px] max-w-[280px] h-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* Main content container - responsive for 16:9 and 3:1 */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-[3%] py-[2%]">
        <div className="w-full h-full max-w-[1800px] flex flex-row items-center justify-center gap-[3%]">
          
          {/* Left side: Dĩa + Bát + Nút LẮC */}
          <div className="flex flex-col items-center justify-center h-full flex-1 max-w-[45%]">
            {/* Dice area with plate and bowl */}
            <div className="w-full max-w-[500px] flex-shrink-0">
              <DiceArea
                phase={phase}
                diceResults={diceResults}
              />
            </div>

            {/* Shake button */}
            <div className="mt-[3%]">
              <ShakeButton
                onClick={handleShakeClick}
                disabled={phase === 'shaking' || phase === 'revealing'}
              />
            </div>
          </div>

          {/* Right side: Bảng 6 chú kiến */}
          <div className="flex-1 max-w-[50%] h-[70%] flex items-center justify-center">
            <div className="w-full h-full max-h-[500px]">
              <AntBoard highlightedAnts={highlightedAnts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
