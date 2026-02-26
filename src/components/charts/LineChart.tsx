import React, { useMemo, useState, useRef } from 'react';
import type { ChartSeriesItem, TooltipState, LinePointData } from '@/lib/chart/types';
import { createScale, formatValue } from '@/lib/chart/scale';
import { getColor } from '@/lib/chart/color-palette';
import { getGridLineY, getXAxisLabels, getYAxisLabels } from '@/lib/chart/axis-utils';
import { ChartTooltip } from './ChartTooltip';

const PADDING = { top: 30, right: 30, bottom: 40, left: 60 };
const VIEW_W = 600;
const VIEW_H = 360;

interface LineChartProps {
  series: ChartSeriesItem[];
}

export const LineChart: React.FC<LineChartProps> = ({ series }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, name: '', value: 0, color: '',
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const values = series.map(s => s.value);
  const scale = useMemo(() => createScale(values, VIEW_W, VIEW_H, PADDING), [values]);

  const points: LinePointData[] = useMemo(() => {
    return series.map((item, i) => ({
      x: scale.scaleX(i, series.length),
      y: scale.scaleY(item.value),
      color: getColor(i, item.color),
      name: item.name,
      value: item.value,
      index: i,
    }));
  }, [series, scale]);

  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');

  const axisConfig = { padding: PADDING, viewWidth: VIEW_W, viewHeight: VIEW_H, scale, labels: series.map(s => s.name) };
  const gridLines = getGridLineY(axisConfig);
  const xLabels = getXAxisLabels(axisConfig);
  const yLabels = getYAxisLabels(axisConfig);

  const lineLength = useMemo(() => {
    let len = 0;
    for (let i = 1; i < points.length; i++) {
      len += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    }
    return len;
  }, [points]);

  const handlePointHover = (point: LinePointData, e: React.MouseEvent) => {
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (!svgRect) return;
    const scaleRatio = svgRect.width / VIEW_W;
    setTooltip({
      visible: true,
      x: point.x * scaleRatio,
      y: point.y * scaleRatio,
      name: point.name,
      value: point.value,
      color: point.color,
    });
    setHoveredIndex(point.index);
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
        aria-label="Line chart"
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

        {/* Y axis labels */}
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

        {/* X axis labels */}
        <g>
          {xLabels.map((xl, i) => (
            <text
              key={i}
              x={xl.x}
              y={xl.y}
              textAnchor="middle"
              fill="hsl(var(--chart-label))"
              fontSize="10"
              fontFamily="var(--font-display)"
            >
              {xl.label.length > 8 ? xl.label.slice(0, 7) + '…' : xl.label}
            </text>
          ))}
        </g>

        {/* Line */}
        {points.length > 1 && (
          <polyline
            points={polyline}
            fill="none"
            stroke="hsl(var(--chart-1))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={lineLength}
            strokeDashoffset={lineLength}
            style={{
              '--line-length': lineLength,
              animation: `chart-draw-line 1.2s ease-out forwards`,
            } as React.CSSProperties}
          />
        )}

        {/* Area fill */}
        {points.length > 1 && (
          <polygon
            points={`${points[0].x},${scale.scaleY(scale.min)} ${polyline} ${points[points.length - 1].x},${scale.scaleY(scale.min)}`}
            fill="hsl(var(--chart-1))"
            opacity="0.08"
            className="animate-chart-fade"
          />
        )}

        {/* Points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={hoveredIndex === i ? 6 : 4}
            fill={hoveredIndex === i ? point.color : 'hsl(var(--chart-surface))'}
            stroke={point.color}
            strokeWidth="2.5"
            className="animate-chart-point cursor-pointer transition-all duration-150"
            style={{ animationDelay: `${0.8 + i * 0.08}s`, opacity: 0 }}
            onMouseEnter={(e) => handlePointHover(point, e)}
            tabIndex={0}
            onFocus={(e) => handlePointHover(point, e as any)}
          />
        ))}
      </svg>
    </div>
  );
};
