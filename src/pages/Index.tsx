import { useState, useCallback } from 'react';
import { StartScreen } from '@/components/StartScreen';
import { QuestionScreen } from '@/components/QuestionScreen';
import { CaptureScreen } from '@/components/CaptureScreen';
import { TransitionScreen } from '@/components/TransitionScreen';
import { SnapshotScreen } from '@/components/SnapshotScreen';
import { questions } from '@/lib/questions';
import { snapshots, determineSnapshot } from '@/lib/snapshots';
import { toast } from 'sonner';

type Screen = 'start' | 'questions' | 'capture' | 'transition' | 'snapshot';

interface ContactData {
  name: string;
  email: string;
  business: string;
  phone: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({});
  const [contactData, setContactData] = useState<ContactData | null>(null);

  const handleStart = useCallback(() => {
    setCurrentScreen('questions');
  }, []);

  const handleAnswer = useCallback((questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  }, []);

  const handleMultiAnswer = useCallback((questionId: number, answerIndex: number) => {
    setAnswers(prev => {
      const current = prev[questionId];
      const currentArray = Array.isArray(current) ? current : [];
      if (currentArray.includes(answerIndex)) {
        return { ...prev, [questionId]: currentArray.filter(i => i !== answerIndex) };
      } else {
        return { ...prev, [questionId]: [...currentArray, answerIndex] };
      }
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('capture');
    }
  }, [currentQuestionIndex]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleCapture = useCallback(async (data: ContactData) => {
    setContactData(data);
    const snapshotResult = determineSnapshot(answers);

    // Send to GHL webhook
    try {
      await fetch('https://services.leadconnectorhq.com/hooks/0gut5TWKh7PrQ2DYQ6Hc/webhook-trigger/60524e6d-fe44-497c-883b-f31a6255fae4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          business: data.business,
          phone: data.phone,
          snapshot_type: snapshotResult,
          answers: answers,
          completed_at: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to send to webhook:', error);
    }

    setCurrentScreen('transition');
  }, [answers]);

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
          onMultiAnswer={handleMultiAnswer}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={currentQuestionIndex > 0}
        />
      )}

      {currentScreen === 'capture' && (
        <CaptureScreen onSubmit={handleCapture} />
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
