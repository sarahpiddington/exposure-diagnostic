import { Button } from '@/components/ui/button';

interface TransitionScreenProps {
  onViewSnapshot: () => void;
}

export function TransitionScreen({ onViewSnapshot }: TransitionScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-[10%] py-6">
      <div className="w-full text-center animate-fade-in">
        <div className="space-y-8">
          <img src="/logo.png" alt="Safe and Well Together" className="h-12 mx-auto" />

          <div className="space-y-4">
            <p className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
              Thanks for answering honestly.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Here's a reflection based on patterns we commonly see in businesses like yours.
            </p>
          </div>

          <Button 
            onClick={onViewSnapshot}
            size="lg"
            className="px-12 py-6 text-lg font-body font-medium"
          >
            View your diagnostic
          </Button>
        </div>
      </div>
    </div>
  );
}
