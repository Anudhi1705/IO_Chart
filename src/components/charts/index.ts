// io-chart — Barrel exports
// Import everything from this single entry point:
//   import { IoChart } from '@/components/charts';
//   import type { ChartOptions, ChartSeriesItem } from '@/components/charts';

export { IoChart } from './IoChart';
export { LineChart } from './LineChart';
export { ColumnChart } from './ColumnChart';
export { PieChart } from './PieChart';
export { ChartLegend } from './ChartLegend';
export { ChartTooltip } from './ChartTooltip';

// Re-export types
export type {
  ChartOptions,
  ChartSeriesItem,
  ChartPadding,
  TooltipState,
  PieSlice,
  BarData,
  LinePointData,
  Point,
} from '@/lib/chart/types';

// Re-export utilities
export { getColor, PALETTE } from '@/lib/chart/color-palette';
export { createScale, formatValue } from '@/lib/chart/scale';
export type { ScaleResult } from '@/lib/chart/scale';
export { computePieSlices } from '@/lib/chart/pie-utils';
export {
  getXAxisLabels,
  getYAxisLabels,
  getGridLineY,
  getZeroLineY,
} from '@/lib/chart/axis-utils';
export type { AxisConfig } from '@/lib/chart/axis-utils';
