import { useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SliderOptionProps {
  options: { text: string }[];
  selectedIndex: number | undefined;
  onSelect: (index: number) => void;
}

export function SliderOption({ options, selectedIndex, onSelect }: SliderOptionProps) {
  const hasAnswer = selectedIndex !== undefined;
  const pct = hasAnswer ? (selectedIndex / (options.length - 1)) * 100 : 0;

  const trackStyle = hasAnswer
    ? { background: `linear-gradient(to right, hsl(var(--primary)) ${pct}%, hsl(var(--muted)) ${pct}%)` }
    : { background: 'hsl(var(--muted))' };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(Number(e.target.value));
  }, [onSelect]);

  // Fix: when selectedIndex is undefined the value is already 0, so onChange won't
  // fire if the user clicks the leftmost position — capture it on pointer down instead.
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLInputElement>) => {
    if (!hasAnswer) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onSelect(Math.round(pct * (options.length - 1)));
    }
  }, [hasAnswer, options.length, onSelect]);

  const n = options.length;
  const current = hasAnswer ? selectedIndex : -1;

  return (
    <div className="calm-slider-wrapper">
      <div className="calm-slider-track-row">
        <input
          type="range"
          min={0}
          max={n - 1}
          step={1}
          value={selectedIndex ?? 0}
          onChange={handleChange}
          onPointerDown={handlePointerDown}
          className={cn('calm-slider', !hasAnswer && 'unset')}
          style={trackStyle}
        />
      </div>
      <div className="calm-slider-labels">
        {options.map((opt, i) => {
          const isFirst = i === 0;
          const isLast = i === n - 1;
          const halfSegment = `${100 / (2 * (n - 1))}%`;

          let style: React.CSSProperties;
          if (isFirst) {
            style = { left: 0, transform: 'none', textAlign: 'left', maxWidth: halfSegment };
          } else if (isLast) {
            style = { right: 0, left: 'auto', transform: 'none', textAlign: 'right', maxWidth: halfSegment };
          } else {
            const p = (i / (n - 1)) * 100;
            const thumbPx = 11; // half of 22px thumb
            const correction = thumbPx - (2 * thumbPx * p) / 100;
            style = { left: `calc(${p}% + ${correction.toFixed(1)}px)`, maxWidth: `${100 / (n - 1)}%` };
          }

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
