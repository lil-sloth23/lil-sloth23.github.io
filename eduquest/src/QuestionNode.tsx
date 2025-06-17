import React, { useState, useEffect } from 'react';

type Question = {
  prompt: string;
  answer: string;
  explanation?: string;
};

type QuestionNodeProps = {
  questions: Question[];
  subject: string;
  year: number;
  topic: string;
  onComplete: (allCorrect: boolean, userAnswers: string[]) => void;
};

const defaultExplanation = 'Review the topic and try to understand why this is the correct answer.';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QuestionNode: React.FC<QuestionNodeProps> = ({ questions, subject, year, topic, onComplete }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showContinue, setShowContinue] = useState(false);
  const [allCorrect, setAllCorrect] = useState(true);
  const [explanation, setExplanation] = useState<string | null>(null);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
    setCurrent(0);
    setUserAnswers([]);
    setInput('');
    setFeedback(null);
    setShowContinue(false);
    setAllCorrect(true);
    setExplanation(null);
    // eslint-disable-next-line
  }, [questions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = input.trim().toLowerCase() === shuffledQuestions[current].answer.toLowerCase();
    setUserAnswers([...userAnswers, input]);
    if (correct) {
      setFeedback('Correct!');
      setExplanation(null);
    } else {
      setFeedback(`Incorrect. Correct answer: ${shuffledQuestions[current].answer}`);
      setExplanation(shuffledQuestions[current].explanation || defaultExplanation);
      setAllCorrect(false);
    }
    setShowContinue(true);
  };

  const handleContinue = () => {
    setFeedback(null);
    setExplanation(null);
    setInput('');
    setShowContinue(false);
    if (current < shuffledQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete(allCorrect, [...userAnswers]);
    }
  };

  if (!shuffledQuestions.length) return null;

  return (
    <div>
      <h2>{subject} Y{year} – {topic}</h2>
      <div style={{ margin: '1rem 0' }}>
        <div>Question {current + 1} of {shuffledQuestions.length}</div>
        <div style={{ margin: '0.5rem 0' }}>{shuffledQuestions[current].prompt}</div>
        {!feedback && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={!!feedback}
              autoFocus
              style={{ padding: '0.5rem', fontSize: '1rem' }}
            />
            <button type="submit" disabled={!input.trim()} style={{ marginLeft: '0.5rem' }}>
              Submit
            </button>
          </form>
        )}
        {feedback && (
          <div style={{ marginTop: '0.5rem', color: feedback === 'Correct!' ? 'green' : 'red' }}>
            {feedback}
            {explanation && (
              <div style={{ marginTop: '0.5rem', color: '#ccc', fontSize: '0.95em' }}>
                <strong>Explanation:</strong> {explanation}
              </div>
            )}
            {showContinue && (
              <div style={{ marginTop: '1rem' }}>
                <button onClick={handleContinue} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>Continue</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionNode; 