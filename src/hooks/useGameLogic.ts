import { useState, useCallback, useEffect } from 'react';
import { 
  GameState, 
  INITIAL_GAME_STATE, 
  ANT_CARDS, 
  AntCard 
} from '@/types/game';

/**
 * Custom hook quản lý toàn bộ logic game KIẾN LUCK
 * 
 * Flow:
 * 1. waiting -> Nhấn LẮC -> shaking (bát lắc)
 * 2. shaking -> Click bát -> revealing -> result (hiện xúc xắc)
 * 3. result -> Nhấn LẮC -> quay lại waiting
 */
export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [cards, setCards] = useState<AntCard[]>(ANT_CARDS.map(c => ({ ...c })));

  /**
   * Random 3 xúc xắc (1-6)
   */
  const rollDice = useCallback((): number[] => {
    return Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
  }, []);

  /**
   * Bắt đầu lắc bát - chuyển sang phase shaking
   */
  const startShaking = useCallback(() => {
    // Reset cards
    setCards(ANT_CARDS.map(c => ({ ...c })));
    
    setGameState(prev => ({
      ...INITIAL_GAME_STATE,
      phase: 'shaking',
      round: prev.phase === 'result' ? prev.round + 1 : prev.round,
      message: 'Đang lắc xúc xắc...',
    }));
  }, []);

  /**
   * Mở kết quả - bát trượt sang trái, hiển thị xúc xắc
   * Can be triggered when shaking or waiting
   */
  const revealResult = useCallback(() => {
    // Allow reveal when shaking or waiting
    if (gameState.phase !== 'shaking' && gameState.phase !== 'waiting') return;
    
    const results = rollDice();

    // Direct transition to result with faster animation (100ms instead of 300ms)
    setGameState(prev => ({
      ...prev,
      phase: 'result',
      diceResults: results,
      message: 'Kết quả!',
    }));

    // Update cards state after initial render
    setTimeout(() => {
      setCards(prevCards => prevCards.map(card => {
        const isInResult = results.includes(card.id);
        return { 
          ...card, 
          state: isInResult ? 'win' : 'normal' 
        };
      }));
    }, 100);
  }, [rollDice, gameState.phase]);

  /**
   * Reset hoàn toàn game
   */
  const resetGame = useCallback(() => {
    setCards(ANT_CARDS.map(c => ({ ...c })));
    setGameState(INITIAL_GAME_STATE);
  }, []);

  // Sau 3 giây lắc thì dừng lắc, nhưng vẫn giữ tô che kết quả
  useEffect(() => {
    if (gameState.phase === 'shaking') {
      const timer = setTimeout(() => {
        setGameState(prev => {
          if (prev.phase !== 'shaking') return prev;
          return {
            ...prev,
            phase: 'waiting', // Dừng lắc, chuyển về trạng thái chờ mở kết quả
            message: 'Nhấn vào tô để mở kết quả',
          };
        });
      }, 3000); // 3 giây
      return () => clearTimeout(timer);
    }
  }, [gameState.phase]);

  return {
    gameState,
    cards,
    startShaking,
    revealResult,
    resetGame,
  };
};
