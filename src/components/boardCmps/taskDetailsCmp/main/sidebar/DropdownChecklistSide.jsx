import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';


import BackLogDropdown from '../dropdowns/BackLogDropdown';
import { liveUpdateTask } from '../../../../../redux/taskDetailsSlice';
import { TaskOps } from '../../../../../services/backendHandler';
import { SvgServices } from '../../../../../services/svgServices';

const DropdownChecklistSide = ({ onClose }) => {
  const dispatch = useDispatch();

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const [selectedBoard, setSelectedBoard] = useState('');

  const [searchTerm, setSearchTerm] = useState('Checklist');

  const normalizeChecklist = (list) =>
    list.map((item) => ({
      title: item.title || '',
      items: Array.isArray(item.items) ? item.items : [],
    }));

  const toggleChecklist = (newChecklist) => {
    if (!task) return;

    const hasChecklist = task.checklist?.some(
      (item) => item?.title?.toLowerCase() === newChecklist?.title?.toLowerCase()
    );

    const updatedChecklist = hasChecklist
      ? task.checklist.filter(
          (item) => item.title.toLowerCase() !== newChecklist.title.toLowerCase()
        )
      : [...(task.checklist || []), newChecklist];

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        checklist: normalizeChecklist(updatedChecklist),
      })
    );
  };
  const BoardOptions = [
    { id: 'NTerllo WorkSpace', title: 'Work Flow' },
    { id: 'Terllo Workspace', title: '1-on-1 Meeting Agenda' },
    { title: 'slava' },
  ];
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Add checklist</h2>
        <button className="DropdownClose" onClick={onClose}>
            <SvgServices name='SvgClose'/>
         
        </button>
      </div>

      {/* Options */}
      <div style={{ gap: '0px' }} className="DropdownOptions">
        <div className="DropdownMembers">
          <h3 className="DropdownMembersh3">Title</h3>
        </div>
        <input
          className="AddchecklistDrop"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          style={{ padding: '13px' }}
        />
        <div className="workFlowCard">
          <div className="BoardReminderWrapper">
            <div className="WorkflowArea">
              <BackLogDropdown
                label="Copy items from…"
                value={selectedBoard}
                onselect={setSelectedBoard}
                options={BoardOptions}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (searchTerm) {
              onClose?.();
              toggleChecklist({ title: searchTerm, items: [] });
            }
          }}
          className="MoveCardButton">
          Add
        </button>
      </div>
    </div>
  );
};

export default DropdownChecklistSide;
