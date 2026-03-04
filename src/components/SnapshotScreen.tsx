import { Button } from '@/components/ui/button';
import { Snapshot } from '@/lib/snapshots';

function SnapshotSection({ title, items, accentClass }: { title: string; items: string[]; accentClass: string }) {
  return (
    <section>
      <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-3">
        <span className={`w-8 h-0.5 rounded-full ${accentClass}`}></span>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="font-body text-foreground/80 pl-4 border-l-2 border-muted">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

interface SnapshotScreenProps {
  snapshot: Snapshot;
  onEmailCopy: () => void;
  onDownloadPdf: () => void;
}

export function SnapshotScreen({ snapshot, onEmailCopy, onDownloadPdf }: SnapshotScreenProps) {
  return (
    <div className="min-h-screen py-12 px-4 md:px-[10%]">
      <div className="w-full">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Exposure Summary
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Based on what you shared, this is the operating pattern we most often see.
          </p>
        </header>

        {/* Main Snapshot Card */}
        <article className="calm-card mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {/* Snapshot Type Badge */}
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="font-caption text-sm font-medium text-primary">
              {snapshot.title}
            </span>
          </div>

          <p className="font-heading text-xl md:text-2xl font-bold text-foreground mb-8 leading-relaxed">
            {snapshot.subtitle}
          </p>

          {/* Opening Reflection */}
          <div className="prose prose-lg max-w-none mb-10">
            <p className="font-body text-foreground/90 leading-relaxed">
              {snapshot.openingReflection}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            <SnapshotSection title="What's likely working well" items={snapshot.workingWell} accentClass="bg-secondary" />
            <SnapshotSection title="What's quietly risky" items={snapshot.quietlyRisky} accentClass="bg-muted" />
            <SnapshotSection title={snapshot.mattersTitle} items={snapshot.mattersAsYouGrow} accentClass="bg-primary/50" />
          </div>
        </article>

        {/* Actions */}
        <div
          className="no-print flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <Button 
            onClick={onEmailCopy}
            size="lg"
            className="px-8"
          >
            Email me a copy
          </Button>
          <Button 
            onClick={onDownloadPdf}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Download as PDF
          </Button>
        </div>

        {/* Footer */}
        <footer
          className="text-center animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          <a
            href="mailto:sarah@safeandwelltogether.com?subject=I'd like to talk through my results"
            className="no-print font-caption text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Talk this through with Sarah
          </a>
          <img
            src="/logo.png"
            alt="SAWT Logo"
            className="h-10 mx-auto mt-8 opacity-70"
          />
        </footer>
      </div>
    </div>
  );
}
