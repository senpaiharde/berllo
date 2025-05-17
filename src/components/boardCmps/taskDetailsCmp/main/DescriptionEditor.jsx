// src/components/boardCmps/taskDetailsCmp/main/DescriptionEditor.jsx
import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const TOOLBAR_OPTIONS = [
  ['bold', 'italic'],                        // toggled buttons
  [{ list: 'ordered' }, { list: 'bullet' }], // lists
  ['link', 'image'],                         // link, image
];

export default function DescriptionEditor({ initial, onSave, onCancel }) {
  const [value, setValue] = useState(initial);
  const quillRef = useRef();

  useEffect(() => setValue(initial), [initial]);

  return (
    <div className="td-description-editor-container">
      {/* React Quill editor */}
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={setValue}
        modules={{ toolbar: TOOLBAR_OPTIONS }}
        formats={['bold','italic','list','bullet','link','image']}
        theme="snow"
      />

      {/* Action Buttons */}
      <div className="td-editor-actions">
        <button className="td-editor-btn save" onClick={() => onSave(value)}>
          Save
        </button>
        <button className="td-editor-btn cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
