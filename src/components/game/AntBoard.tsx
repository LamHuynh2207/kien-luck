import { cn } from '@/lib/utils';
import antBoardImg from '@/assets/ant-board.png';

interface AntBoardProps {
  highlightedAnts: number[]; // IDs of ants to highlight (1-6)
}

/**
 * Bảng 6 chú kiến - hiển thị với hiệu ứng highlight khi trúng xúc xắc
 * Layout: 3x2 grid khớp với hình ảnh
 * Ant mapping (theo vị trí trong ảnh):
 * 1-Học sinh | 2-Võ sĩ    | 3-Công nghệ
 * 4-Tốt nghiệp | 5-Khám phá | 6-Vận động
 */
export const AntBoard = ({ highlightedAnts }: AntBoardProps) => {
  // Vị trí các ô kiến trong grid (tính theo %)
  const antPositions = [
    { id: 1, top: '5%', left: '3%', width: '31%', height: '45%' },
    { id: 2, top: '5%', left: '35%', width: '31%', height: '45%' },
    { id: 3, top: '5%', left: '67%', width: '30%', height: '45%' },
    { id: 4, top: '50%', left: '3%', width: '31%', height: '45%' },
    { id: 5, top: '50%', left: '35%', width: '31%', height: '45%' },
    { id: 6, top: '50%', left: '67%', width: '30%', height: '45%' },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Hình ảnh bảng kiến */}
      <img
        src={antBoardImg}
        alt="Bảng 6 chú kiến"
        className="w-full h-full object-contain"
      />
      
      {/* Overlay highlight cho từng ô kiến */}
      {antPositions.map((pos) => {
        const isHighlighted = highlightedAnts.includes(pos.id);
        return (
          <div
            key={pos.id}
            className={cn(
              'absolute transition-all duration-500 rounded-lg pointer-events-none',
              isHighlighted && 'animate-pulse',
            )}
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
              height: pos.height,
              background: isHighlighted 
                ? 'radial-gradient(ellipse at center, hsl(45 100% 50% / 0.4), transparent 70%)'
                : 'transparent',
              boxShadow: isHighlighted 
                ? '0 0 30px hsl(45 100% 50% / 0.6), inset 0 0 20px hsl(45 100% 50% / 0.3)'
                : 'none',
            }}
          />
        );
      })}
    </div>
  );
};
