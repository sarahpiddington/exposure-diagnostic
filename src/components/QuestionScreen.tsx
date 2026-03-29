import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AnswerOption } from '@/components/AnswerOption';
import { Question, totalQuestions } from '@/lib/questions';

interface QuestionScreenProps {
  question: Question;
  selectedAnswer: number | number[] | undefined;
  onAnswer: (questionId: number, answerIndex: number) => void;
  onMultiAnswer: (questionId: number, answerIndex: number) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function QuestionScreen({
  question,
  selectedAnswer,
  onAnswer,
  onMultiAnswer,
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

  const isOptionSelected = (index: number): boolean => {
    if (question.multiSelect) {
      return Array.isArray(selectedAnswer) && selectedAnswer.includes(index);
    }
    return selectedAnswer === index;
  };

  const hasAnswer = question.multiSelect
    ? Array.isArray(selectedAnswer) && selectedAnswer.length > 0
    : selectedAnswer !== undefined;

  const handleOptionClick = (index: number) => {
    if (question.multiSelect) {
      onMultiAnswer(question.id, index);
    } else {
      onAnswer(question.id, index);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-[10%] py-6">
      <div
        className={`calm-card w-full transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <img src="/logo.png" alt="Safe and Well Together" className="h-12 mx-auto" />

          {/* Progress */}
          <div>
            <span className="font-caption text-sm text-muted-foreground">
              Question {question.id} of {totalQuestions} · {Math.round((question.id / totalQuestions) * 100)}% complete
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-snug">
            {question.text}
          </h2>

          <p className="font-caption text-sm text-muted-foreground">
            {question.multiSelect
              ? 'Select all that apply.'
              : 'Choose the option that feels closest right now.'}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <AnswerOption
                key={index}
                text={option}
                isSelected={isOptionSelected(index)}
                onClick={() => handleOptionClick(index)}
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
              disabled={!hasAnswer}
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
