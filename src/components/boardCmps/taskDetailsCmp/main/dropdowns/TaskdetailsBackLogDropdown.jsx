import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';

import BackLogDropdown from './BackLogDropdown';
import { SvgServices } from '../../../../../services/svgServices';
import { liveUpdateTask } from '../../../../../redux/taskDetailsSlice';
import { addTaskToBoard, removeTaskFromBoard } from '../../../../../redux/BoardSlice';

const TaskdetailsBackLogDropdown = ({ trigger, onClose }) => {
  const dispatch = useDispatch();
  const boardSlice = useSelector(s => s.boardReducer);
  const task       = useSelector(s => s.taskDetailsReducer.selectedTask);

  const [boardId, setBoardId]   = useState('');
  const [listId,  setListId]    = useState('');
  const [position, setPosition] = useState('');



  const boardOptions = boardSlice.boards.map(b => ({
    id:    b._id,
    title: b.boardTitle,
  }));

  const selectedBoard = boardSlice.boards.find(b => b._id === boardId);
  const listOptions = selectedBoard
    ? selectedBoard.boardLists.map(l => ({
        id:    l._id,
        title: l.taskListTitle,
      }))
    : [];

  const selectedList = selectedBoard?.boardLists.find(l => l._id === listId);
  const positionOptions = selectedList
    ? Array.from(
        { length: selectedList.taskList.length + 1 },
        (_, i) => ({ id: String(i + 1), title: String(i + 1) })
      )
    : [];

  

  useEffect(() => {
    if (selectedList) {
      const idx = selectedList.taskList.findIndex(t => t._id === task._id);
      setPosition(idx >= 0 ? String(idx + 1) : '');
    } else {
      setPosition('');
    }
   
  }, [listId, boardId]);



  useEffect(() => {
    setListId('');
    setPosition('');
  }, [boardId]);

  

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
      method:  'update',
      workId:  'tasks',
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
      <div style={{ gap: '0px' }} className="DropdownOptions">
        <h4 className="WorkflowAreah4">Select destination</h4>
        <div className="workFlowCard">
          <div className="BoardReminderWrapper">
            <div className="WorkflowArea">
              {/* 1) Board dropdown */}
              <BackLogDropdown
                label="Board"
                value={boardId}
                onselect={setBoardId}
                options={boardOptions}
              />
            </div>
          </div>

          <div className="WorkflowRow">
            <div className="WorkflowList">
              {/* 2) List dropdown */}
              <BackLogDropdown
                label="List"
                value={listId}
                onselect={setListId}
                options={listOptions}
                disabled={!boardId}
              />
            </div>

            <div className="WorkflowPosition">
              {/* 3) Position dropdown */}
              <BackLogDropdown
                label="Position"
                value={position}
                onselect={setPosition}
                options={positionOptions}
                disabled={!listId}
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
