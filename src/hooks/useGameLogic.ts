import { useState, useCallback } from 'react';
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
   * Called automatically after 5s shake or can be triggered programmatically
   */
  const revealResult = useCallback(() => {
    // Only reveal if currently shaking
    if (gameState.phase !== 'shaking') return;
    
    const results = rollDice();

    // Transition qua revealing trước
    setGameState(prev => ({
      ...prev,
      phase: 'revealing',
      message: 'Đang mở...',
    }));

    // Sau đó chuyển sang result
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        phase: 'result',
        diceResults: results,
        message: 'Kết quả!',
      }));

      // Cập nhật trạng thái các thẻ kiến
      setCards(prevCards => prevCards.map(card => {
        const isInResult = results.includes(card.id);
        return { 
          ...card, 
          state: isInResult ? 'win' : 'normal' 
        };
      }));
    }, 300);
  }, [rollDice, gameState.phase]);

  /**
   * Reset hoàn toàn game
   */
  const resetGame = useCallback(() => {
    setCards(ANT_CARDS.map(c => ({ ...c })));
    setGameState(INITIAL_GAME_STATE);
  }, []);

  return {
    gameState,
    cards,
    startShaking,
    revealResult,
    resetGame,
  };
};
