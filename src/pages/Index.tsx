import { Link } from 'react-router-dom';
import { IoChart } from '@/components/charts';
import type { ChartOptions } from '@/lib/chart/types';

const lineData: ChartOptions = {
  type: 'line',
  title: 'Monthly Revenue',
  series: [
    { name: 'Jan', value: 4200 },
    { name: 'Feb', value: 5800 },
    { name: 'Mar', value: 3100 },
    { name: 'Apr', value: 7400 },
    { name: 'May', value: 6200 },
    { name: 'Jun', value: 8900 },
    { name: 'Jul', value: 7600 },
  ],
};

const columnData: ChartOptions = {
  type: 'column',
  title: 'Sales by Region',
  series: [
    { name: 'APAC', value: 12400 },
    { name: 'EMEA', value: 8700 },
    { name: 'LATAM', value: 5200 },
    { name: 'NA', value: 15600 },
    { name: 'ANZ', value: 3100 },
  ],
};

const pieData: ChartOptions = {
  type: 'pie',
  title: 'Market Share',
  series: [
    { name: 'Product A', value: 35 },
    { name: 'Product B', value: 25 },
    { name: 'Product C', value: 20 },
    { name: 'Product D', value: 12 },
    { name: 'Other', value: 8 },
  ],
};

const edgeCaseEmpty: ChartOptions = {
  type: 'column',
  title: 'Empty Dataset',
  series: [],
};

const edgeCaseNegative: ChartOptions = {
  type: 'column',
  title: 'Profit / Loss',
  series: [
    { name: 'Q1', value: 4500 },
    { name: 'Q2', value: -2100 },
    { name: 'Q3', value: 6800 },
    { name: 'Q4', value: -800 },
  ],
};

const edgeCaseSingle: ChartOptions = {
  type: 'line',
  title: 'Single Observation',
  series: [{ name: 'Today', value: 42 }],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-8">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-16 text-center">
        <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">
          Component Library
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
          io-chart
        </h1>
        <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          A lightweight, dependency-free charting component built with pure SVG.
          Supports line, column, and pie chart types with tooltips, legends, and smooth animations.
        </p>
        <Link
          to="/docs"
          className="inline-flex items-center gap-2 font-display text-sm text-primary hover:text-primary/80 tracking-wider uppercase transition-colors"
        >
          View Documentation →
        </Link>
      </header>

      {/* Main charts */}
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Line + Column row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IoChart chartOptions={lineData} />
          <IoChart chartOptions={columnData} />
        </div>

        {/* Pie centered */}
        <div className="max-w-md mx-auto">
          <IoChart chartOptions={pieData} />
        </div>

        {/* Edge cases section */}
        <div className="pt-8 border-t border-border">
          <h2 className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 text-center">
            Edge Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <IoChart chartOptions={edgeCaseEmpty} />
            <IoChart chartOptions={edgeCaseNegative} />
            <IoChart chartOptions={edgeCaseSingle} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto mt-16 pt-8 border-t border-border text-center">
        <p className="text-muted-foreground font-display text-xs tracking-wider">
          Pure SVG · No dependencies · TypeScript · Responsive · Accessible
        </p>
      </footer>
    </div>
  );
};

export default Index;
