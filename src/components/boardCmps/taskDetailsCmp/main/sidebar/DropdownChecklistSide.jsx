import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SvgClose from '../../../../../assets/svgDesgin/SvgClose';

import BackLogDropdown from '../dropdowns/BackLogDropdown';
import { liveUpdateTask } from '../../../../../redux/taskDetailsSlice';
import { TaskOps } from '../../../../../services/backendHandler';

const DropdownChecklistSide = ({ onClose }) => {
  const dispatch = useDispatch();

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const [selectedBoard, setSelectedBoard] = useState('');
 
  const [searchTerm, setSearchTerm] = useState('Checklist');
 
  const BoardOptions = [
    { id: 'NTerllo WorkSpace', title: 'Work Flow' },
    { id: 'Terllo Workspace', title: '1-on-1 Meeting Agenda' },
    { title: 'slava' },
  ]
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Add checklist</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgClose />
        </button>
      </div>

      {/* Options */}
      <div style={{ gap: '0px' }} className="DropdownOptions">
        <div className="DropdownMembers">
                  <h3 className="DropdownMembersh3">Title</h3>
                   
                </div>
                <input className='AddchecklistDrop'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          
          style={{ padding: '13px' }}
        />
        <div className="workFlowCard">
          <div className="BoardReminderWrapper">
            <div className="WorkflowArea">
                
            <BackLogDropdown
              label='Copy items from…'
              value={selectedBoard}
              onselect={setSelectedBoard}
              options={BoardOptions} />
            </div>
            
          </div>
         
        </div>

        <button onChange={() => {
                          const workId = 'tasks'
                          const method = TaskOps.UPDATE;
                          dispatch(liveUpdateTask({ isDueComplete: !isDueComplete, workId, method }));
                        }} className="MoveCardButton">Add</button>
      </div>
    </div>
  );
};

export default DropdownChecklistSide;
