import React from 'react';
import './Panels.css';

const HintBox = ({ hint }) => {
  if (!hint) return null;
  return (
    <div className="hint-box">
      <div className="hint-header">💡 Socratic Hint</div>
      <div className="hint-content">{hint}</div>
    </div>
  );
};

export default HintBox;
