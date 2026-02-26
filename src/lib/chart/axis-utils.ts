import type { ChartPadding } from './types';
import type { ScaleResult } from './scale';

export interface AxisConfig {
  padding: ChartPadding;
  viewWidth: number;
  viewHeight: number;
  scale: ScaleResult;
  labels: string[];
}

export function getXAxisLabels(config: AxisConfig) {
  const { padding, scale, labels } = config;
  const total = labels.length;
  return labels.map((label, i) => ({
    x: scale.scaleX(i, total),
    y: padding.top + scale.innerHeight + 24,
    label,
  }));
}

export function getYAxisLabels(config: AxisConfig) {
  const { padding, scale } = config;
  return scale.gridLines.map(value => ({
    x: padding.left - 10,
    y: scale.scaleY(value),
    value,
  }));
}

export function getGridLineY(config: AxisConfig) {
  const { padding, scale } = config;
  return scale.gridLines.map(value => ({
    y: scale.scaleY(value),
    x1: padding.left,
    x2: padding.left + scale.innerWidth,
    value,
  }));
}

export function getZeroLineY(config: AxisConfig): number | null {
  const { scale } = config;
  if (scale.min < 0 && scale.max > 0) {
    return scale.scaleY(0);
  }
  return null;
}
