import { useState, useCallback, useMemo } from 'react';
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

  const handleCapture = useCallback((data: ContactData) => {
    const snapshotResult = determineSnapshot(answers);

    // Transition immediately — don't block UI on webhook
    setCurrentScreen('transition');

    // Build human-readable answers map
    const readableAnswers: Record<string, string | string[]> = {};
    questions.forEach((q) => {
      const raw = answers[q.id];
      if (raw === undefined) return;
      if (Array.isArray(raw)) {
        readableAnswers[q.text] = raw.map((i) => q.options[i] ?? String(i));
      } else {
        readableAnswers[q.text] = q.options[raw] ?? String(raw);
      }
    });

    // GHL-standard field names
    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ');

    const snapshotContent = snapshots[snapshotResult];

    const payload = {
      firstName,
      lastName,
      email: data.email,
      companyName: data.business,
      phone: data.phone,
      snapshot_type: snapshotResult,
      snapshot_title: snapshotContent.title,
      snapshot_subject: snapshotContent.emailSubject,
      snapshot_email_intro: snapshotContent.emailIntro,
      snapshot_opening: snapshotContent.openingReflection,
      snapshot_working_well: snapshotContent.workingWell.map((s, i) => `${i + 1}. ${s}`).join('\n'),
      snapshot_working_well_note: snapshotContent.workingWellNote,
      snapshot_quietly_risky: snapshotContent.quietlyRisky.map((s, i) => `${i + 1}. ${s}`).join('\n'),
      snapshot_quietly_risky_note: snapshotContent.quietlyRiskyNote,
      snapshot_matters_title: snapshotContent.mattersTitle,
      snapshot_matters: snapshotContent.mattersAsYouGrow.map((s, i) => `${i + 1}. ${s}`).join('\n'),
      answers: readableAnswers,
      completed_at: new Date().toISOString(),
    };

    console.log('[GHL] Firing webhook with payload:', payload);

    fetch('https://services.leadconnectorhq.com/hooks/0gut5TWKh7PrQ2DYQ6Hc/webhook-trigger/4e27f580-c00f-4d35-a4ee-2baa9674769d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(() => console.log('[GHL] Webhook sent successfully'))
      .catch((err) => console.error('[GHL] Webhook failed:', err));
  }, [answers]);

  const handleViewSnapshot = useCallback(() => {
    setCurrentScreen('snapshot');
  }, []);

  const handleEmailCopy = () => {
    toast.success('Your diagnostic has been sent to your email.');
  };

  const handleDownloadPdf = () => {
    toast.success('Your PDF is being prepared for download.');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const snapshotType = useMemo(() => determineSnapshot(answers), [answers]);
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
