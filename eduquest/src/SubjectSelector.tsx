import React from 'react';

type SubjectSelectorProps = {
  subjects: string[];
  selectedSubject: string | null;
  onSelectSubject: (subject: string) => void;
};

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ subjects, selectedSubject, onSelectSubject }) => {
  return (
    <div style={{ margin: '1rem 0' }}>
      <h2>Select your subject:</h2>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => onSelectSubject(subject)}
            style={{
              padding: '0.5rem 1rem',
              background: subject === selectedSubject ? '#007bff' : '#eee',
              color: subject === selectedSubject ? '#fff' : '#222',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector; 