import React from 'react';

interface LegendItem {
  name: string;
  color: string;
}

interface ChartLegendProps {
  items: LegendItem[];
}

export const ChartLegend: React.FC<ChartLegendProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-muted-foreground font-body">{item.name}</span>
        </div>
      ))}
    </div>
  );
};
