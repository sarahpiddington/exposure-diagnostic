import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="calm-card max-w-xl w-full animate-fade-in">
        <div className="text-center space-y-6">
          <img
            src="/logo.png"
            alt="SAWT Logo"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance">
            How Exposed Is Your Business?
          </h1>
          
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            A short, judgement-free reflection on how exposed your business might be across wellbeing, health and safety.
          </p>

          <p className="font-body text-muted-foreground">
            15 questions across 3 categories. This takes about 7 minutes to complete. You'll get a personalised summary of where you stand.
          </p>

          <div className="flex flex-wrap justify-center gap-4 py-4">
            <span className="font-caption text-sm text-muted-foreground px-4 py-2 bg-muted/30 rounded-full">
              No legal language
            </span>
            <span className="font-caption text-sm text-muted-foreground px-4 py-2 bg-muted/30 rounded-full">
              No scores or ratings
            </span>
            <span className="font-caption text-sm text-muted-foreground px-4 py-2 bg-muted/30 rounded-full">
              No judgement
            </span>
          </div>

          <Button 
            onClick={onStart}
            size="lg"
            className="w-full sm:w-auto px-12 py-6 text-lg font-body font-medium"
          >
            Start the Diagnostic
          </Button>

          <div className="pt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-2 font-caption text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              What you'll be asked
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showDetails && (
              <div className="mt-4 p-4 bg-muted/20 rounded-lg animate-fade-in">
                <ul className="font-body text-sm text-muted-foreground space-y-2 text-left">
                  <li>• People strain – how your team is managing</li>
                  <li>• Operational clarity – how work gets done</li>
                  <li>• Growth and scrutiny readiness – how prepared you are for what's next</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="font-caption text-xs text-muted-foreground text-center">
            Your answers are private. You'll receive a copy of your diagnostic.
          </p>
        </div>
      </div>
    </div>
  );
}
