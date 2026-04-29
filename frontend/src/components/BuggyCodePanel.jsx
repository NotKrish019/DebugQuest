import React from 'react';
import Editor from '@monaco-editor/react';
import './Panels.css';

const BuggyCodePanel = ({ code }) => {
  return (
    <div className="panel buggy-panel">
      <div className="panel-header mac-style">
        <div className="mac-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="panel-title">buggy_code.py (Read-Only)</div>
      </div>
      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "monospace",
          }}
        />
      </div>
    </div>
  );
};

export default BuggyCodePanel;
