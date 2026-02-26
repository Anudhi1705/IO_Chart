import React, { useState } from 'react';
import { IoChart } from '@/components/charts';
import type { ChartOptions } from '@/components/charts';
import { NavLink } from '@/components/NavLink';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'install', label: 'Installation' },
  { id: 'api', label: 'API Reference' },
  { id: 'examples', label: 'Examples' },
  { id: 'theming', label: 'Theming' },
  { id: 'utilities', label: 'Utilities' },
  { id: 'edge-cases', label: 'Edge Cases' },
];

const CodeBlock: React.FC<{ children: string; title?: string }> = ({ children, title }) => (
  <div className="rounded-lg border border-border overflow-hidden my-4">
    {title && (
      <div className="bg-secondary px-4 py-2 border-b border-border">
        <span className="font-display text-xs text-muted-foreground tracking-wider">{title}</span>
      </div>
    )}
    <pre className="bg-card p-4 overflow-x-auto text-sm leading-relaxed">
      <code className="font-display text-secondary-foreground">{children}</code>
    </pre>
  </div>
);

const SectionHeading: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <h2
    id={id}
    className="font-display text-2xl font-bold text-foreground tracking-tight mt-16 mb-6 pt-4 border-t border-border"
  >
    {children}
  </h2>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="font-display text-lg font-semibold text-foreground tracking-tight mt-8 mb-3">
    {children}
  </h3>
);

const PropRow: React.FC<{ name: string; type: string; required?: boolean; desc: string }> = ({
  name, type, required, desc,
}) => (
  <tr className="border-b border-border">
    <td className="py-3 pr-4 font-display text-sm text-primary font-semibold">{name}</td>
    <td className="py-3 pr-4 font-display text-xs text-accent">{type}</td>
    <td className="py-3 pr-4 text-xs">
      {required ? (
        <span className="text-destructive font-semibold">required</span>
      ) : (
        <span className="text-muted-foreground">optional</span>
      )}
    </td>
    <td className="py-3 text-sm text-muted-foreground">{desc}</td>
  </tr>
);

// Example data
const lineExample: ChartOptions = {
  type: 'line',
  title: 'Monthly Revenue',
  series: [
    { name: 'Jan', value: 4200 },
    { name: 'Feb', value: 5800 },
    { name: 'Mar', value: 3100 },
    { name: 'Apr', value: 7400 },
    { name: 'May', value: 6200 },
    { name: 'Jun', value: 8900 },
  ],
};

const columnExample: ChartOptions = {
  type: 'column',
  title: 'Sales by Region',
  series: [
    { name: 'APAC', value: 12400 },
    { name: 'EMEA', value: 8700 },
    { name: 'LATAM', value: 5200 },
    { name: 'NA', value: 15600 },
  ],
};

const pieExample: ChartOptions = {
  type: 'pie',
  title: 'Market Share',
  series: [
    { name: 'Product A', value: 35 },
    { name: 'Product B', value: 25 },
    { name: 'Product C', value: 20 },
    { name: 'Other', value: 20 },
  ],
};

const Docs = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
          <a href="/" className="font-display text-lg font-bold text-foreground tracking-tight hover:text-primary transition-colors">
            io-chart
          </a>
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider uppercase">
              Demo
            </a>
            <span className="font-display text-xs text-primary tracking-wider uppercase">
              Docs
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-8 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-52 shrink-0 pt-8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <nav className="space-y-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`block w-full text-left px-3 py-2 rounded-md font-display text-xs tracking-wider transition-colors ${
                  activeSection === s.id
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 py-8 pb-24">
          {/* Hero */}
          <section id="overview">
            <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3">
              Documentation
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              io-chart
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl leading-relaxed mb-6">
              A lightweight, dependency-free React charting component built with pure SVG.
              Supports line, column, and pie charts with tooltips, legends, smooth animations,
              and full keyboard accessibility.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Bundle Size', value: '~8 KB' },
                { label: 'Dependencies', value: '0' },
                { label: 'Chart Types', value: '3' },
                { label: 'Rendering', value: 'Pure SVG' },
              ].map(stat => (
                <div key={stat.label} className="rounded-lg bg-card border border-border p-4 text-center">
                  <div className="font-display text-xl font-bold text-primary">{stat.value}</div>
                  <div className="font-display text-xs text-muted-foreground tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Installation */}
          <SectionHeading id="install">Installation</SectionHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Copy the chart components into your project. The package is self-contained — no external
            chart libraries required.
          </p>

          <SubHeading>Required files</SubHeading>
          <CodeBlock title="File structure">
{`src/
├── components/charts/
│   ├── index.ts          # Barrel exports
│   ├── IoChart.tsx        # Main wrapper component
│   ├── LineChart.tsx      # Line chart renderer
│   ├── ColumnChart.tsx    # Column/bar chart renderer
│   ├── PieChart.tsx       # Pie chart renderer
│   ├── ChartTooltip.tsx   # Tooltip overlay
│   └── ChartLegend.tsx    # Legend component
└── lib/chart/
    ├── types.ts           # TypeScript interfaces
    ├── color-palette.ts   # Default color palette
    ├── scale.ts           # Linear scaling & formatting
    ├── pie-utils.ts       # Arc geometry calculations
    └── axis-utils.ts      # Axis & grid helpers`}
          </CodeBlock>

          <SubHeading>CSS requirements</SubHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-2">
            Add these CSS custom properties and keyframe animations to your global stylesheet:
          </p>
          <CodeBlock title="index.css (chart tokens)">
{`:root {
  --chart-1: 38 92% 55%;
  --chart-2: 174 55% 45%;
  --chart-3: 350 65% 60%;
  --chart-4: 262 50% 60%;
  --chart-5: 160 50% 50%;
  --chart-6: 25 80% 55%;

  --chart-grid: 220 15% 20%;
  --chart-axis: 220 10% 35%;
  --chart-label: 220 10% 50%;
  --chart-surface: 220 18% 10%;
  --chart-tooltip-bg: 220 20% 14%;
  --chart-tooltip-border: 220 15% 22%;
}

@keyframes chart-draw-line {
  from { stroke-dashoffset: var(--line-length, 2000); }
  to   { stroke-dashoffset: 0; }
}
@keyframes chart-grow-bar {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
@keyframes chart-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes chart-point-pop {
  0%   { transform: scale(0); opacity: 0; }
  70%  { transform: scale(1.3); }
  100% { transform: scale(1); opacity: 1; }
}`}
          </CodeBlock>

          {/* API Reference */}
          <SectionHeading id="api">API Reference</SectionHeading>

          <SubHeading>{'<IoChart />'}</SubHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            The main component. Pass a single <code className="font-display text-primary text-sm">chartOptions</code> prop
            to configure the chart type, title, and data.
          </p>

          <CodeBlock title="Basic usage">
{`import { IoChart } from '@/components/charts';

<IoChart chartOptions={{
  type: 'line',
  title: 'Revenue Trend',
  series: [
    { name: 'Jan', value: 4200 },
    { name: 'Feb', value: 5800 },
    { name: 'Mar', value: 3100 },
  ],
}} />`}
          </CodeBlock>

          <SubHeading>ChartOptions</SubHeading>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-display text-xs text-muted-foreground tracking-wider">PROP</th>
                  <th className="py-2 pr-4 font-display text-xs text-muted-foreground tracking-wider">TYPE</th>
                  <th className="py-2 pr-4 font-display text-xs text-muted-foreground tracking-wider">STATUS</th>
                  <th className="py-2 font-display text-xs text-muted-foreground tracking-wider">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                <PropRow name="type" type="'line' | 'column' | 'pie'" required desc="Determines which chart renderer to use" />
                <PropRow name="title" type="string" desc="Optional title displayed above the chart" />
                <PropRow name="series" type="ChartSeriesItem[]" required desc="Array of data points to plot" />
              </tbody>
            </table>
          </div>

          <SubHeading>ChartSeriesItem</SubHeading>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-display text-xs text-muted-foreground tracking-wider">PROP</th>
                  <th className="py-2 pr-4 font-display text-xs text-muted-foreground tracking-wider">TYPE</th>
                  <th className="py-2 pr-4 font-display text-xs text-muted-foreground tracking-wider">STATUS</th>
                  <th className="py-2 font-display text-xs text-muted-foreground tracking-wider">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                <PropRow name="name" type="string" required desc="Label for this data point (axis label, legend)" />
                <PropRow name="value" type="number" required desc="Numeric value to plot" />
                <PropRow name="color" type="string" desc="Custom color (CSS). Falls back to built-in palette" />
              </tbody>
            </table>
          </div>

          {/* Examples */}
          <SectionHeading id="examples">Examples</SectionHeading>

          <SubHeading>Line Chart</SubHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Renders connected data points with an area fill. Supports hover tooltips on each point,
            animated line drawing, and compact number formatting.
          </p>
          <div className="max-w-lg">
            <IoChart chartOptions={lineExample} />
          </div>
          <CodeBlock title="Line chart code">
{`const data: ChartOptions = {
  type: 'line',
  title: 'Monthly Revenue',
  series: [
    { name: 'Jan', value: 4200 },
    { name: 'Feb', value: 5800 },
    { name: 'Mar', value: 3100 },
    { name: 'Apr', value: 7400 },
    { name: 'May', value: 6200 },
    { name: 'Jun', value: 8900 },
  ],
};

<IoChart chartOptions={data} />`}
          </CodeBlock>

          <SubHeading>Column Chart</SubHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Vertical bars with animated growth, value labels, and zero-baseline support for negative values.
          </p>
          <div className="max-w-lg">
            <IoChart chartOptions={columnExample} />
          </div>
          <CodeBlock title="Column chart code">
{`const data: ChartOptions = {
  type: 'column',
  title: 'Sales by Region',
  series: [
    { name: 'APAC', value: 12400 },
    { name: 'EMEA', value: 8700 },
    { name: 'LATAM', value: 5200 },
    { name: 'NA', value: 15600 },
  ],
};

<IoChart chartOptions={data} />`}
          </CodeBlock>

          <SubHeading>Pie Chart</SubHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Arc-based slices with percentage labels, hover expansion, and centroid-anchored tooltips.
          </p>
          <div className="max-w-xs mx-auto">
            <IoChart chartOptions={pieExample} />
          </div>
          <CodeBlock title="Pie chart code">
{`const data: ChartOptions = {
  type: 'pie',
  title: 'Market Share',
  series: [
    { name: 'Product A', value: 35 },
    { name: 'Product B', value: 25 },
    { name: 'Product C', value: 20 },
    { name: 'Other', value: 20 },
  ],
};

<IoChart chartOptions={data} />`}
          </CodeBlock>

          {/* Theming */}
          <SectionHeading id="theming">Theming</SectionHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            io-chart uses CSS custom properties for all colors, making it fully themeable.
            Override the <code className="font-display text-primary text-sm">--chart-*</code> tokens
            in your stylesheet to match your design system.
          </p>

          <SubHeading>Color palette</SubHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            The default palette uses 6 colors assigned in order. Each series item gets the next color
            unless a custom <code className="font-display text-primary text-sm">color</code> is provided.
          </p>

          <div className="flex flex-wrap gap-3 my-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-md border border-border"
                  style={{ backgroundColor: `hsl(var(--chart-${i}))` }}
                />
                <span className="font-display text-xs text-muted-foreground">--chart-{i}</span>
              </div>
            ))}
          </div>

          <SubHeading>Custom colors per item</SubHeading>
          <CodeBlock title="Per-item color override">
{`series: [
  { name: 'Success', value: 80, color: 'hsl(142, 70%, 45%)' },
  { name: 'Warning', value: 15, color: 'hsl(38, 92%, 55%)' },
  { name: 'Error',   value: 5,  color: 'hsl(0, 72%, 55%)' },
]`}
          </CodeBlock>

          {/* Utilities */}
          <SectionHeading id="utilities">Utilities</SectionHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            The geometry and scaling logic is exported as pure functions for reuse or unit testing.
          </p>

          <SubHeading>createScale(values, width, height, padding)</SubHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-2">
            Computes linear scaling functions and grid lines for a set of numeric values.
          </p>
          <CodeBlock title="Scale utility">
{`import { createScale } from '@/components/charts';

const scale = createScale(
  [100, 200, 350, 150],  // values
  600,                    // viewBox width
  360,                    // viewBox height
  { top: 30, right: 30, bottom: 40, left: 60 }
);

scale.scaleY(200);     // → pixel Y coordinate
scale.scaleX(1, 4);    // → pixel X coordinate for index 1 of 4
scale.gridLines;       // → [0, 100, 200, 300, 400]`}
          </CodeBlock>

          <SubHeading>formatValue(n)</SubHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-2">
            Compact number formatting: 1500 → "1.5k", 2000000 → "2.0M".
          </p>

          <SubHeading>computePieSlices(names, values, colors, cx, cy, r)</SubHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-2">
            Returns an array of <code className="font-display text-primary text-sm">PieSlice</code> objects
            with SVG path data, angles, and centroid coordinates.
          </p>

          {/* Edge Cases */}
          <SectionHeading id="edge-cases">Edge Cases</SectionHeading>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            IoChart handles these scenarios gracefully:
          </p>

          <div className="space-y-4">
            {[
              { title: 'Empty series', desc: 'Shows "No data to display" placeholder' },
              { title: 'Invalid values', desc: 'Filters non-numeric entries; shows error if all invalid' },
              { title: 'Single data point', desc: 'Line shows centered dot; column/pie render correctly' },
              { title: 'Negative values', desc: 'Column/line use zero baseline with bidirectional scaling' },
              { title: 'Large numbers', desc: 'Auto-formatted with compact notation (k, M)' },
              { title: 'Unknown chart type', desc: 'Displays an error message instead of crashing' },
            ].map(item => (
              <div key={item.title} className="flex gap-3 items-start">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <span className="font-display text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="text-muted-foreground font-body text-sm ml-2">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <IoChart chartOptions={{ type: 'column', title: 'Empty Dataset', series: [] }} />
            <IoChart chartOptions={{
              type: 'column',
              title: 'Negative Values',
              series: [
                { name: 'Q1', value: 4500 },
                { name: 'Q2', value: -2100 },
                { name: 'Q3', value: 6800 },
                { name: 'Q4', value: -800 },
              ],
            }} />
          </div>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground font-display text-xs tracking-wider">
              Pure SVG · Zero Dependencies · TypeScript · Responsive · Accessible · Themeable
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
