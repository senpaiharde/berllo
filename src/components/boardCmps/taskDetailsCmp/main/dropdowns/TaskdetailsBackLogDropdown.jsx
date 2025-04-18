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
              <label className="WorkflowAreaLabel">Board</label>

              <div onClick={() => setSelectedBoard((prev) => !prev)} className="BoardReminderDiv">
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
            {selectedBoard && (
              <div
                className="ReminderDropdown"
                style={{ maxHeight: '250px' }}
                onClick={(e) => e.stopPropagation()}>
                <ul>
                  {[
                    { id: 'NTerllo WorkSpace', title: 'Work Flow' },
                    { id: 'Terllo Workspace', title: '1-on-1 Meeting Agenda' },
                    { title: 'slava' },
                  ].map((li) => {
                    return (
                      <>
                        <h2
                          style={{ marginTop: '-0px', paddingLeft: '8px' }}
                          className="WorkflowAreah4">
                          {li.id}
                        </h2>
                        <li
                          key={li.id}
                          className={li.id === '' ? 'selected' : ''}
                          onClick={() => {
                            setSelectedBoard(false);
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
