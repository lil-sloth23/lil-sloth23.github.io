import React from 'react';

type YearSelectorProps = {
  years: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
};

const YearSelector: React.FC<YearSelectorProps> = ({ years, selectedYear, onSelectYear }) => {
  return (
    <div style={{ margin: '1rem 0' }}>
      <h2>Select your year:</h2>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelectYear(year)}
            style={{
              padding: '0.5rem 1rem',
              background: year === selectedYear ? '#007bff' : '#eee',
              color: year === selectedYear ? '#fff' : '#222',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearSelector; 