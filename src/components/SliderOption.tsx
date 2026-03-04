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

  // Fix: when value is already 0, onChange won't fire on first click — capture it here
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLInputElement>) => {
    if (!hasInteracted) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const idx = Math.round(pct * (options.length - 1));
      setHasInteracted(true);
      onSelect(idx);
    }
  }, [hasInteracted, options.length, onSelect]);

  const current = hasInteracted ? (selectedIndex ?? 0) : -1;
  const n = options.length;

  return (
    <div className="calm-slider-wrapper">
      <div className="calm-slider-track-row">
        <input
          type="range"
          min={0}
          max={n - 1}
          step={1}
          value={hasInteracted ? (selectedIndex ?? 0) : 0}
          onChange={handleChange}
          onPointerDown={handlePointerDown}
          className={cn('calm-slider', !hasInteracted && 'unset')}
          style={trackStyle}
        />
      </div>
      <div className="calm-slider-labels">
        {options.map((opt, i) => {
          const isFirst = i === 0;
          const isLast = i === n - 1;
          const thumbRadius = 11;
          const p = n === 1 ? 50 : (i / (n - 1)) * 100;
          const offset = thumbRadius - (2 * thumbRadius * p) / 100;

          // Pin first/last labels to edges so they never overflow the container
          const style: React.CSSProperties = isFirst
            ? { left: 0, transform: 'none', textAlign: 'left', maxWidth: `calc(100% / ${n})` }
            : isLast
            ? { right: 0, left: 'auto', transform: 'none', textAlign: 'right', maxWidth: `calc(100% / ${n})` }
            : { left: `calc(${p}% + ${offset.toFixed(2)}px)`, maxWidth: `calc(100% / ${n})` };

          return (
            <span
              key={i}
              className={cn('calm-slider-label', current === i && 'active')}
              style={style}
            >
              {opt.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
