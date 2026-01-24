// Game types for KIẾN LUCK

export type AntType = 
  | 'student'    // Kiến học sinh
  | 'warrior'    // Kiến võ sĩ
  | 'tech'       // Kiến công nghệ
  | 'graduate'   // Kiến tốt nghiệp
  | 'explorer'   // Kiến khám phá
  | 'sports';    // Kiến vận động

export type CardState = 'normal' | 'selected' | 'win' | 'lose';

export type GamePhase = 
  | 'waiting'     // Chờ bắt đầu
  | 'selecting'   // Người chơi đang chọn ô
  | 'shaking'     // Đang lắc xúc xắc (bát che)
  | 'revealing'   // Đang mở kết quả
  | 'result';     // Hiển thị kết quả

export interface AntCard {
  id: number;
  type: AntType;
  name: string;
  state: CardState;
}

export interface GameState {
  phase: GamePhase;
  selectedCard: number | null;  // ID của ô đã chọn
  diceResults: number[];        // Kết quả 3 xúc xắc (1-6)
  round: number;                // Lượt chơi hiện tại
  isWinner: boolean | null;     // Kết quả lượt này
  message: string;              // Thông báo hiển thị
}

export const ANT_CARDS: AntCard[] = [
  { id: 1, type: 'student', name: 'Kiến Học Sinh', state: 'normal' },
  { id: 2, type: 'warrior', name: 'Kiến Võ Sĩ', state: 'normal' },
  { id: 3, type: 'tech', name: 'Kiến Công Nghệ', state: 'normal' },
  { id: 4, type: 'graduate', name: 'Kiến Tốt Nghiệp', state: 'normal' },
  { id: 5, type: 'explorer', name: 'Kiến Khám Phá', state: 'normal' },
  { id: 6, type: 'sports', name: 'Kiến Vận Động', state: 'normal' },
];

export const INITIAL_GAME_STATE: GameState = {
  phase: 'waiting',
  selectedCard: null,
  diceResults: [],
  round: 1,
  isWinner: null,
  message: 'Nhấn LẮC để bắt đầu!',
};
