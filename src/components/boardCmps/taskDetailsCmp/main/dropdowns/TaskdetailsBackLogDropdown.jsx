import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';

import SvgClose from '../../../../../assets/svgDesgin/SvgClose';
import SvgDropdown from '../../../../../assets/svgDesgin/SvgDate/SvgDropdown';

const TaskdetailsBackLogDropdown = ({ trigger, onClose }) => {
    const dispatch = useDispatch();
  
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const [showReminderOptions, setShowReminderOptions] = useState(false);
   
  
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
      <div style={{gap:'0px'}} className="DropdownOptions">
        <h4 className='WorkflowAreah4'>Select destination</h4>
        <div className='workFlowCard'>
        <div className="BoardReminderWrapper">
        <div   
        className='WorkflowArea'>
            <label className='WorkflowAreaLabel'>Board</label>

            
            <div onClick={() => setShowReminderOptions(true)}
             className="BoardReminderDiv">
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
        {showReminderOptions && (
                <div className="ReminderDropdown" style={{}} 
                onClick={(e) => e.stopPropagation()}>
                    
                  <ul>
                    {[
                      {id:'NTerllo WorkSpace', title:'Work Flow'},
                      {id:'Terllo Workspace', title:'1-on-1 Meeting Agenda',}
                    ].map((li,) => {
                      return (
                        <>
                        <h2 style={{marginTop:'-0px',paddingLeft:'8px',}} className='WorkflowAreah4'>{li.id}</h2>
                        <li
                          key={li.id}
                          className={li.id === '' ? 'selected' : ''}
                          onClick={() => {
                           
                            setShowReminderOptions(false);
                          }}>
                            
                          {li.title}
                        </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              )}
              </div>    
        <div className='WorkflowRow'>
        <div className='WorkflowList'>
        <label className='WorkflowAreaLabel'>List</label>
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
        {}
        <div className='WorkflowPosition'>
        <label className='WorkflowAreaLabel'>Position</label>
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
        {}
        </div>
        </div>
        

        <button className='MoveCardButton'>Move</button>
      </div>
    </div>
  );
};

export default TaskdetailsBackLogDropdown;
