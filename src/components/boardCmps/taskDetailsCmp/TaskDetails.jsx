import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeTaskDetails,
  liveUpdateTask,
  openTaskDetails,
  
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
  //Grab params—guard against undefined
  const { taskId = '', boardId } = useParams();
  const pureTaskId = taskId ? taskId.split('-')[0] : '';
  

  //Pulling from Redux state
const selectedTask = useSelector(
    (state) => state.taskDetailsReducer?.selectedTask
  )
  const board = useSelector((s) => s.boardReducer);
  const boardLists = board.boardLists || [];

  const cover = selectedTask?.cover;

 const  isDueComplete  = selectedTask?.isDueComplete;

 const workId = 'tasks';
  const method = 'update';


  const slug =
    board.slug ||
    board.boardTitle?.toLowerCase().replace(/\s+/g, '-') ||
    'board';


    //Find the task inside boardLists
  const localTask = boardLists
    .flatMap((list) => list.taskList || [])
    .find((t) => t._id === pureTaskId);


// Socket: join room + listen for updates

  

  useEffect(() => {
    if (!pureTaskId) return;

    socket.connect();
    socket.emit('joinTask', pureTaskId);

    return () => {
      socket.disconnect();
    };
  }, [pureTaskId]);

  useEffect(() => {
    const handleServerUpdate = (updatedTask) => {
      dispatch(updateSelectedTaskLive(updatedTask));
    };
    socket.on('taskUpdated', handleServerUpdate);

    return () => {
      socket.off('taskUpdated', handleServerUpdate);
    };
  }, [dispatch]);



// Load board ➞ open task details
  
  useEffect(() => {
    if (boardLists.length === 0 && boardId) {
      // If no lists yet, fetch the board
      dispatch(fetchBoardById(boardId));
      return;
    }

    if (
      localTask &&
      (!selectedTask || selectedTask._id !== localTask._id)
    ) {
      dispatch(openTaskDetails(localTask));
      dispatch(
        liveUpdateTask({ method: TaskOps.FETCH, workId: 'tasks' })
      );
    }
  }, [
    boardLists,
    localTask,
    selectedTask,
    boardId,
    dispatch,
    pureTaskId,
  ]);



 //  Pressing Escape should close the modal
  useEffect(() => {
    const hanldeEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', hanldeEsc);
    return () => window.removeEventListener('keydown', hanldeEsc);
  }, []);



    //  Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  },[]);






 
// closing the modal and navigating back into the board
  function handleClose() {
    dispatch(closeTaskDetails());
    navigate(`/b/${board._id}/${slug}`);
  }




// Title change handler
  const handleTitleChange = (update) => {
   
    dispatch(liveUpdateTask({ title: update, workId, method }));
  };

    if (!selectedTask) {
    // You could replace <div/> with a spinner or null or any other animation by
    // your choose.
    return <div />;
  }
  return (
    <div className="td-modal">
      <div className={`td-container${cover ? ' has-cover' : ''}`}>
        {cover && (
          <div
              className={
                cover.coverType === 'image'
                  ? 'td-cover td-cover--image'
                  : 'td-cover td-cover--color'
              }
              style={{
                backgroundImage:
                  cover.coverType === 'image'
                    ? `url(${cover.coverImg})`
                    : undefined,
                backgroundColor:
                  cover.coverType === 'color'
                    ? cover.coverColor
                    : undefined,
              }}
              >
            <button
                className="td-cover-close"
                style={{
                  opacity: cover.coverType === 'image' ? 1 : 0.6,
                  backgroundColor:
                    cover.coverType === 'color'
                      ? cover.coverColor
                      : '#f7f8f9',
                }}
                onClick={handleClose}
              >
              <SvgServices name="SvgcloseTop" />
            </button>

            <DropdownUi
              trigger={
                <button
                  className="td-cover-open"
                  style={{
                    opacity: cover.coverType === 'image' ? '1' : '0.6',
                    backgroundColor: 
                    cover.coverType === 'color' 
                    ? cover.coverColor
                     : '#f7f8f9',
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
                color: !isDueComplete ? '#172b4d' : '#626f86',
              }}
              className="td-title-input"
              value={selectedTask?.title || ''}
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
              {selectedTask?.members?.length > 0 && <TaskDetailsMembers />}
              {selectedTask?.labels?.length > 0 && <TaskDetailsLabel />}
              <TaskDetailsNotifcations />
              {selectedTask?.taskDueDate &&  <TaskDetailsDate />}
            </div>

            <TaskDescription />
            <div className='TaskDescriptionSpacing' />
            {selectedTask?.attachments?.length > 0 && <AttachmentUi />}
            {selectedTask?.checklist?.length > 0 && <TaskChecklist />}
           <TaskDetailsActivity />
          </div>

          <TaskDetailsSidebar />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
