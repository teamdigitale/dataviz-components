import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DataTable from '../components/dataTable/DataTable';

describe('DataTable', () => {
  const mockData = [
    ['Nome', 'Valore', 'Percentuale'],
    ['Item 1', 100, '10%'],
    ['Item 2', 200, '20%'],
    ['Item 3', 300, '30%'],
  ];

  it('should render table with headers', () => {
    render(<DataTable data={mockData} id="test-table" />);
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Valore')).toBeInTheDocument();
    expect(screen.getByText('Percentuale')).toBeInTheDocument();
  });

  it('should render table data rows', () => {
    render(<DataTable data={mockData} id="test-table" />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  it('should handle empty data gracefully', () => {
    render(<DataTable data={[]} id="test-table" />);
    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();
  });

  it('should apply custom number formatting when provided', () => {
    const formatNumber = (value: number) => `$${value.toFixed(2)}`;
    render(
      <DataTable
        data={mockData}
        id="test-table"
        formatNumber={formatNumber}
      />
    );
    // Check if formatted numbers are present (formatNumber formats numbers, not strings)
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
  });
});

