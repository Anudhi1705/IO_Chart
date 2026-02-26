import React, { useMemo, useState, useRef } from 'react';
import type { ChartSeriesItem, TooltipState } from '@/lib/chart/types';
import { computePieSlices } from '@/lib/chart/pie-utils';
import { getColor } from '@/lib/chart/color-palette';
import { formatValue } from '@/lib/chart/scale';
import { ChartTooltip } from './ChartTooltip';

const VIEW_SIZE = 360;
const CX = VIEW_SIZE / 2;
const CY = VIEW_SIZE / 2;
const RADIUS = 140;

interface PieChartProps {
  series: ChartSeriesItem[];
}

export const PieChart: React.FC<PieChartProps> = ({ series }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, name: '', value: 0, color: '',
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const colors = series.map((s, i) => getColor(i, s.color));

  const slices = useMemo(
    () => computePieSlices(
      series.map(s => s.name),
      series.map(s => s.value),
      colors,
      CX, CY, RADIUS
    ),
    [series, colors]
  );

  const handleSliceHover = (index: number) => {
    const slice = slices[index];
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (!svgRect) return;
    const scaleRatio = svgRect.width / VIEW_SIZE;

    setTooltip({
      visible: true,
      x: slice.centroidX * scaleRatio,
      y: slice.centroidY * scaleRatio,
      name: slice.name,
      value: slice.value,
      color: slice.color,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setTooltip(t => ({ ...t, visible: false }));
    setHoveredIndex(null);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <ChartTooltip tooltip={tooltip} containerRef={svgRef} />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
        className="w-full h-auto"
        role="img"
        aria-label="Pie chart"
        onMouseLeave={handleMouseLeave}
      >
        {slices.map((slice, i) => {
          const isHovered = hoveredIndex === i;
          const midAngle = (slice.startAngle + slice.endAngle) / 2;
          const expandDist = isHovered ? 8 : 0;
          const tx = expandDist * Math.cos(midAngle);
          const ty = expandDist * Math.sin(midAngle);

          return (
            <path
              key={i}
              d={slice.path}
              fill={slice.color}
              stroke="hsl(var(--chart-surface))"
              strokeWidth="2"
              opacity={hoveredIndex === null || isHovered ? 1 : 0.5}
              className="cursor-pointer transition-all duration-200"
              style={{
                transform: `translate(${tx}px, ${ty}px)`,
                filter: isHovered ? 'brightness(1.15)' : 'none',
              }}
              onMouseEnter={() => handleSliceHover(i)}
              tabIndex={0}
              onFocus={() => handleSliceHover(i)}
            />
          );
        })}

        {/* Percentage labels */}
        {slices.map((slice, i) => {
          if (slice.percentage < 0.05) return null;
          const midAngle = (slice.startAngle + slice.endAngle) / 2;
          const labelR = RADIUS * 0.72;
          const lx = CX + labelR * Math.cos(midAngle);
          const ly = CY + labelR * Math.sin(midAngle);

          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="hsl(var(--foreground))"
              fontSize="12"
              fontFamily="var(--font-display)"
              fontWeight="600"
              pointerEvents="none"
            >
              {(slice.percentage * 100).toFixed(0)}%
            </text>
          );
        })}
      </svg>
    </div>
  );
};
