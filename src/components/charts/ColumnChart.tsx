import React, { useMemo, useState, useRef } from 'react';
import type { ChartSeriesItem, TooltipState, BarData } from '@/lib/chart/types';
import { createScale, formatValue } from '@/lib/chart/scale';
import { getColor } from '@/lib/chart/color-palette';
import { getGridLineY, getYAxisLabels } from '@/lib/chart/axis-utils';
import { ChartTooltip } from './ChartTooltip';

const PADDING = { top: 30, right: 30, bottom: 40, left: 60 };
const VIEW_W = 600;
const VIEW_H = 360;

interface ColumnChartProps {
  series: ChartSeriesItem[];
}

export const ColumnChart: React.FC<ColumnChartProps> = ({ series }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, name: '', value: 0, color: '',
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const values = series.map(s => s.value);
  const scale = useMemo(() => createScale(values, VIEW_W, VIEW_H, PADDING), [values]);

  const barGap = 8;
  const totalBarSpace = scale.innerWidth - barGap * (series.length - 1);
  const barWidth = Math.min(50, Math.max(12, totalBarSpace / series.length));

  const totalBarsWidth = series.length * barWidth + (series.length - 1) * barGap;
  const startX = PADDING.left + (scale.innerWidth - totalBarsWidth) / 2;

  const zeroY = scale.scaleY(0);

  const bars: BarData[] = useMemo(() => {
    return series.map((item, i) => {
      const valueY = scale.scaleY(item.value);
      const y = item.value >= 0 ? valueY : zeroY;
      const h = Math.abs(valueY - zeroY);

      return {
        x: startX + i * (barWidth + barGap),
        y,
        width: barWidth,
        height: h,
        color: getColor(i, item.color),
        name: item.name,
        value: item.value,
        index: i,
      };
    });
  }, [series, scale, barWidth, startX, zeroY]);

  const axisConfig = { padding: PADDING, viewWidth: VIEW_W, viewHeight: VIEW_H, scale, labels: series.map(s => s.name) };
  const gridLines = getGridLineY(axisConfig);
  const yLabels = getYAxisLabels(axisConfig);

  const handleBarHover = (bar: BarData) => {
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (!svgRect) return;
    const scaleRatio = svgRect.width / VIEW_W;
    setTooltip({
      visible: true,
      x: (bar.x + bar.width / 2) * scaleRatio,
      y: bar.y * scaleRatio,
      name: bar.name,
      value: bar.value,
      color: bar.color,
    });
    setHoveredIndex(bar.index);
  };

  const handleMouseLeave = () => {
    setTooltip(t => ({ ...t, visible: false }));
    setHoveredIndex(null);
  };

  return (
    <div className="relative w-full">
      <ChartTooltip tooltip={tooltip} containerRef={svgRef} />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Column chart"
        onMouseLeave={handleMouseLeave}
      >
        {/* Grid */}
        <g className="animate-chart-fade">
          {gridLines.map((gl, i) => (
            <line
              key={i}
              x1={gl.x1} y1={gl.y} x2={gl.x2} y2={gl.y}
              stroke="hsl(var(--chart-grid))"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}
        </g>

        {/* Y labels */}
        <g>
          {yLabels.map((yl, i) => (
            <text
              key={i}
              x={yl.x}
              y={yl.y}
              textAnchor="end"
              dominantBaseline="middle"
              fill="hsl(var(--chart-label))"
              fontSize="11"
              fontFamily="var(--font-display)"
            >
              {formatValue(yl.value)}
            </text>
          ))}
        </g>

        {/* Zero line */}
        <line
          x1={PADDING.left}
          y1={zeroY}
          x2={PADDING.left + scale.innerWidth}
          y2={zeroY}
          stroke="hsl(var(--chart-axis))"
          strokeWidth="1"
        />

        {/* Bars */}
        {bars.map((bar, i) => (
          <g key={i}>
            <rect
              x={bar.x}
              y={bar.value >= 0 ? bar.y : zeroY}
              width={bar.width}
              height={bar.height}
              rx={3}
              fill={bar.color}
              opacity={hoveredIndex === null || hoveredIndex === i ? 1 : 0.4}
              className="cursor-pointer transition-all duration-200"
              style={{
                transformOrigin: `${bar.x + bar.width / 2}px ${zeroY}px`,
                animation: `chart-grow-bar 0.6s ease-out ${i * 0.08}s forwards`,
                transform: 'scaleY(0)',
              }}
              onMouseEnter={() => handleBarHover(bar)}
              tabIndex={0}
              onFocus={() => handleBarHover(bar)}
            />
            {/* Value label on top */}
            <text
              x={bar.x + bar.width / 2}
              y={bar.y - 8}
              textAnchor="middle"
              fill="hsl(var(--chart-label))"
              fontSize="10"
              fontFamily="var(--font-display)"
              className="animate-chart-fade"
              style={{ animationDelay: `${0.6 + i * 0.08}s`, opacity: 0 }}
            >
              {formatValue(bar.value)}
            </text>
            {/* X label */}
            <text
              x={bar.x + bar.width / 2}
              y={PADDING.top + scale.innerHeight + 20}
              textAnchor="middle"
              fill="hsl(var(--chart-label))"
              fontSize="10"
              fontFamily="var(--font-display)"
            >
              {bar.name.length > 6 ? bar.name.slice(0, 5) + '…' : bar.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
