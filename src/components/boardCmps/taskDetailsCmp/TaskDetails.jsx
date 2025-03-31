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
import TaskDetailsSidebar from "./sidebar/TaskDetailsSidebar";
import TaskDescription from "./main/TaskDetailsDescription";
const TaskDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId, boardId } = useParams();
  const pureTaskId = taskId.split("-")[0];

  const taskDetailsState = useSelector((state) => state.taskDetailsReducer || {});
  const { selectedTask, isOpen } = taskDetailsState;
  const boardLists = useSelector((state) => state.boardReducer.boardLists);

  useEffect(() => {
    if (!selectedTask && taskId && boardLists.length > 0) {
      const task = boardLists
        .flatMap((list) => list.taskList || [])
        .find((task) => task._id === pureTaskId);

      if (task && (!selectedTask || selectedTask.id !== task.id)) {
        dispatch(openTaskDetails(task));
      }
    }
  }, [selectedTask?.id, taskId, boardLists, dispatch]);

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

  if (!selectedTask) return <div className="td-loading">Loading task...</div>;

  const handleClose = () => {
    dispatch(closeTaskDetails());
    navigate(-1);
  };

  const handleTitleChange = (e) => {
    dispatch(liveUpdateTask({ taskTitle: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    dispatch(liveUpdateTask({ taskDescription: e.target.value }));
  };

  return (
    <div className="td-modal">
      <div className="td-backdrop" onClick={handleClose} />

      <div className="td-container">
        <div className="td-header">
          <div className="td-header-left">
            <input type="checkbox" className="td-checkbox" />
            <textarea
              className="td-title-input"
              value={selectedTask.taskTitle || ""}
              onChange={handleTitleChange}
              placeholder="Enter task title"
            />
          </div>
          <button className="td-close-btn" onClick={handleClose}>✕</button>
        </div>

        <div className="td-inlist-text">
          in list <span><button className="td-inlist-text-button">Backlog - Server</button></span>
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

            <div className="td-section">
              <div className="td-section-header">Checklist</div>
              {selectedTask.taskCheckList?.map((item) => (
                <div key={item.id} className="td-checklist-item">
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    onChange={() => dispatch(toogleChecklistItem(item.id))}
                  />
                  <input
                    type="text"
                    value={item.text || ""}
                    onChange={(e) =>
                      dispatch(editChecklistItem({ id: item.id, text: e.target.value }))
                    }
                  />
                  <button onClick={() => dispatch(deleteChecklistItem(item.id))}>✕</button>
                </div>
              ))}
              <button onClick={() => dispatch(addChecklistItem("New Item"))}>
                + Add Checklist Item
              </button>
            </div>

            <TaskDetailsActivity />
          </div>

          <TaskDetailsSidebar/>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
