// Import board frame and individual ant images
import { memo, useMemo } from 'react';
import boardFrameImg from '@/assets/board-frame.png';
import antStudent from '@/assets/ant-student.png';
import antWarrior from '@/assets/ant-warrior.png';
import antTech from '@/assets/ant-tech.png';
import antGraduate from '@/assets/ant-graduate.png';
import antExplorer from '@/assets/ant-explorer.png';
import antSports from '@/assets/ant-sports.png';

// Add blink animation style
const blinkStyle = `
  @keyframes antBlink {
    0%, 100% {
      filter: drop-shadow(0 0 20px hsl(45 100% 60%)) drop-shadow(0 0 40px hsl(45 100% 55% / 0.8));
    }
    50% {
      filter: drop-shadow(0 0 8px hsl(45 100% 50%)) drop-shadow(0 0 20px hsl(45 100% 45% / 0.4));
    }
  }
`;

interface AntBoardProps {
  highlightedAnts: number[]; // Dice values (1-6)
}

/**
 * Layout:
 * [1-Student] [2-Warrior] [3-Tech]
 * [4-Graduate] [5-Explorer] [6-Sports]
 */
const ANT_SLOTS = [
  { position: 1, diceValue: 6, image: antStudent, name: 'Kiến Học Sinh' },
  { position: 2, diceValue: 4, image: antWarrior, name: 'Kiến Võ Sĩ' },
  { position: 3, diceValue: 2, image: antTech, name: 'Kiến Công Nghệ' },
  { position: 4, diceValue: 5, image: antGraduate, name: 'Kiến Tốt Nghiệp' },
  { position: 5, diceValue: 1, image: antExplorer, name: 'Kiến Khám Phá' },
  { position: 6, diceValue: 3, image: antSports, name: 'Kiến Vận Động' },
];

export const AntBoard = memo(({ highlightedAnts }: AntBoardProps) => {
  // Memoize ant slots to avoid recalculation
  const antSlots = useMemo(() => ANT_SLOTS, []);
  
  return (
    <>
      <style>{blinkStyle}</style>
      <div
        className="relative w-full"
        style={{ aspectRatio: '836 / 563' }} // 🔒 khóa đúng tỉ lệ board
      >
      {/* Board frame */}
      <img
        src={boardFrameImg}
        alt="Bảng chọn kiến"
        className="absolute inset-0 w-full h-full object-contain"
        loading="eager"
      />

      {/* Ant grid – fit cứng theo board */}
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-2"
        style={{
          padding: '7%',       // khớp viền board
          gap: '1.5%',         // khớp đường kẻ đỏ
        }}
      >
        {antSlots.map((slot) => {
          const isHighlighted = highlightedAnts.includes(slot.diceValue);

          return (
            <div
              key={slot.position}
              className="relative flex items-center justify-center"
            >
              <img
                src={slot.image}
                alt={slot.name}
                className="w-full h-full object-contain transition-all duration-300"
                style={{
                  maxWidth: '90%',
                  maxHeight: '90%',
                  animation: isHighlighted
                    ? 'antBlink 0.6s ease-in-out infinite'
                    : 'none',
                }}
                loading="eager"
              />
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
});
