import { cn } from '@/lib/utils';

// Import board frame and individual ant images
import boardFrameImg from '@/assets/board-frame.png';
import antStudent from '@/assets/ant-student.png';
import antWarrior from '@/assets/ant-warrior.png';
import antTech from '@/assets/ant-tech.png';
import antGraduate from '@/assets/ant-graduate.png';
import antExplorer from '@/assets/ant-explorer.png';
import antSports from '@/assets/ant-sports.png';

interface AntBoardProps {
  highlightedAnts: number[]; // Dice values (1-6)
}

/**
 * Dice result → Ant mapping:
 * Dice 1 → Asset 11 (explorer) - Position 5
 * Dice 2 → Asset 9 (tech) - Position 3
 * Dice 3 → Asset 12 (sports) - Position 6
 * Dice 4 → Asset 13 (warrior) - Position 2
 * Dice 5 → Asset 10 (graduate) - Position 4
 * Dice 6 → Asset 14 (student) - Position 1
 * 
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

export const AntBoard = ({ highlightedAnts }: AntBoardProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Board frame background */}
      <img
        src={boardFrameImg}
        alt="Bảng chọn kiến"
        className="w-full h-full object-contain"
      />
      
      {/* Grid of ant slots overlaid on the frame - responsive for 3:1 LED */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[1%] p-[7%]">
        {ANT_SLOTS.map((slot) => {
          const isHighlighted = highlightedAnts.includes(slot.diceValue);
          return (
            <div
              key={slot.position}
              className={cn(
                'relative flex items-center justify-center overflow-hidden aspect-square',
              )}
            >
              <img
                src={slot.image}
                alt={slot.name}
                className={cn(
                  'w-[70%] h-[70%] object-contain transition-all duration-300',
                  isHighlighted && 'animate-ant-glow',
                )}
                style={{
                  filter: isHighlighted 
                    ? 'drop-shadow(0 0 25px hsl(45 100% 60%)) drop-shadow(0 0 50px hsl(45 100% 55% / 0.8)) drop-shadow(0 0 80px hsl(45 100% 50% / 0.5))'
                    : 'none',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
