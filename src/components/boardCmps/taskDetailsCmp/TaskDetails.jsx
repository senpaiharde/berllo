import React, { useEffect, useState } from 'react';
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
import DropdownUi from './main/sidebar/dropdownHardcoded/DropdownUi';
import Cover from './main/sidebar/cover';
import CoverHeader from '../../../assets/svgDesgin/SvgDate/Coverheader';

const TaskDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId, boardId } = useParams();
  const pureTaskId = taskId.split('-')[0];
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  const board = useSelector((s) => s.boardReducer);
  const boardLists = board.boardLists || [];
  const selectedTask = useSelector((s) => s.taskDetailsReducer.selectedTask);
  const [isCoverOpen, setIsCoverOpen] = useState(null);
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
      dispatch(liveUpdateTask({ method: TaskOps.FETCH, workId: 'tasks' }));
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

  const { isDueComplete = false } = selectedTask;

  const slug = board.slug || board.boardTitle?.toLowerCase().replace(/\s+/g, '-') || 'board';

  function handleClose() {
    dispatch(closeTaskDetails());
    navigate(`/b/${board._id}/${slug}`);
  }
  const workId = 'tasks';

  const handleTitleChange = (e) => {
    const method = TaskOps.UPDATE;
    dispatch(liveUpdateTask({ taskTitle: e.target.value, workId, method }));
  };
  const cover = selectedTask.cover;
  return (
    <div className="td-modal">
        
      <div className={`td-container${cover ? ' has-cover' : ''}`}>
        

        {cover && (
          <div
            className="td-cover"
            style={{
              background:
                cover.coverType === 'image'
                  ? `url(${cover.coverImg}) center/cover`
                  : cover.coverColor,
            }}>
            <button
              style={{
                background:
                  cover.coverType === 'image'
                    ? `url(${cover.coverImg}) center/cover`
                    : cover.coverColor,
              }}
              className="td-cover-close"
              onClick={handleClose}>
              <SvgcloseTop />
            </button>

            <DropdownUi
              trigger={
                <button
                  className="td-cover-open"
                  style={{
                    background:
                      cover.coverType === 'image'
                        ? `url(${cover.coverImg}) center/cover`
                        : cover.coverColor,
                  }}>
                  <span className="CoverHeaderIcon">
                    <CoverHeader />
                  </span>
                  <span className="CoverText">Cover</span>
                </button>
              }>
              {({ onClose }) => <Cover onClose={onClose} />}
            </DropdownUi>
          </div>
        )}
        
        <div className="td-header">
          <div className="td-header-left">
            <div className="td-checkbox-div">
              <input
                type="checkbox"
                checked={isDueComplete}
                onChange={() => {
                  const method = TaskOps.UPDATE;
                  dispatch(liveUpdateTask({ isDueComplete: !isDueComplete, workId, method }));
                }}
                className="td-checkbox"
              />
            </div>

            <textarea
              className="td-title-input"
              value={task?.title || ''}
              onChange={handleTitleChange}
              placeholder="Enter task title"
            />
          </div>
          {!cover && (
            <button className="td-cover-close-modal" onClick={handleClose}>
              <SvgcloseTop />
            </button>
          )}
        </div>

        <TaskdetailsBackLog />

        <div className="td-main">
          <div className="td-main-left">
            <div className="td-section-top">
              {task?.members?.length > 0 && <TaskDetailsMembers />}
              {task?.labels?.length > 0 && <TaskDetailsLabel />}
              <TaskDetailsNotifcations />
              {task?.taskDueDate && <TaskDetailsDate />}
            </div>

            <TaskDescription />
            <div style={{ marginTop: '-42px' }} />

            {task?.checklist?.length > 0 && <TaskChecklist />}
            <TaskDetailsActivity />
          </div>

          <TaskDetailsSidebar />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
