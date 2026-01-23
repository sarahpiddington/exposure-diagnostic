import { useState, useCallback } from 'react';
import { StartScreen } from '@/components/StartScreen';
import { QuestionScreen } from '@/components/QuestionScreen';
import { TransitionScreen } from '@/components/TransitionScreen';
import { SnapshotScreen } from '@/components/SnapshotScreen';
import { questions } from '@/lib/questions';
import { snapshots, determineSnapshot } from '@/lib/snapshots';
import { toast } from 'sonner';

type Screen = 'start' | 'questions' | 'transition' | 'snapshot';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStart = useCallback(() => {
    setCurrentScreen('questions');
  }, []);

  const handleAnswer = useCallback((questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('transition');
    }
  }, [currentQuestionIndex]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleViewSnapshot = useCallback(() => {
    setCurrentScreen('snapshot');
  }, []);

  const handleEmailCopy = useCallback(() => {
    toast.success('We will send your snapshot to your email shortly.');
  }, []);

  const handleDownloadPdf = useCallback(() => {
    toast.success('Your PDF is being prepared for download.');
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const snapshotType = determineSnapshot(answers);
  const snapshot = snapshots[snapshotType];

  return (
    <main className="min-h-screen bg-background">
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      
      {currentScreen === 'questions' && currentQuestion && (
        <QuestionScreen
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={currentQuestionIndex > 0}
        />
      )}
      
      {currentScreen === 'transition' && (
        <TransitionScreen onViewSnapshot={handleViewSnapshot} />
      )}
      
      {currentScreen === 'snapshot' && (
        <SnapshotScreen
          snapshot={snapshot}
          onEmailCopy={handleEmailCopy}
          onDownloadPdf={handleDownloadPdf}
        />
      )}
    </main>
  );
};

export default Index;
