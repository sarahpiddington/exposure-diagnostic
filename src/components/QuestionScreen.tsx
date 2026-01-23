import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AnswerOption } from '@/components/AnswerOption';
import { Question, totalQuestions } from '@/lib/questions';

interface QuestionScreenProps {
  question: Question;
  selectedAnswer: number | undefined;
  onAnswer: (questionId: number, answerIndex: number) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function QuestionScreen({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onBack,
  canGoBack,
}: QuestionScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [question.id]);

  const sectionColors: Record<string, string> = {
    people: 'bg-secondary/20 text-secondary',
    operational: 'bg-primary/10 text-primary',
    growth: 'bg-accent/20 text-accent-foreground',
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div 
        className={`calm-card max-w-2xl w-full transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div className="space-y-8">
          {/* Progress */}
          <div className="flex items-center justify-between">
            <span className="font-caption text-sm text-muted-foreground">
              Question {question.id} of {totalQuestions}
            </span>
            <span className={`font-caption text-xs px-3 py-1 rounded-full ${sectionColors[question.section]}`}>
              {question.sectionLabel}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(question.id / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question */}
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-snug text-balance">
            {question.text}
          </h2>

          <p className="font-caption text-sm text-muted-foreground">
            Choose the option that feels closest right now.
          </p>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <AnswerOption
                key={index}
                text={option}
                isSelected={selectedAnswer === index}
                onClick={() => onAnswer(question.id, index)}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <div>
              {canGoBack && (
                <button
                  onClick={onBack}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              )}
            </div>
            
            <Button
              onClick={onNext}
              disabled={selectedAnswer === undefined}
              size="lg"
              className="px-8"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
