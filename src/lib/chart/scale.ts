import type { ChartPadding } from './types';

export interface ScaleResult {
  min: number;
  max: number;
  range: number;
  scaleY: (value: number) => number;
  scaleX: (index: number, total: number) => number;
  gridLines: number[];
  innerWidth: number;
  innerHeight: number;
}

export function createScale(
  values: number[],
  viewWidth: number,
  viewHeight: number,
  padding: ChartPadding
): ScaleResult {
  const innerWidth = viewWidth - padding.left - padding.right;
  const innerHeight = viewHeight - padding.top - padding.bottom;

  let min = Math.min(0, ...values);
  let max = Math.max(0, ...values);

  // Handle edge cases
  if (min === max) {
    min = min - 1;
    max = max + 1;
  }

  const range = max - min;

  // Nice grid lines
  const gridLines = computeGridLines(min, max, 5);

  const scaleY = (value: number): number => {
    return padding.top + innerHeight - ((value - min) / range) * innerHeight;
  };

  const scaleX = (index: number, total: number): number => {
    if (total <= 1) return padding.left + innerWidth / 2;
    return padding.left + index * (innerWidth / (total - 1));
  };

  return { min, max, range, scaleY, scaleX, gridLines, innerWidth, innerHeight };
}

function computeGridLines(min: number, max: number, count: number): number[] {
  const range = max - min;
  const rawStep = range / count;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const residual = rawStep / magnitude;

  let step: number;
  if (residual <= 1.5) step = magnitude;
  else if (residual <= 3.5) step = 2 * magnitude;
  else if (residual <= 7.5) step = 5 * magnitude;
  else step = 10 * magnitude;

  const start = Math.ceil(min / step) * step;
  const lines: number[] = [];
  for (let v = start; v <= max; v += step) {
    lines.push(Math.round(v * 1e10) / 1e10);
  }
  return lines;
}

export function formatValue(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
  if (abs >= 1_000) return (value / 1_000).toFixed(1) + 'k';
  if (Number.isInteger(value)) return value.toString();
  return value.toFixed(1);
}
