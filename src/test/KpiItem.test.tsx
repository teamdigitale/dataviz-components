import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KpiItem from '../components/kpi/KpiItem';
import type { KpiItemType } from '../types';

describe('KpiItem', () => {
  const mockKpiData: KpiItemType = {
    title: 'Test KPI',
    value: '100',
    percentage: '10%',
    value_prefix: '$',
    value_suffix: 'USD',
    show_flow: true,
    flow_value: '5',
    flow_direction: '+',
    flow_detail: 'vs last month',
    footer_text: 'Last updated: today',
  };

  it('should render KPI title', () => {
    render(<KpiItem data={mockKpiData} />);
    expect(screen.getByText('Test KPI')).toBeInTheDocument();
  });

  it('should render KPI value with prefix and suffix', () => {
    render(<KpiItem data={mockKpiData} />);
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('should render percentage when provided', () => {
    render(<KpiItem data={mockKpiData} />);
    expect(screen.getByText('10%')).toBeInTheDocument();
  });

  it('should render flow indicator when show_flow is true', () => {
    render(<KpiItem data={mockKpiData} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('should render footer text when provided', () => {
    render(<KpiItem data={mockKpiData} />);
    expect(screen.getByText('Last updated: today')).toBeInTheDocument();
  });

  it('should render without optional fields', () => {
    const minimalKpi: KpiItemType = {
      title: 'Minimal KPI',
      value: '50',
    };
    render(<KpiItem data={minimalKpi} />);
    expect(screen.getByText('Minimal KPI')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('should handle negative flow direction', () => {
    const negativeFlowKpi: KpiItemType = {
      title: 'Negative Flow',
      value: '75',
      show_flow: true,
      flow_value: '3',
      flow_direction: '-',
    };
    render(<KpiItem data={negativeFlowKpi} />);
    expect(screen.getByText('Negative Flow')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

