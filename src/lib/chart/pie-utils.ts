import type { PieSlice } from './types';

export function computePieSlices(
  names: string[],
  values: number[],
  colors: string[],
  cx: number,
  cy: number,
  radius: number
): PieSlice[] {
  const sanitized = values.map(v => (v < 0 ? 0 : v));
  const total = sanitized.reduce((a, b) => a + b, 0);

  if (total === 0) return [];

  const slices: PieSlice[] = [];
  let currentAngle = -Math.PI / 2; // start from top

  for (let i = 0; i < sanitized.length; i++) {
    const percentage = sanitized[i] / total;
    const sliceAngle = percentage * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const midAngle = startAngle + sliceAngle / 2;
    const centroidX = cx + (radius * 0.6) * Math.cos(midAngle);
    const centroidY = cy + (radius * 0.6) * Math.sin(midAngle);

    const path = describeArc(cx, cy, radius, startAngle, endAngle);

    slices.push({
      startAngle,
      endAngle,
      percentage,
      color: colors[i],
      name: names[i],
      value: values[i],
      path,
      centroidX,
      centroidY,
    });

    currentAngle = endAngle;
  }

  return slices;
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    'M', cx, cy,
    'L', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
    'Z',
  ].join(' ');
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}
