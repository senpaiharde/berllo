import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';

import SvgClose from '../../../../../assets/svgDesgin/SvgClose';
import SvgDropdown from '../../../../../assets/svgDesgin/SvgDate/SvgDropdown';
import DropdownUi from '../sidebar/dropdownHardcoded/DropdownUi';
import BackLogDropdown from './BackLogDropdown';

const TaskdetailsBackLogDropdown = ({ trigger, onClose }) => {
  const dispatch = useDispatch();

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedList, setSelectedList] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const listOptions = [{ title: 'To Do' }, { title: 'Done' }];
  const positionOptions = [{ title: '1' }, { title: '2' },{ title: '2' },{ title: '2' }];
  const BoardOptions = [
    { id: 'NTerllo WorkSpace', title: 'Work Flow' },
    { id: 'Terllo Workspace', title: '1-on-1 Meeting Agenda' },
    { title: 'slava' },
  ]
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
      <div style={{ gap: '0px' }} className="DropdownOptions">
        <h4 className="WorkflowAreah4">Select destination</h4>
        <div className="workFlowCard">
          <div className="BoardReminderWrapper">
            <div className="WorkflowArea">
            <BackLogDropdown 
              label='Board'
              value={selectedBoard}
              onselect={setSelectedBoard}
              options={BoardOptions} />
            </div>
            
          </div>
          <div className="WorkflowRow">
            <div className="WorkflowList">
              <BackLogDropdown 
              label='list'
              value={selectedList}
              onselect={setSelectedList}
              options={listOptions} />
            </div>
            
            <div className="WorkflowPosition">
              <BackLogDropdown 
               label='position'
               value={selectedPosition}
               onselect={setSelectedPosition}
               options={positionOptions}/>
            </div>
            
          </div>
        </div>

        <button className="MoveCardButton">Move</button>
      </div>
    </div>
  );
};

export default TaskdetailsBackLogDropdown;
