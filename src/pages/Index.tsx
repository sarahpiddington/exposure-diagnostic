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

  const snapshotType = useMemo(() => determineSnapshot(answers), [answers]);

  const handleCapture = useCallback((data: ContactData) => {
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

    const snapshotContent = snapshots[snapshotType];

    const numbered = (items: string[]) => items.map((s, i) => `${i + 1}. ${s}`);

    const payload = {
      firstName,
      lastName,
      email: data.email,
      companyName: data.business,
      phone: data.phone,
      snapshot_type: snapshotType,
      snapshot_title: snapshotContent.title,
      snapshot_subject: snapshotContent.emailSubject,
      snapshot_email_intro: snapshotContent.emailIntro,
      snapshot_opening: snapshotContent.openingReflection,
      snapshot_working_well: numbered(snapshotContent.workingWell).join('\n'),
      snapshot_working_well_html: numbered(snapshotContent.workingWell).join('<br>'),
      snapshot_working_well_note: snapshotContent.workingWellNote,
      snapshot_quietly_risky: numbered(snapshotContent.quietlyRisky).join('\n'),
      snapshot_quietly_risky_html: numbered(snapshotContent.quietlyRisky).join('<br>'),
      snapshot_quietly_risky_note: snapshotContent.quietlyRiskyNote,
      snapshot_matters_title: snapshotContent.mattersTitle,
      snapshot_matters: numbered(snapshotContent.mattersAsYouGrow).join('\n'),
      snapshot_matters_html: numbered(snapshotContent.mattersAsYouGrow).join('<br>'),
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
  }, [answers, snapshotType]);

  const handleViewSnapshot = useCallback(() => {
    setCurrentScreen('snapshot');
  }, []);

  const handleEmailCopy = useCallback(() => {
    toast.success('Your diagnostic has been sent to your email.');
  }, []);

  const handleDownloadPdf = useCallback(() => {
    const snapshotContent = snapshots[snapshotType];
    const numbered = (items: string[]) => items.map((s, i) => `${i + 1}. ${s}`).join('<br>');
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html>
<html><head><title>Your Vulnerability Summary</title>
<style>
  body { font-family: 'Segoe UI', system-ui, sans-serif; max-width: 720px; margin: 0 auto; padding: 40px 24px; color: #1a3a3a; line-height: 1.6; }
  h1 { font-size: 24px; margin-bottom: 4px; }
  h2 { font-size: 18px; color: #1a3a3a; margin-top: 28px; margin-bottom: 12px; border-left: 3px solid #b8a04a; padding-left: 12px; }
  .badge { display: inline-block; background: #e8f0f0; padding: 6px 16px; border-radius: 20px; font-size: 14px; margin-bottom: 16px; }
  .subtitle { font-size: 18px; font-weight: bold; margin-bottom: 20px; }
  .opening { margin-bottom: 24px; }
  .items { margin-left: 0; padding-left: 0; }
  .items p { margin: 8px 0; padding-left: 16px; border-left: 2px solid #ddd; }
  .note { font-size: 13px; color: #666; font-style: italic; margin-top: 8px; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 13px; color: #666; }
  @media print { body { padding: 20px; } }
</style></head><body>
<h1>Your Vulnerability Summary</h1>
<div class="badge">${snapshotContent.title}</div>
<div class="subtitle">${snapshotContent.subtitle}</div>
<div class="opening">${snapshotContent.openingReflection}</div>
<h2>What's likely working well</h2>
<div class="items">${snapshotContent.workingWell.map(s => `<p>${s}</p>`).join('')}</div>
<h2>What's quietly risky</h2>
<div class="items">${snapshotContent.quietlyRisky.map(s => `<p>${s}</p>`).join('')}</div>
<h2>${snapshotContent.mattersTitle}</h2>
<div class="items">${snapshotContent.mattersAsYouGrow.map(s => `<p>${s}</p>`).join('')}</div>
<div class="footer">
  <p><strong>Want to talk through what this means for your business?</strong></p>
  <p>Book a free, no-pressure call with Sarah: https://calendar.safeandwelltogether.com/discovery</p>
  <p>Or email: sarah@safeandwelltogether.com</p>
</div>
</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
  }, [snapshotType]);

  const currentQuestion = questions[currentQuestionIndex];
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
