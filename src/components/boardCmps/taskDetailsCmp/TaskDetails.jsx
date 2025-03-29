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
          in list: <span><button>Backlog / Server</button></span>
        </div>

        <div className="td-main">
          <div className="td-main-left">
            <div className="td-section">
              <div className="td-section-header">Description</div>
              <textarea
                className="td-description"
                value={selectedTask.taskDescription || ""}
                onChange={handleDescriptionChange}
              />
            </div>

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

            <div className="td-section">
              <div className="td-section-header">Activity</div>
              <input type="text" placeholder="Write a comment..." />
            </div>
          </div>

          <div className="td-sidebar">
          <button className="trello-btn"><User size={16} /> Leave</button>
        <button className="trello-btn"><User size={16} /> Members</button>
        <button className="trello-btn"><Tag size={16} /> Labels</button>
        <button className="trello-btn"><Calendar size={16} /> Dates</button>
        <button className="trello-btn"><Paperclip size={16} /> Attachment</button>
        <button className="trello-btn"><MapPin size={16} /> Location</button>
        <button className="trello-btn"><Image size={16} /> Cover</button>
        <button className="trello-btn"><Settings size={16} /> Custom Fields</button>

            <div></div>

             <div className="section-header">Actions</div>
             <button className="trello-btn"><Copy size={16} /> Move</button>
            <button className="trello-btn"><Copy size={16} /> Copy</button>
            <button className="trello-btn"><Copy size={16} /> Mirror</button>
            <button className="trello-btn"><Copy size={16} /> Copy</button>
            <button className="trello-btn"><Copy size={16} /> Make template</button>
            <div className="divider" ></div>
            <button className="trello-btn"><Archive size={16} /> Archive</button>
            <button className="trello-btn"><Share size={16} /> Share</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
