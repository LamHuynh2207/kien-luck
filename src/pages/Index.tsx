import { GameBoard } from '@/components/game/GameBoard';

/**
 * Trang chính - Game KIẾN LUCK
 * 
 * Luật chơi:
 * 1. Nhấn LẮC để bắt đầu
 * 2. Chọn 1 ô KIẾN (1-6)
 * 3. Hệ thống lắc 3 xúc xắc
 * 4. Click bát để mở kết quả
 * 5. Nếu ô bạn chọn trùng với ít nhất 1 xúc xắc → THẮNG
 * 6. Nếu không trùng → THUA
 */
const Index = () => {
  return (
    <main className="min-h-screen">
      <GameBoard />
    </main>
  );
};

export default Index;
