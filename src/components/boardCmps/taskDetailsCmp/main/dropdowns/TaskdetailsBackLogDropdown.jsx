import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackLogDropdown from './BackLogDropdown';
import { SvgServices } from '../../../../../services/svgServices';
import { liveUpdateTask } from '../../../../../redux/taskDetailsSlice';
import { addTaskToBoard, removeTaskFromBoard } from '../../../../../redux/BoardSlice';
import { TaskOps } from '../../../../../services/backendHandler';

const TaskdetailsBackLogDropdown = ({ trigger, onClose }) => {
  const dispatch = useDispatch();
  const board = useSelector((s) => s.boardReducer);
  const workspace = useSelector((s) => s.workSpaceReducer);
  const task = useSelector((s) => s.taskDetailsReducer.selectedTask);

  const [boardId, setBoardId] = useState('');
  const [listId, setListId] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    if (task) {
      setBoardId(task.taskboard);
      setListId(task?.list || task?.taskList);
    }
  }, [task]);









  const boardOptions = useMemo(() => {
    return workspace.boards?.map((b) => ({
      id: b._id,
      title: b.boardTitle || 'Untitled Board',
    })) || [];
  }, [workspace.boards]);


  const listOptions = useMemo(() => {
    return board.boardLists?.map((l) => ({
      id: l._id,
      title: l.taskListTitle || 'Untitled List',
    })) || [];
  }, [board.boardLists]);


  const listObj = useMemo(() => {
    return board.boardLists?.find((l) => l._id === listId);
  }, [board.boardLists, listId]);


  const sortedTasks = useMemo(() => {
    if (!listObj || !Array.isArray(listObj.taskList)) return [];
    return listObj.taskList
      .slice()
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }, [listObj]);








  
 useEffect(() => {
  if (!task?._id || !listObj?.taskList) return;

  const idx = listObj.taskList.findIndex(t => t._id === task._id);
  setPosition(idx >= 0 ? String(idx + 1) : String((listObj.taskList.length ?? 0) + 1));
}, [task?._id, listObj?.taskList]);

const positionOptions = useMemo(() => {
  const count = listObj?.taskList?.length ?? 0;

  return Array.from({ length: count + 1 }, (_, i) => ({
    id: String(i + 1),
    title: i + 1 === count + 1 ? `${i + 1} to Last` : `${i + 1}`,
  }));
}, [listObj?.taskList]);


  useEffect(() => {
    if (!task?._id || !sortedTasks.length) return;

    const idx = sortedTasks.findIndex((t) => t._id === task._id);
    setPosition(idx >= 0 ? String(idx + 1) : String(sortedTasks.length + 1));
  }, [task?._id, sortedTasks]);





const handleMove = () => {
  if (!boardId || !listId || !position) return;


  dispatch(removeTaskFromBoard({ _id: task._id, taskList: task.taskList }));

  dispatch(addTaskToBoard({
    ...task,
    taskList: listId,
    taskboard: boardId,
  }));

  
  dispatch(
    liveUpdateTask({
      method: TaskOps.UPDATE,
      workId: 'tasks',
      args: {
        taskId: task._id,
        body: {
          taskList: listId,
          taskboard: boardId,
          position: Number(position) - 1, 
        },
      },
    })
  );

  onClose(); 
};


const fullListFromRedux = board.boardLists.find(
  (list) => list._id?.toString() === listId?.toString()
);
console.log("✅ Matching list:", fullListFromRedux);
console.log("🧠 Comparing listId:", listId);
console.log("🧠 board.boardLists IDs:", board.boardLists.map(l => l._id?.toString()));

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
