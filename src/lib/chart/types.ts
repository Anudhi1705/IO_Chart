export interface ChartSeriesItem {
  name: string;
  value: number;
  color?: string;
}

export interface ChartOptions {
  type: 'line' | 'column' | 'pie';
  title?: string;
  series: ChartSeriesItem[];
}

export interface ChartPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  name: string;
  value: number;
  color: string;
}

export interface PieSlice {
  startAngle: number;
  endAngle: number;
  percentage: number;
  color: string;
  name: string;
  value: number;
  path: string;
  centroidX: number;
  centroidY: number;
}

export interface BarData {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  name: string;
  value: number;
  index: number;
}

export interface LinePointData {
  x: number;
  y: number;
  color: string;
  name: string;
  value: number;
  index: number;
}
