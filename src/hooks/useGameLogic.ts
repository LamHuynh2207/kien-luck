import { useState, useCallback } from 'react';
import { 
  GameState, 
  INITIAL_GAME_STATE, 
  ANT_CARDS, 
  AntCard 
} from '@/types/game';

/**
 * Custom hook quản lý toàn bộ logic game KIẾN LUCK
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
   * Người chơi chọn 1 ô kiến
   */
  const selectCard = useCallback((cardId: number) => {
    if (gameState.phase !== 'selecting') return;
    if (gameState.selectedCard !== null) return; // Đã chọn rồi

    setGameState(prev => ({
      ...prev,
      selectedCard: cardId,
      message: `Bạn đã chọn ${cards.find(c => c.id === cardId)?.name}!`,
    }));

    setCards(prev => prev.map(card => ({
      ...card,
      state: card.id === cardId ? 'selected' : 'normal',
    })));
  }, [gameState.phase, gameState.selectedCard, cards]);

  /**
   * Bắt đầu lắc - che bát và cho chọn ô
   */
  const startShaking = useCallback(() => {
    // Reset cards
    setCards(ANT_CARDS.map(c => ({ ...c })));
    
    setGameState({
      ...INITIAL_GAME_STATE,
      phase: 'selecting',
      round: gameState.round,
      message: 'Chọn 1 ô KIẾN của bạn!',
    });
  }, [gameState.round]);

  /**
   * Bắt đầu animation lắc bát
   */
  const shakeStart = useCallback(() => {
    if (gameState.selectedCard === null) {
      setGameState(prev => ({
        ...prev,
        message: '⚠️ Vui lòng chọn 1 ô trước!',
      }));
      return false;
    }

    setGameState(prev => ({
      ...prev,
      phase: 'shaking',
      message: 'Đang lắc xúc xắc...',
    }));
    return true;
  }, [gameState.selectedCard]);

  /**
   * Mở kết quả - hiển thị xúc xắc và xác định thắng/thua
   */
  const revealResult = useCallback(() => {
    const results = rollDice();
    const selectedId = gameState.selectedCard;
    
    // Kiểm tra thắng: ô đã chọn có trong kết quả xúc xắc không
    const isWin = selectedId !== null && results.includes(selectedId);

    setGameState(prev => ({
      ...prev,
      phase: 'result',
      diceResults: results,
      isWinner: isWin,
      message: isWin 
        ? '🎉 CHÚC MỪNG! Bạn được chọn tiếp!' 
        : '❌ Tiếc quá! Bạn đã bị loại!',
    }));

    // Cập nhật trạng thái các thẻ
    setCards(prev => prev.map(card => {
      const isInResult = results.includes(card.id);
      const isSelected = card.id === selectedId;

      if (isSelected && isInResult) {
        return { ...card, state: 'win' };
      } else if (isSelected && !isInResult) {
        return { ...card, state: 'lose' };
      } else if (isInResult) {
        return { ...card, state: 'win' };
      }
      return { ...card, state: 'normal' };
    }));
  }, [gameState.selectedCard, rollDice]);

  /**
   * Chơi lượt tiếp theo
   */
  const nextRound = useCallback(() => {
    setCards(ANT_CARDS.map(c => ({ ...c })));
    setGameState({
      ...INITIAL_GAME_STATE,
      round: gameState.round + 1,
      phase: 'waiting',
      message: 'Nhấn LẮC để tiếp tục!',
    });
  }, [gameState.round]);

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
    selectCard,
    startShaking,
    shakeStart,
    revealResult,
    nextRound,
    resetGame,
  };
};
