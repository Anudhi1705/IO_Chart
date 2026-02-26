import React from 'react';
import type { ChartOptions } from '@/lib/chart/types';
import { getColor } from '@/lib/chart/color-palette';
import { LineChart } from './LineChart';
import { ColumnChart } from './ColumnChart';
import { PieChart } from './PieChart';
import { ChartLegend } from './ChartLegend';

interface IoChartProps {
  chartOptions: ChartOptions;
}

export const IoChart: React.FC<IoChartProps> = ({ chartOptions }) => {
  const { type, title, series } = chartOptions;

  // Validation
  if (!series || series.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-card border border-border p-12">
        <p className="text-muted-foreground font-display text-sm tracking-wide">
          No data to display
        </p>
      </div>
    );
  }

  const validSeries = series.filter(
    s => s && typeof s.value === 'number' && !isNaN(s.value)
  );

  if (validSeries.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-card border border-border p-12">
        <p className="text-muted-foreground font-display text-sm tracking-wide">
          Invalid data provided
        </p>
      </div>
    );
  }

  const legendItems = validSeries.map((s, i) => ({
    name: s.name,
    color: getColor(i, s.color),
  }));

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <LineChart series={validSeries} />;
      case 'column':
        return <ColumnChart series={validSeries} />;
      case 'pie':
        return <PieChart series={validSeries} />;
      default:
        return (
          <p className="text-destructive font-display text-sm p-8 text-center">
            Unknown chart type: "{type}"
          </p>
        );
    }
  };

  return (
    <div className="rounded-xl bg-card border border-border p-5 md:p-6">
      {title && (
        <h3 className="text-center font-display text-sm font-semibold tracking-wider uppercase text-foreground mb-4">
          {title}
        </h3>
      )}
      {renderChart()}
      <ChartLegend items={legendItems} />
    </div>
  );
};
