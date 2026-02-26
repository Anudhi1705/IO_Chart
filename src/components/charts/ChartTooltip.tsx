import React from 'react';
import type { TooltipState } from '@/lib/chart/types';
import { formatValue } from '@/lib/chart/scale';

interface ChartTooltipProps {
  tooltip: TooltipState;
  containerRef: React.RefObject<SVGSVGElement>;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ tooltip }) => {
  if (!tooltip.visible) return null;

  return (
    <div
      className="absolute pointer-events-none z-50 px-3 py-2 rounded-md border text-sm font-body shadow-lg transition-opacity duration-150"
      style={{
        left: tooltip.x,
        top: tooltip.y - 50,
        backgroundColor: 'hsl(var(--chart-tooltip-bg))',
        borderColor: 'hsl(var(--chart-tooltip-border))',
        transform: 'translateX(-50%)',
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: tooltip.color }}
        />
        <span className="text-muted-foreground">{tooltip.name}</span>
        <span className="font-display font-semibold text-foreground">
          {formatValue(tooltip.value)}
        </span>
      </div>
    </div>
  );
};
