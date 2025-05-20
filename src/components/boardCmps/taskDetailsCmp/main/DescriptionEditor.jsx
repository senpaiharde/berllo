import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SvgServices } from '../../../../services/svgServices';

export default function DescriptionEditor({ initial, onSave, onCancel }) {
  const [value, setValue] = useState(initial);
  const quillRef = useRef();

  useEffect(() => setValue(initial), [initial]);

  

  return (
    <div className="td-description-editor-container">
      <div className="td-description-editor-textarea">
        {/* STATIC TOOLBAR */}
        <div className="my-toolbar">
          <div className="my-dropdown">
            Aa
            <span className='my-dropdown-svg'><SvgServices name="SvgDropdown" /></span>
            
          </div>
          <div className="toolbar-separator" />
          <button className="my-btn">B</button>
          <button className="my-btn">I</button>
          <button className="my-btn">•</button>
          <button className="my-btn">1.</button>
          <button className="my-btn">🔗</button>
          <button className="my-btn">🖼</button>
          <div></div>
        </div>

        {/* STATIC TEXTAREA */}
        <textarea 
        value={value}
        onChange={e => setValue(e.target.value)}
        className="my-textarea" placeholder="Start typing..." />
      </div>
      {/* STATIC ACTIONS */}
      <div className="td-editor-actions">
        <button className="td-editor-btn save" onClick={() => onSave(value)}>Save</button>
        <button className="td-editor-btn cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
