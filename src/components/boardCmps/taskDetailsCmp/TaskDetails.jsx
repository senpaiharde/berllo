import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeTaskDetails,
  liveUpdateTask,
  openTaskDetails,
  addChecklistItem,
  toogleChecklistItem,
  editChecklistItem,
  deleteChecklistItem,
} from '../../../redux/taskDetailsSlice';
import { useNavigate, useParams } from 'react-router-dom';

import TaskDetailsMembers from './TaskDetailsMembers';
import TaskDetailsLabel from './TaskDetailsLabel';
import TaskDetailsNotifcations from './TaskDetailsNotifcations';
import TaskDetailsDate from './TaskDetailsDate';
import TaskDetailsActivity from './main/TaskDetailsActivity';
import TaskDetailsSidebar from './main/sidebar/TaskDetailsSidebar';
import TaskDescription from './main/TaskDetailsDescription';
import TaskChecklist from './main/TaskdetailsChecklist';
import { fetchBoardById } from '../../../redux/BoardSlice';
import SvgcloseTop from '../../../assets/svgDesgin/SvgTaskdetails/SvgcloseTop';
import SvgEye from '../../../assets/svgDesgin/SvgTaskdetails/SvgEye';
import SvgDrop from '../../../assets/svgDesgin/SvgTaskdetails/SvgDrop';
const TaskDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId, boardId } = useParams();

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  const taskDate = task?.taskDueDate;
  const pureTaskId = taskId.split('-')[0];
  const hasLabels = useSelector((state) => {
    const task = state.taskDetailsReducer.selectedTask;
    return Array.isArray(task?.taskLabels) && task.taskLabels.length > 0;
  });
  const hasMembers = useSelector((state) => {
    const task = state.taskDetailsReducer.selectedTask;
    return Array.isArray(task?.taskMembers) && task.taskMembers.length > 0;
  });
  const selectedTask = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const isDueComplete = selectedTask?.isDueComplete ?? false;
  const boardLists = useSelector((state) => state.boardReducer.boardLists);

  const isWatching = selectedTask?.isWatching;
  useEffect(() => {
    if (boardLists.length === 0 && boardId) {
      dispatch(fetchBoardById(boardId));
    }
    if (!selectedTask && taskId && boardLists.length > 0) {
      const task = boardLists
        .flatMap((list) => list.taskList || [])
        .find((task) => task._id === pureTaskId);

      if (task && (!selectedTask || selectedTask.id !== task.id)) {
        dispatch(openTaskDetails(task));
      }
    }
  }, [selectedTask?.id, taskId, boardLists, dispatch, boardId]);

  useEffect(() => {
    const hanldeEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', hanldeEsc);
    return () => window.removeEventListener('keydown', hanldeEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });
  if (!selectedTask) return <div></div>;

  const handleClose = () => {
    dispatch(closeTaskDetails());
    navigate(-1);
  };

  const handleTitleChange = (e) => {
    dispatch(liveUpdateTask({ taskTitle: e.target.value }));
  };

  return (
    <div className="td-modal">
      <div className="td-backdrop" onClick={handleClose} />

      <div className="td-container">
        <div className="td-header">
          <div className="td-header-left">
            <div className="td-checkbox-div">
              <input
                type="radio"
                checked={isDueComplete}
                onClick={() => {
                  dispatch(
                    liveUpdateTask({
                      ...task,
                      isDueComplete: !task.isDueComplete,
                    })
                  );
                }}
                className="td-checkbox"
              />
            </div>

            <textarea
              className="td-title-input"
              value={selectedTask.taskTitle || ''}
              onChange={handleTitleChange}
              placeholder="Enter task title"
            />
          </div>
          <button className="td-close-btn" onClick={handleClose}>
            <SvgcloseTop />
          </button>
        </div>

        <div className="td-inlist-text">
          in list{' '}
          <span>
            <button className="notification-button">
              BACKLOG-SERVER
              <SvgDrop />
            </button>
            {!isWatching && <SvgEye />}
          </span>
        </div>

        <div className="td-main">
          <div className="td-main-left">
            <div className="td-section-top">
              {hasMembers && <TaskDetailsMembers />}

              {hasLabels && <TaskDetailsLabel />}

              <TaskDetailsNotifcations />

              {taskDate && <TaskDetailsDate />}
            </div>
            <TaskDescription />
            <div style={{ marginTop: '-42px' }}></div>

            <TaskChecklist />

            <TaskDetailsActivity />
          </div>

          <TaskDetailsSidebar />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
