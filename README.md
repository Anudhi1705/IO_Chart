# 📊 IO Chart — Custom Angular SVG Chart Component

> A reusable, lightweight, dependency-free Angular chart component that dynamically renders **Line**, **Column**, and **Pie** charts using pure SVG and TypeScript.

Built for performance, clarity, accessibility, and clean frontend architecture.

---

## 🚀 Project Overview

`io-chart` is a configurable Angular component designed to render different chart types based on a single input configuration object.

The goal of this project is to demonstrate:

* Strong Angular fundamentals
* SVG rendering mechanics
* Geometry and scaling mathematics
* Clean component architecture
* Reusability and maintainability
* Responsive and accessible UI design

No external chart libraries were used.

---

## 🧠 Why This Project Matters

Most chart libraries abstract away internal logic.
This component builds everything from scratch:

* Custom scaling algorithms
* Coordinate calculations
* SVG path generation
* Responsive layout logic
* Interaction handling
* Animation management

It demonstrates deep frontend engineering skills.

---

## ✨ Features

### 📈 Supported Chart Types

* Line Chart (Connected data points with axes)
* Column Chart (Vertical bars)
* Pie Chart (Circular segmented visualization)

### 🎨 UI Features

* Dynamic chart title
* Legend support
* Hover tooltips
* Smooth animations
* Clean and centered layout
* Fully responsive SVG scaling

### ♿ Accessibility

* ARIA roles
* Keyboard focus support
* Screen reader friendly structure

---

## 🏗️ Architecture Overview

The component follows a layered rendering pipeline:

1. Input Validation Layer
2. Data Normalization Layer
3. Geometry Calculation Layer
4. SVG Rendering Layer
5. Interaction Layer
6. Animation Layer

Each layer is isolated to maintain separation of concerns.

---

## 📂 Project Structure

```
src/
 └── app/
      └── chart/
           ├── chart.component.ts
           ├── chart.component.html
           ├── chart.component.scss
           ├── chart.model.ts
           ├── helpers/
           │     ├── scale.ts
           │     ├── axis-utils.ts
           │     ├── pie-utils.ts
           │     └── math-utils.ts
           └── chart.component.spec.ts
```

---

## ⚙️ Component API

### Input

```
interface ChartOptions {
  type: 'line' | 'column' | 'pie';
  title?: string;
  series: {
    name: string;
    value: number;
    color?: string;
  }[];
}
```

### Usage

```
<io-chart [chartOptions]="options"></io-chart>
```

---

## 📐 Core Rendering Logic

### Scaling Formula (Linear Interpolation)

```
scaledY = paddingTop + innerHeight - 
          ((value - min) / (max - min)) * innerHeight
```

### Pie Angle Calculation

```
angle = (value / total) * 2π
```

### Polar to Cartesian Conversion

```
x = cx + r * cos(angle)
y = cy + r * sin(angle)
```

---

## 📱 Responsiveness Strategy

* SVG `viewBox` scaling
* Flexible container width
* Aspect ratio preservation
* ResizeObserver integration
* Dynamic legend repositioning

---

## 🛡️ Edge Case Handling

* Empty data sets
* Single data points
* Equal values
* Large numeric ranges
* Negative values (line/column)
* Invalid input handling

---

## 🎬 Animation Strategy

* CSS transitions
* SVG stroke-dasharray
* Transform-based scaling
* Data-change triggered animations

---

## 🧪 Testing Strategy

* Unit tests for geometry helpers
* Boundary condition validation
* Rendering checks
* Accessibility validation

---

## 🔮 Future Improvements

* Area charts
* Donut charts
* Stacked columns
* Dark mode support
* Real-time data updates

---

## 📜 License

MIT License — Free to use, modify, and distribute.

---

## 👩‍💻 Author
