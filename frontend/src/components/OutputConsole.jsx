import React from 'react';
import './Panels.css';

const OutputConsole = ({ output }) => {
  return (
    <div className="output-console">
      <div className="console-header">Terminal / Output</div>
      <pre className="console-content">
        {output || "Output will appear here..."}
      </pre>
    </div>
  );
};

export default OutputConsole;
