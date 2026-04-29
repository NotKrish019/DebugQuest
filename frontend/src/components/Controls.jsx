import React from 'react';
import './Panels.css';

const Controls = ({ onGenerate, onRun, onHint, status, isGenerating }) => {
  return (
    <div className="controls-bar">
      <button className="btn generate-btn" onClick={onGenerate} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Challenge"}
      </button>
      <div className="action-buttons">
        <button className="btn run-btn" onClick={onRun}>Run / Submit</button>
        <button className="btn hint-btn" onClick={onHint}>Get Hint</button>
      </div>
      {status && (
        <div className={`status-message ${status === "success" ? "success" : "fail"}`}>
          {status === "success" ? "Success ✅" : "Try again ❌"}
        </div>
      )}
    </div>
  );
};

export default Controls;
