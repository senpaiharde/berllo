import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';

import SvgClose from '../../../../../assets/svgDesgin/SvgClose';

const TaskdetailsBackLogDropdown = ({ trigger, onClose }) => {
    const dispatch = useDispatch();
  
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  
   
  
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Members</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgClose />
        </button>
      </div>

      {/* Options */}
      <div className="DropdownOptions" style={{}}>
        
        

        
      </div>
    </div>
  );
};

export default TaskdetailsBackLogDropdown;
