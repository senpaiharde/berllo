import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeTaskDetails,
  liveUpdateTask,
  openTaskDetails,
  syncTaskAsync,
  taskUpdated,
  updateSelectedTaskLive,
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

import DropdownUi from './main/sidebar/dropdownHardcoded/DropdownUi';
import Cover from './main/sidebar/cover';
import CoverHeader from '../../../assets/svgDesgin/SvgDate/Coverheader';
import { SvgServices } from '../../../services/svgServices';
import AttachmentUi from './main/AttachmentUi';
import socket from '../../../services/socket';

const TaskDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId, boardId } = useParams();
  const pureTaskId = taskId.split('-')[0];
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  const board = useSelector((s) => s.boardReducer);
  const boardLists = board.boardLists || [];
  const selectedTask = useSelector((s) => s.taskDetailsReducer.selectedTask);


 useEffect(() => {
    socket.connect();
    socket.emit('joinTask', pureTaskId);
    return () => { socket.disconnect(); };
  }, [pureTaskId]);

 useEffect(() => {
    const handleServerUpdate = (updatedTask) => {
      dispatch(updateSelectedTaskLive(updatedTask));
    };
    socket.on('taskUpdated', handleServerUpdate);
    return () => { socket.off('taskUpdated', handleServerUpdate); };
  }, [dispatch]);


  const localTask = boardLists
    .flatMap((list) => list.taskList || [])
    .find((t) => t._id === pureTaskId);

  useEffect(() => {
    if (boardLists.length === 0 && boardId) {
      dispatch(fetchBoardById(boardId));
      return;
    }

    if (localTask && (!selectedTask || selectedTask._id !== localTask._id)) {
      dispatch(openTaskDetails(localTask));

      dispatch(liveUpdateTask({ method: TaskOps.FETCH, workId: 'tasks' }));
    }
  }, [boardLists, localTask, selectedTask, boardId, dispatch, pureTaskId]);

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
  const method = 'update';
  const handleTitleChange = (update) => {
    console.log('handleTitleChange', update);
    dispatch(liveUpdateTask({ title: update, workId, method }));
  };
  const cover = selectedTask.cover;

  return (
    <div className="td-modal">
      <div className={`td-container${cover ? ' has-cover' : ''}`}>
        {cover && (
          <div
            className={
              cover.coverType === 'image' ? 'td-cover td-cover--image' : 'td-cover td-cover--color'
            }
            style={{
              backgroundImage: cover.coverType === 'image' ? `url(${cover.coverImg})` : undefined,
              backgroundColor: cover.coverType === 'color' ? cover.coverColor : undefined,
            }}>
            <button
              className="td-cover-close"
              style={{
                opacity: cover.coverType === 'image' ? '1' : '0.6',
                backgroundColor: cover.coverType === 'color' ? cover.coverColor : '#f7f8f9',
              }}
              onClick={handleClose}>
              <SvgServices name="SvgcloseTop" />
            </button>

            <DropdownUi
              trigger={
                <button
                  className="td-cover-open"
                  style={{
                    opacity: cover.coverType === 'image' ? '1' : '0.6',
                    backgroundColor: cover.coverType === 'color' ? cover.coverColor : '#f7f8f9',
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
              <div
                className="td-checkbox"
                onClick={() => {
                  const method = TaskOps.UPDATE;

                  dispatch(liveUpdateTask({ isDueComplete: !isDueComplete, workId, method }));
                }}>
                {isDueComplete ? (
                  <span className="DoneSvg">
                    <SvgServices name="taskDetailsDone" />
                  </span>
                ) : (
                  <span className='UndoneSvg'>
                    {' '}
                    <SvgServices name="taskDetailsUnDone" />
                  </span>
                )}
              </div>
            </div>

            <textarea
              style={{
                color: isDueComplete === false ? '#172b4d' : '#626f86',
              }}
              className="td-title-input"
              value={task?.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter task title"
            />
          </div>
          {!cover && (
            <button className="td-cover-close-modal" onClick={handleClose}>
              <SvgServices name="SvgcloseTop" />
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
            {task?.attachments?.length > 0 && <AttachmentUi />}
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
