import React from 'react';
import './MapView.css';

interface MapViewProps {
  topics: { topic: string }[];
  currentTopicIndex: number;
  onSelectTopic: (index: number) => void;
  completed: boolean[];
}

const MapView: React.FC<MapViewProps> = ({ topics, currentTopicIndex, onSelectTopic, completed }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '2rem 0', flexWrap: 'wrap' }}>
      {topics.map((t, i) => (
        <button
          key={t.topic}
          onClick={() => onSelectTopic(i)}
          className={`map-node${i === currentTopicIndex ? ' current' : ''}${completed[i] ? ' completed' : ''}`}
        >
          {t.topic}
          {completed[i] && (
            <span style={{ position: 'absolute', top: 8, right: 12, fontSize: 20 }}>⭐</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default MapView; 