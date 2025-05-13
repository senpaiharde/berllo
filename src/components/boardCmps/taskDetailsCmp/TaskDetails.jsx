import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeTaskDetails,
  liveUpdateTask,
  openTaskDetails,
  
  syncTaskAsync,
} from '../../../redux/taskDetailsSlice';
import { TaskOps } from '../../../services/backendHandler';
import { fetchBoardById } from '../../../redux/BoardSlice';
import { useNavigate, useParams } from 'react-router-dom';

import TaskDetailsMembers from './TaskDetailsMembers';
import TaskDetailsLabel from './TaskDetailsLabel';
import TaskDetailsNotifcations from './TaskDetailsNotifcations';
import TaskDetailsDate from './TaskDetailsDate';
import TaskDetailsActivity from './main/TaskDetailsActivity';
import TaskDetailsSidebar from './main/sidebar/TaskDetailsSidebar';
import TaskDescription from './main/TaskDetailsDescription';
import TaskChecklist from './main/TaskdetailsChecklist';
import TaskdetailsBackLog from './main/TaskdetailsBackLog';

import SvgcloseTop from '../../../assets/svgDesgin/SvgTaskdetails/SvgcloseTop';

const TaskDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId, boardId } = useParams();
  const pureTaskId = taskId.split('-')[0];

  const board        = useSelector((s) => s.boardReducer);
  const boardLists   = board.boardLists || [];
  const selectedTask = useSelector((s) => s.taskDetailsReducer.selectedTask);

  // ① find the local JSON task
  const localTask = boardLists
    .flatMap((list) => list.taskList || [])
    .find((t) => t._id === pureTaskId);

  // ── ONLY THIS useEffect IS NEW ───────────────────────────
  useEffect(() => {
    // a) ensure boardLists exist
    if (boardLists.length === 0 && boardId) {
      dispatch(fetchBoardById(boardId));
      return; // wait for lists
    }

    // b) open the drawer with the local‐JSON task
    if (localTask && (!selectedTask || selectedTask._id !== localTask._id)) {
      dispatch(openTaskDetails(localTask));

      // c) then fetch the real details from the API
      dispatch(
        syncTaskAsync({
          method: TaskOps.FETCH,
          args: { taskId: pureTaskId },
          workId: 'tasks',
        })
      );
    }
  }, [boardLists, localTask, selectedTask, boardId, dispatch, pureTaskId]);
  // ───────────────────────────────────────────────────────────

  // rest of your effects & render exactly as before
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

  if (!selectedTask) return <div />;

  const {
    taskTitle,
    taskDueDate,
    taskLabels = [],
    taskMembers = [],
    isDueComplete = false,
  } = selectedTask;

  const slug =
    board.slug ||
    board.boardTitle?.toLowerCase().replace(/\s+/g, '-') ||
    'board';

  const hasLabels  = taskLabels.length > 0;
  const hasMembers = taskMembers.length > 0;

  function handleClose() {
    dispatch(closeTaskDetails());
    navigate(`/b/${board._id}/${slug}`);
  }

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
                type="checkbox"
                checked={isDueComplete}
                onClick={() =>
                  dispatch(
                    liveUpdateTask({ isDueComplete: !isDueComplete })
                  )
                }
                className="td-checkbox"
              />
            </div>

            <textarea
              className="td-title-input"
              value={taskTitle || ''}
              onChange={handleTitleChange}
              placeholder="Enter task title"
            />
          </div>
          <button className="td-close-btn" onClick={handleClose}>
            <SvgcloseTop />
          </button>
        </div>

        <TaskdetailsBackLog />

        <div className="td-main">
          <div className="td-main-left">
            <div className="td-section-top">
              {hasMembers && <TaskDetailsMembers />}
              {hasLabels  && <TaskDetailsLabel />}
              <TaskDetailsNotifcations />
              {taskDueDate && <TaskDetailsDate />}
            </div>

            <TaskDescription />
            <div style={{ marginTop: '-42px' }} />

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
