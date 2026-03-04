import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SliderOptionProps {
  options: { text: string }[];
  selectedIndex: number | undefined;
  onSelect: (index: number) => void;
}

export function SliderOption({ options, selectedIndex, onSelect }: SliderOptionProps) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const pct = hasInteracted && selectedIndex !== undefined
    ? (selectedIndex / (options.length - 1)) * 100
    : 0;

  const trackStyle = hasInteracted
    ? { background: `linear-gradient(to right, hsl(var(--primary)) ${pct}%, hsl(var(--muted)) ${pct}%)` }
    : { background: 'hsl(var(--muted))' };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = Number(e.target.value);
    setHasInteracted(true);
    onSelect(idx);
  }, [onSelect]);

  const current = hasInteracted ? (selectedIndex ?? 0) : -1;

  return (
    <div className="calm-slider-wrapper">
      <div className="calm-slider-track-row">
        <input
          type="range"
          min={0}
          max={options.length - 1}
          step={1}
          value={hasInteracted ? (selectedIndex ?? 0) : 0}
          onChange={handleChange}
          className={cn('calm-slider', !hasInteracted && 'unset')}
          style={trackStyle}
        />
      </div>
      <div className="calm-slider-labels">
        {options.map((opt, i) => {
          const thumbRadius = 11; // half of 22px thumb
          const p = options.length === 1 ? 50 : (i / (options.length - 1)) * 100;
          const offset = thumbRadius - (2 * thumbRadius * p) / 100;
          const isLast = i === options.length - 1;
          return (
            <span
              key={i}
              className={cn('calm-slider-label', current === i && 'active')}
              style={{
                left: `calc(${p}% + ${offset.toFixed(2)}px)`,
                maxWidth: `calc(100% / ${options.length})`,
                ...(isLast && { width: 'max-content' }),
              }}
            >
              {opt.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
