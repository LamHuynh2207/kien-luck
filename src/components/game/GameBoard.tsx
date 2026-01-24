import { AntCardComponent } from './AntCard';
import { DiceArea } from './DiceArea';
import { ShakeButton } from './ShakeButton';
import { ResultModal } from './ResultModal';
import { useGameLogic } from '@/hooks/useGameLogic';
import { cn } from '@/lib/utils';

// Import background
import backgroundImg from '@/assets/back.png';

/**
 * Main game board component
 * Layout: 
 * - Left: Dice area với bát che
 * - Right: 6 ô KIẾN (grid 3x2)
 * - Bottom: Nút LẮC
 */
export const GameBoard = () => {
  const {
    gameState,
    cards,
    selectCard,
    startShaking,
    shakeStart,
    revealResult,
    nextRound,
    resetGame,
  } = useGameLogic();

  const { phase, message, round, isWinner, diceResults, selectedCard } = gameState;

  // Xử lý click nút LẮC
  const handleShakeClick = () => {
    if (phase === 'waiting') {
      startShaking();
    } else if (phase === 'selecting') {
      if (shakeStart()) {
        // Đợi 1 chút rồi cho phép reveal
      }
    }
  };

  // Xử lý reveal kết quả
  const handleReveal = () => {
    if (phase === 'shaking') {
      revealResult();
    }
  };

  // Disable chọn card khi không ở phase selecting hoặc đã chọn rồi
  const canSelectCard = phase === 'selecting' && selectedCard === null;

  // Button label dựa vào phase
  const getButtonLabel = () => {
    switch (phase) {
      case 'waiting':
        return undefined; // Dùng hình
      case 'selecting':
        return selectedCard ? 'BẮT ĐẦU LẮC!' : undefined;
      case 'shaking':
        return 'ĐANG LẮC...';
      case 'result':
        return isWinner ? '🎉 TIẾP TỤC' : '🔄 CHƠI LẠI';
      default:
        return undefined;
    }
  };

  // Handle button in result phase
  const handleResultButton = () => {
    if (phase === 'result') {
      if (isWinner) {
        nextRound();
      } else {
        resetGame();
      }
    } else {
      handleShakeClick();
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/10 pointer-events-none" />
      
      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col p-4 lg:p-8">
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-gold mb-2">
            KIẾN LUCK
          </h1>
          <div className="flex items-center justify-center gap-4 text-foreground">
            <span className="bg-secondary/80 px-4 py-1 rounded-full font-bold">
              Lượt {round}
            </span>
          </div>
        </header>

        {/* Message banner */}
        <div className={cn(
          'text-center py-3 px-6 mx-auto rounded-xl mb-4',
          'bg-card/90 backdrop-blur-sm',
          'border-2 border-primary shadow-lg',
          'max-w-md',
        )}>
          <p className="text-lg font-bold text-foreground">{message}</p>
        </div>

        {/* Main game area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center">
          {/* Left: Dice area */}
          <div className="w-full lg:w-2/5 max-w-lg">
            <DiceArea
              phase={phase}
              diceResults={diceResults}
              onReveal={handleReveal}
            />
          </div>

          {/* Right: Ant cards grid */}
          <div className="w-full lg:w-1/2 max-w-xl">
            <div className={cn(
              'grid grid-cols-3 gap-3 lg:gap-4 p-4 lg:p-6',
              'bg-card/90 backdrop-blur-sm rounded-2xl',
              'border-4 border-primary shadow-xl',
            )}>
              {cards.map((card) => (
                <AntCardComponent
                  key={card.id}
                  card={card}
                  onClick={() => selectCard(card.id)}
                  disabled={!canSelectCard}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Shake button */}
        <div className="mt-6 pb-4">
          <ShakeButton
            onClick={handleResultButton}
            disabled={phase === 'shaking' || phase === 'revealing'}
            label={getButtonLabel()}
          />
        </div>

        {/* Result Modal */}
        <ResultModal
          isOpen={phase === 'result'}
          isWinner={isWinner}
          selectedCard={selectedCard}
          diceResults={diceResults}
          cards={cards}
          onContinue={isWinner ? nextRound : resetGame}
        />
      </div>
    </div>
  );
};
