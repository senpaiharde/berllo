import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRef } from 'react';
import { SvgServices } from '../services/svgServices';
import { syncTaskAsync } from '../redux/TaskDetailsSlice';
import { TaskOps } from '../services/backendHandler';

const BoardsCreateDropdown = ({ onClose }) => {
  
  const dispatch = useDispatch();
const [boardTitle, setBoardTitle] = useState(null);
function createNewboard() {
        // dispatch(addnewBoard(`new board ${currentWorkSpace.boards?.length}`))
        dispatch(syncTaskAsync({ 
            method: TaskOps.ADD,
            args: {
              body: { method: TaskOps.ADD, workId: "board", boardTitle: `${boardTitle}` },
            },
            workId: "board",
          }))
      }
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Create board</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgServices name="SvgClose" />
        </button>
      </div>
     
      {/* Options */}
      <div style={{grid:'none'}} className="DropdownLabelOption">
        <div className='ImgDropdown'>
            <div className='ImgDropdownInside'>
           
        </div>
        </div>
        <h3 className="DropdownLabelH3">Background</h3>
        <h3 className="DropdownLabelH3">Board title</h3>
       <input
            onChange={(e) => setBoardTitle(e.target.value)}
          value={boardTitle}
          className="EditDropdownInput"
          style={{ paddingLeft: '13px',height:'36px' }}
          placeholder="Search labels..."
        />
        <h3 className="DropdownLabelH3">Workspace</h3>
        <label 
                        className="BoardReminder"
                      >
                        Set due date reminder
                        <div className="BoardReminderDiv">
                          <div className="BoardReminderDivText">
                            <div className="BoardReminderDivText2">Berllo Workspace</div>
                          </div>
                          <div className="BoardReminderDivSVG">
                            <span className="BoardReminderDivSVG2">
                              <SvgServices name="SvgDropdown" />
                            </span>
                          </div>
                        </div>
                      </label>
        <h3 className="DropdownLabelH3">visibility</h3>
        <label 
                        className="BoardReminder"
                      >
                        Set due date reminder
                        <div className="BoardReminderDiv">
                          <div className="BoardReminderDivText">
                            <div className="BoardReminderDivText2">Workspace</div>
                          </div>
                          <div className="BoardReminderDivSVG">
                            <span className="BoardReminderDivSVG2">
                              <SvgServices name="SvgDropdown" />
                            </span>
                          </div>
                        </div>
                      </label>
                      <button style={{marginTop:'10px'}} onClick={() => (true)} className="DropdownLabelButton">
              Create
            </button>
      </div>
    </div>
  );
};

export default BoardsCreateDropdown;
