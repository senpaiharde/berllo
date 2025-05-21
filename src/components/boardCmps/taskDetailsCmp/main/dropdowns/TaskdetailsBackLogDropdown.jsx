import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';

import BackLogDropdown from './BackLogDropdown';
import { SvgServices } from '../../../../../services/svgServices';
import { liveUpdateTask } from '../../../../../redux/taskDetailsSlice';
import { addTaskToBoard, removeTaskFromBoard } from '../../../../../redux/BoardSlice';
import { TaskOps } from '../../../../../services/backendHandler';

const TaskdetailsBackLogDropdown = ({ trigger, onClose }) => {
  const dispatch = useDispatch();
  const boardSlice = useSelector((s) => s.boardReducer);
  const task = useSelector((s) => s.taskDetailsReducer.selectedTask);

  // 1) Local state
  const [boardId,   setBoardId]   = useState('');
  const [listId,    setListId]    = useState('');
  const [position,  setPosition]  = useState('');

  // 2) Seed state from current task & board on mount
  useEffect(() => {
    if (!task || !boardSlice._id) return;

    // - board
    setBoardId(task.taskboard || boardSlice._id);

    // - list
    setListId(task.taskList);

    // - position (1-based)
    const listObj = boardSlice.boardLists.find((l) => l._id === task.taskList);
    if (listObj) {
      const idx = listObj.taskList.findIndex((t) => t._id === task._id);
      if (idx >= 0) setPosition(String(idx + 1));
    }
  }, [task, boardSlice]);

  // 3) Build dropdown options
  const boardOptions = [
    { id: boardSlice._id, title: boardSlice.boardTitle },
  ];

  const listOptions = (boardSlice.boardLists || []).map((l) => ({
    id:    l._id,
    title: l.taskListTitle,
  }));

  const positionOptions = (boardSlice.boardLists
    .find((l) => l._id === listId)
    ?.taskList || []
  ).map((_, i) => ({
    id:    String(i + 1),
    title: String(i + 1),
  }));

  // 4) Reset downstream when parent changes
  useEffect(() => {
    setListId('');
    setPosition('');
  }, [boardId]);

  useEffect(() => {
    setPosition('');
  }, [listId]);

  // 5) Move handler
  const handleMove = () => {
    dispatch(removeTaskFromBoard({
      _id:      task._id,
      taskList: task.taskList,
    }));

    const updated = {
      ...task,
      taskList:  listId,
      taskboard: boardId,
    };
    dispatch(addTaskToBoard({ taskList: listId, ...updated }));

    dispatch(liveUpdateTask({
      method: TaskOps.UPDATE,
      workId: 'tasks',
      args: {
        taskId: task._id,
        body: {
          taskList:  listId,
          taskboard: boardId,
          position:  Number(position) - 1,
        },
      },
    }));

    onClose();
  };

  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Move Card</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgServices name="SvgClose" />
        </button>
      </div>

      {/* Options */}
      <div className="DropdownOptions" style={{ gap: '0px' }}>
        <h4 className="WorkflowAreah4">Select destination</h4>
        <div className="workFlowCard">
          <div className="BoardReminderWrapper">
            <div className="WorkflowArea">
              {/* Board */}
              <BackLogDropdown
                label="Board"
                options={boardOptions}
                value={boardId}
                onselect={setBoardId}
              />
            </div>
          </div>

          <div className="WorkflowRow">
            <div className="WorkflowList">
              {/* List */}
              <BackLogDropdown
                label="List"
                options={listOptions}
                value={listId}
                onselect={setListId}
                disabled={listOptions.length === 0}
              />
            </div>

            <div className="WorkflowPosition">
              {/* Position */}
              <BackLogDropdown
                label="Position"
                options={positionOptions}
                value={position}
                onselect={setPosition}
                disabled={positionOptions.length === 0}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleMove}
          disabled={!boardId || !listId || !position}
          className="MoveCardButton"
        >
          Move
        </button>
      </div>
    </div>
  );
};

export default TaskdetailsBackLogDropdown;
