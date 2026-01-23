import { cn } from '@/lib/utils';

interface AnswerOptionProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export function AnswerOption({ text, isSelected, onClick }: AnswerOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'answer-option w-full text-left',
        isSelected && 'selected'
      )}
    >
      <span className="font-body text-base text-foreground">
        {text}
      </span>
    </button>
  );
}
