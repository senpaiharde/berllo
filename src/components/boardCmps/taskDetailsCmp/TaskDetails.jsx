import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeTaskDetails,
  liveUpdateTask,
  openTaskDetails,
  addChecklistItem,
  toogleChecklistItem,
  editChecklistItem,
  deleteChecklistItem,
} from "../../../redux/taskDetailsSlice";
import { useNavigate, useParams } from "react-router-dom";

import { User, Tag, Calendar, Paperclip, MapPin, Image, Settings, Copy, Archive, Share } from 'lucide-react';
import TaskDetailsMembers from "./TaskDetailsMembers";
import TaskDetailsLabel from "./TaskDetailsLabel";
import TaskDetailsNotifcations from "./TaskDetailsNotifcations";
import TaskDetailsDate from "./TaskDetailsDate";
import TaskDetailsActivity from "./main/TaskDetailsActivity";
import TaskDetailsSidebar from "./main/sidebar/TaskDetailsSidebar";
import TaskDescription from "./main/TaskDetailsDescription";
import TaskChecklist from "./main/TaskdetailsChecklist";
import { fetchBoardById } from "../../../redux/BoardSlice";
const TaskDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId, boardId } = useParams();
  const pureTaskId = taskId.split("-")[0];

  const selectedTask = useSelector((state) => state.taskDetailsReducer.selectedTask);

  const boardLists = useSelector((state) => state.boardReducer.boardLists);

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
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", hanldeEsc);
    return () => window.removeEventListener("keydown", hanldeEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  if (!selectedTask) return <div></div>
  // if (!selectedTask) return <div className="td-loading">Loading task...</div>;

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
            <input type="radio" className="td-checkbox"/>
            </div>

            <textarea
              className="td-title-input"
              value={selectedTask.taskTitle || ""}
              onChange={handleTitleChange}
              placeholder="Enter task title"
            />
          </div>
          <button className="td-close-btn" onClick={handleClose}><svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="currentColor"
          
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
          />
        </svg></button>
        </div>

        <div className="td-inlist-text">
          in list <span><button className="notification-button"
                style={{
                  display: "inline-flex",
                  boxSizing: "border-box",
                  alignItems: "center",
                  justifyContent: "center",
                  
                  borderRadius: "3px",
                  textDecoration: "none",
                  whiteSpace: "normal",
                  border: "none",
                  boxShadow: "none",
                  color: "#44546F",
                  fontWeight: 800,
                  fontSize: '11px',
                  
                 paddingRight: '4px',
                  marginTop: "-1px",
                  paddingTop: '2px',
                  paddingBottom: '2px', 
                  marginBottom: "-10px", 
                  paddingLeft: '2px'
                }}>BACKLOG-SERVER 
                <svg
                width="14px"
                height="14px"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                 marginLeft:'-5px',
                }}
              >
                <path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
              /></svg></button> <svg
              
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
               justifyContent:'center',
                textAlign: 'center',
               marginLeft:'5px',
               marginTop: "-px",
               marginBottom: "-4px",
              }}
            >
              <path d="M12.0006 18C7.46367 18 4.00142 13.74 4.00142 12C4.00142 9.999 7.45967 6 12.0006 6C16.3775 6 19.9988 9.973 19.9988 12C19.9988 13.74 16.5366 18 12.0006 18ZM12.0006 4C6.48003 4 2.00012 8.841 2.00012 12C2.00012 15.086 6.5771 20 12.0006 20C17.4241 20 22.0001 15.086 22.0001 12C22.0001 8.841 17.5212 4 12.0006 4ZM11.9775 13.9844C10.8745 13.9844 9.97752 13.0874 9.97752 11.9844C9.97752 10.8814 10.8745 9.9844 11.9775 9.9844C13.0805 9.9844 13.9775 10.8814 13.9775 11.9844C13.9775 13.0874 13.0805 13.9844 11.9775 13.9844ZM11.9775 7.9844C9.77152 7.9844 7.97752 9.7784 7.97752 11.9844C7.97752 14.1904 9.77152 15.9844 11.9775 15.9844C14.1835 15.9844 15.9775 14.1904 15.9775 11.9844C15.9775 9.7784 14.1835 7.9844 11.9775 7.9844Z"
            /></svg></span>
        </div>

        <div className="td-main">
          <div className="td-main-left">
          <div className="td-section-top">


         <TaskDetailsMembers/>
  
            <TaskDetailsLabel/>

            <TaskDetailsNotifcations/>

            <TaskDetailsDate/>

            </div>
            <TaskDescription/>
            <div style={{ marginTop: "-42px" }}></div>

            <TaskChecklist/>

            <TaskDetailsActivity />
          </div>

          <TaskDetailsSidebar/>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
