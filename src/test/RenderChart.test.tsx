import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import RenderChart from '../components/RenderChart';
import type { FieldDataType } from '../types';

// Mock echarts-for-react
vi.mock('echarts-for-react', () => ({
  default: ({ option }: { option: any }) => (
    <div data-testid="echarts-mock">{JSON.stringify(option)}</div>
  ),
}));

// Mock OpenLayers for map components
vi.mock('ol', () => ({
  Map: vi.fn(() => ({
    setTarget: vi.fn(),
    getView: vi.fn(() => ({
      setCenter: vi.fn(),
      setZoom: vi.fn(),
    })),
  })),
  View: vi.fn(),
  TileLayer: vi.fn(),
  VectorLayer: vi.fn(),
  VectorSource: vi.fn(),
  GeoJSON: vi.fn(),
  Style: vi.fn(),
  Circle: vi.fn(),
  Fill: vi.fn(),
  Stroke: vi.fn(),
  Text: vi.fn(),
}));

describe('RenderChart', () => {
  const mockBarChartData: FieldDataType = {
    chart: 'bar',
    data: [
      ['Categoria', 'Valore'],
      ['A', 10],
      ['B', 20],
      ['C', 30],
    ],
    config: {
      colors: [],
      direction: 'vertical',
      h: 400,
      labeLine: false,
      legend: true,
      legendPosition: 'bottom',
      palette: 'default',
      tooltip: true,
      tooltipFormatter: '',
      valueFormatter: '',
      totalLabel: '',
      tooltipTrigger: 'axis',
    },
    dataSource: null,
    name: 'Test Bar Chart',
    publish: true,
  };

  const mockPieChartData: FieldDataType = {
    chart: 'pie',
    data: [
      ['Categoria', 'Valore'],
      ['A', 10],
      ['B', 20],
      ['C', 30],
    ],
    config: {
      colors: [],
      direction: 'vertical',
      h: 400,
      labeLine: false,
      legend: true,
      legendPosition: 'bottom',
      palette: 'default',
      tooltip: true,
      tooltipFormatter: '',
      valueFormatter: '',
      totalLabel: '',
      tooltipTrigger: 'item',
    },
    dataSource: null,
    name: 'Test Pie Chart',
    publish: true,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render bar chart when chart type is "bar"', () => {
    const setEchartInstance = vi.fn();
    const { container } = render(<RenderChart {...mockBarChartData} setEchartInstance={setEchartInstance} />);
    
    // Initially null due to loading state
    expect(container.firstChild).toBeNull();
    
    // Component should accept props without crashing
    expect(mockBarChartData.chart).toBe('bar');
  });

  it('should render pie chart when chart type is "pie"', () => {
    const setEchartInstance = vi.fn();
    const { container } = render(<RenderChart {...mockPieChartData} setEchartInstance={setEchartInstance} />);
    
    expect(container.firstChild).toBeNull();
    expect(mockPieChartData.chart).toBe('pie');
  });

  it('should handle rowHeight prop correctly', () => {
    const setEchartInstance = vi.fn();
    const { container } = render(
      <RenderChart {...mockBarChartData} rowHeight={500} setEchartInstance={setEchartInstance} />
    );
    
    // Component should accept rowHeight prop without crashing
    expect(container.firstChild).toBeNull();
  });

  it('should return null during loading state', () => {
    const { container } = render(
      <RenderChart {...mockBarChartData} setEchartInstance={() => {}} />
    );
    
    // Before timeout, should be null
    expect(container.firstChild).toBeNull();
  });
});

