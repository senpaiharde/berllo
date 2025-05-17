import React, { useRef, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';



import defaultLabelColors from '../../../../../../services/ColorStorage';
import { SvgServices } from '../../../../../../services/svgServices';

const EditLabelDropdown = ({ onClose, title, onSave, label,onDelete }) => {
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  console.log('color', task);

  const [labelTitle, setLabelTitle] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (label) {
      setSelectedColor(label.color || '');
      setLabelTitle(label.title || '');
    }
  }, [label]);

  return (
    <div className="DropdownUiEdit">
      {/* Header */}
      <div className="DropdownUiHeader">
        <button onClick={onClose} className="DropdownClose">
            <SvgServices name='Svgback'/>
          
        </button>
        <h2 className="DropdownHeaderH2">{title}</h2>
        <button onClick={onClose} className="DropdownClose">
             <SvgServices name='SvgClose'/>
          
        </button>
      </div>
      <div className="EditDropdownHeader">
        <span
          style={{
            backgroundColor: selectedColor,
          }}
          className="EditDropdownHeaderspan">
          {labelTitle || 'Preview'}
        </span>
      </div>
      <div className="EditDropdownOptions">
        <h3 className="EditDropdownLabelH3">Title</h3>
        <input
          onChange={(e) => setLabelTitle(e.target.value)}
          value={labelTitle}
          className="EditDropdownInput"
          style={{ paddingLeft: '13px' }}
          placeholder="Search labels..."
        />
        <h3 className="EditDropdownLabelH3">Select a color</h3>
        <div className="EditDropdownLabelColor">
          {defaultLabelColors.map((label) => {
            return (
              <div className="EditDropdownLabelBox" key={label}>
                <button
                  style={{
                    background: label,
                    border: selectedColor === label ? '2px solid #000' : 'none',
                  }}
                  onClick={() => setSelectedColor(label)}
                  className="EditDropdownLabelBoxbutton"></button>
              </div>
            );
          })}
        </div>
        
            <button 
             onClick={() => {onDelete?.(label); onClose?.();}}
             className="EditDropdownLabelBoxbuttonADD">
        <SvgServices name='SvgClose'/> Remove color
        </button>
        
        <hr className="DropdownHr" />
        <div className="EditDropDownBottom">
          <button
            className="EditDropDownBottom1"
            onClick={() => {
              if (selectedColor) {
                onClose?.();

                onSave?.({ color: selectedColor, title: labelTitle });
              }
            }}>
            Save
          </button>
          <button className="EditDropDownBottom2" onClick={() => {onDelete?.(label); onClose?.();}}>
            Delete</button>
        </div>
      </div>

      {/* Options */}
    </div>
  );
};

export default EditLabelDropdown;
