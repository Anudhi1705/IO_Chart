const PALETTE = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
];

export function getColor(index: number, customColor?: string): string {
  if (customColor) return customColor;
  return PALETTE[index % PALETTE.length];
}

export { PALETTE };
