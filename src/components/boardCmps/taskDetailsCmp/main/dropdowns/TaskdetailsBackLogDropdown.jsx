import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import BackLogDropdown from './BackLogDropdown';
import { SvgServices } from '../../../../../services/svgServices';
import { liveUpdateTask } from '../../../../../redux/taskDetailsSlice';
import { addTaskToBoard, removeTaskFromBoard } from '../../../../../redux/BoardSlice';
import { TaskOps } from '../../../../../services/backendHandler';

const TaskdetailsBackLogDropdown = ({ trigger, onClose }) => {
  const dispatch     = useDispatch();
  const boardSlice   = useSelector(s => s.boardReducer);
  const task         = useSelector(s => s.taskDetailsReducer.selectedTask);

  // 1) Local state
  const [boardId,   setBoardId]   = useState('');
  const [listId,    setListId]    = useState('');
  const [position,  setPosition]  = useState('');

  // 2) Seed boardId & listId once the board’s lists exist
  useEffect(() => {
    if (!task || !boardSlice.boardLists?.length) return;
    setBoardId(task.taskboard);
    setListId(task.taskList);
  }, [task, boardSlice.boardLists]);

  // 3) Seed position once listId is set
  useEffect(() => {
    if (!listId) return;
    console.log('▶️ Effect #2 run, listId:', listId);
     console.log('  • No listId → clearing');
     
    const listObj = boardSlice.boardLists.find(l => l._id === listId);
     console.log('  • Found listObj:', listObj);
    if (!listObj?.taskList) return;

  
    const sorted = listObj.taskList
      .slice()
      .sort((a, b) => a.position - b.position);
 console.log('  • tasksInList:', sorted);
    const idx = sorted.findIndex(t => t._id === task._id);
    
    setPosition(idx >= 0 ? String(idx + 1) : String(sorted.length + 1));
  }, [listId, boardSlice.boardLists, task._id]);

 
  const boardOptions = useMemo(
    () => [{ id: boardSlice._id, title: boardSlice.boardTitle }],
    [boardSlice._id, boardSlice.boardTitle]
  );
 console.log('  • Found idx for this boardOptions:', boardOptions)
  const listOptions = useMemo(
    () =>
      (boardSlice.boardLists || []).map(l => ({
        id:    l._id,
        title: l.taskListTitle,
      })),
    [boardSlice.boardLists]
  );
console.log('  • Found idx for this listOptions:', listOptions)
  const positionOptions = useMemo(() => {
    const listObj = boardSlice.boardLists.find(l => l._id === listId);
    const count   = (listObj?.taskList?.length ?? 0) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id:    String(i + 1),
      title: String(i + 1),
    }));
  }, [listId, boardSlice.boardLists]);
console.log('  • Found idx for this positionOptions:', positionOptions)
  // 5) Move handler
  const handleMove = () => {
    dispatch(
      removeTaskFromBoard({
        _id:      task._id,
        taskList: task.taskList,
      })
    );

    const updated = {
      ...task,
      taskList:  listId,
      taskboard: boardId,
    };
    dispatch(addTaskToBoard({ taskList: listId, ...updated }));

    dispatch(
      liveUpdateTask({
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
      })
    );

    onClose();
  };

  return (
    <div className="DropdownUi">
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Move Card</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgServices name="SvgClose" />
        </button>
      </div>

      <div className="DropdownOptions" style={{ gap: '0px' }}>
        <h4 className="WorkflowAreah4">Select destination</h4>
        <div className="workFlowCard">
          <div className="BoardReminderWrapper">
            <div className="WorkflowArea">
              <BackLogDropdown
                label="Board"
                options={boardOptions}
                value={boardId}
                onselect={setBoardId}
                disabled={false}
              />
            </div>
          </div>

          <div className="WorkflowRow">
            <div className="WorkflowList">
              <BackLogDropdown
                label="List"
                options={listOptions}
                value={listId}
                onselect={setListId}
                disabled={listOptions.length === 0}
              />
            </div>

            <div className="WorkflowPosition">
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
