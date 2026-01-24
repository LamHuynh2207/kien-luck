import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AntCard } from '@/types/game';

interface ResultModalProps {
  isOpen: boolean;
  isWinner: boolean | null;
  selectedCard: number | null;
  diceResults: number[];
  cards: AntCard[];
  onContinue: () => void;
}

/**
 * Modal hiển thị kết quả sau mỗi lượt chơi
 */
export const ResultModal = ({
  isOpen,
  isWinner,
  selectedCard,
  diceResults,
  cards,
  onContinue,
}: ResultModalProps) => {
  if (!isOpen || isWinner === null) return null;

  const selectedAnt = cards.find(c => c.id === selectedCard);
  const matchCount = diceResults.filter(r => r === selectedCard).length;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className={cn(
          'sm:max-w-md border-4',
          isWinner 
            ? 'border-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)]' 
            : 'border-destructive bg-destructive/10',
        )}
      >
        <DialogTitle className="sr-only">
          {isWinner ? 'Thắng!' : 'Thua!'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {isWinner 
            ? 'Bạn đã đoán đúng! Tiếp tục chơi lượt tiếp theo.'
            : 'Bạn đã đoán sai. Thử lại từ đầu.'}
        </DialogDescription>
        
        <div className="text-center py-4">
          {/* Result icon */}
          <div className={cn(
            'text-6xl mb-4',
            isWinner ? 'animate-bounce' : 'animate-shake',
          )}>
            {isWinner ? '🎉' : '😢'}
          </div>

          {/* Result text */}
          <h2 className={cn(
            'text-2xl font-extrabold mb-2',
            isWinner ? 'text-[hsl(var(--success))]' : 'text-destructive',
          )}>
            {isWinner ? 'CHÚC MỪNG!' : 'TIẾC QUÁ!'}
          </h2>

          <p className="text-lg text-foreground mb-4">
            {isWinner 
              ? `Bạn được chọn tiếp! (${matchCount}x trùng)`
              : 'Bạn đã bị loại!'}
          </p>

          {/* Your choice */}
          {selectedAnt && (
            <div className="mb-4 p-3 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Bạn đã chọn:</p>
              <p className="font-bold text-foreground text-lg">
                {selectedCard}. {selectedAnt.name}
              </p>
            </div>
          )}

          {/* Dice results */}
          <div className="mb-6 p-3 bg-card rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">Kết quả xúc xắc:</p>
            <div className="flex justify-center gap-4">
              {diceResults.map((result, i) => {
                const matchingAnt = cards.find(c => c.id === result);
                const isMatch = result === selectedCard;
                return (
                  <div 
                    key={i} 
                    className={cn(
                      'flex flex-col items-center p-2 rounded-lg',
                      isMatch && 'bg-[hsl(var(--success)/0.2)] ring-2 ring-[hsl(var(--success))]',
                    )}
                  >
                    <span className={cn(
                      'text-2xl font-bold',
                      isMatch ? 'text-[hsl(var(--success))]' : 'text-foreground',
                    )}>
                      {result}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {matchingAnt?.name.split(' ')[1]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action button */}
          <Button
            onClick={onContinue}
            size="lg"
            className={cn(
              'w-full text-lg font-bold',
              isWinner 
                ? 'bg-[hsl(var(--success))] hover:bg-[hsl(var(--success)/0.9)]' 
                : 'bg-primary hover:bg-primary/90',
            )}
          >
            {isWinner ? '🎮 TIẾP TỤC LƯỢT SAU' : '🔄 CHƠI LẠI'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
