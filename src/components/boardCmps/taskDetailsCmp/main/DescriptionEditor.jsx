import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function DescriptionEditor({ initial, onSave, onCancel }) {
  const [value, setValue] = useState(initial);
  const quillRef = useRef();

  useEffect(() => setValue(initial), [initial]);

  // Helper to run Quill commands
  const exec = command => {
    const editor = quillRef.current.getEditor();
    editor.focus();
    if (command === 'bold') editor.format('bold', !editor.getFormat().bold);
    else editor.format('header', command);  
  };

   return (
    <div className="td-description-editor-container">
        <div className="td-description-editor-textarea">
      {/* STATIC TOOLBAR */}
      <div className="my-toolbar">
        <div className="my-dropdown">Aa</div>
        <div className="toolbar-separator" />
        <button className="my-btn">B</button>
        <button className="my-btn">I</button>
        <button className="my-btn">•</button>
        <button className="my-btn">1.</button>
        <button className="my-btn">🔗</button>
        <button className="my-btn">🖼</button>
      </div>

      {/* STATIC TEXTAREA */}
      <textarea
        className="my-textarea"
        placeholder="Start typing..."
        readOnly
      />
      </div>
      {/* STATIC ACTIONS */}
      <div className="td-editor-actions">
        <button className="td-editor-btn save">Save</button>
        <button className="td-editor-btn cancel">Cancel</button>
      </div>
    </div>
  );
}