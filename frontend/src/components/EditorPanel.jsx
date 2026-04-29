import React from 'react';
import Editor from '@monaco-editor/react';
import './Panels.css';

const EditorPanel = ({ userCode, setUserCode }) => {
  return (
    <div className="panel editor-panel">
      <div className="panel-header vscode-style">
        <div className="panel-title">workspace.py</div>
      </div>
      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={userCode}
          onChange={(value) => setUserCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "monospace",
          }}
        />
      </div>
    </div>
  );
};

export default EditorPanel;
