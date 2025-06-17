import React from 'react';

type Question = {
  prompt: string;
  answer: string;
};

type ResultModalProps = {
  allCorrect: boolean;
  userAnswers: string[];
  questions: Question[];
  onReplay: () => void;
  onQuit: () => void;
  onNextYear: () => void;
};

const ResultModal: React.FC<ResultModalProps> = ({ allCorrect, userAnswers, questions, onReplay, onQuit, onNextYear }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '320px', textAlign: 'center' }}>
        {allCorrect ? (
          <>
            <h2>Congratulations! Node Mastered ⭐</h2>
          </>
        ) : (
          <>
            <h2>Try Again</h2>
            <div style={{ textAlign: 'left', margin: '1rem 0' }}>
              {questions.map((q, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                  <strong>Q{i+1}:</strong> {q.prompt}<br/>
                  <span style={{ color: userAnswers[i]?.trim().toLowerCase() === q.answer.toLowerCase() ? 'green' : 'red' }}>
                    Your answer: {userAnswers[i] || '(no answer)'}
                  </span><br/>
                  <span>Correct answer: {q.answer}</span>
                </div>
              ))}
            </div>
          </>
        )}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={onReplay}>Replay Node</button>
          <button onClick={onNextYear} disabled>Next Year</button>
          <button onClick={onQuit}>Quit</button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal; 