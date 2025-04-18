import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';

import SvgClose from '../../../../../assets/svgDesgin/SvgClose';
import SvgDropdown from '../../../../../assets/svgDesgin/SvgDate/SvgDropdown';

const TaskdetailsBackLogDropdown = ({ trigger, onClose }) => {
    const dispatch = useDispatch();
  
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  
   
  
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Move Card</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgClose />
        </button>
      </div>

      {/* Options */}
      <div className="DropdownOptions" style={{}}>
        <h4 className='WorkflowAreah4'>Select destination</h4>
        <div className='WorkflowArea'>
            <label className='WorkflowAreaLabel'>Board</label>
            <div className="BoardReminderDiv">
                  <div className="BoardReminderDivText">
                    <div className="BoardReminderDivText2"> title</div>
                  </div>
                  <div className="BoardReminderDivSVG">
                    <span className="BoardReminderDivSVG2">
                      <SvgDropdown />
                    </span>
                  </div>
                </div>
        </div>
        

        
      </div>
    </div>
  );
};

export default TaskdetailsBackLogDropdown;
