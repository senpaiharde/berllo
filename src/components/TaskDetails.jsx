import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    closeTaskDetails,
    liveUpdateTask, 
    openTaskDetails,
    addChecklistItem,
    toogleChecklistItem,
    editChecklistItem,
    deleteChecklistItem, } from "../redux/taskDetailsSlice"
import { useNavigate, useParams } from "react-router-dom";
import '../styles/taskDetails.scss';



const TaskDetails = () =>{
    

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {taskId, boardId} = useParams();
    const pureTaskId = taskId.split('-')[0];
   
    const taskDetailsState = useSelector((state) => state.taskDetailsReducer || {});
    const { selectedTask, isOpen } = taskDetailsState;
    const boardLists = useSelector((state) => state.boardReducer.boardLists);
    


    useEffect(() => {
       
         //console.log(" taskId param:", taskId);
        if (!selectedTask && taskId && boardLists.length > 0) {
          const task = boardLists
            .flatMap((list) => list.taskList || [])
            .find((task) => task._id === pureTaskId);
      
          if (task && (!selectedTask || selectedTask.id !== task.id)) {
            dispatch(openTaskDetails(task));
          }
        }
      }, [selectedTask?.id , taskId, boardLists, dispatch]);
    
    useEffect(()=>{
        const hanldeEsc = (e) => {
            if(e.key === 'Escape') handleClose()
        };
    window.addEventListener('keydown', hanldeEsc);
    return () => window.removeEventListener('keydown', hanldeEsc)
    },[])

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    })

      if (!selectedTask) return <div className="task-details-loading">Loading task...</div>;

    const handleClose = () => {
        dispatch(closeTaskDetails());
        navigate(-1);   
    };


    const handleTitleChange = (e) => {
        dispatch(liveUpdateTask({taskTitle: e.target.value}))
    };

    const handleDescriptionChange = (e) => {
        dispatch(liveUpdateTask({ taskDescription: e.target.value }));
      };
      


      return (
        <div className="task-details-modal">
          <div className="task-details-backdrop" onClick={handleClose} />
    
          <div className="task-details-container">
            {/* LEFT SIDE */}
            <div className="task-details-left">
              <div className="task-title-section">
                <input
                  type="checkbox"
                  className="task-done-toggle"
                  title="Mark as Done"
                />
                <input
                  type="text"
                  className="task-title"
                  value={selectedTask.taskTitle || ""}
                  onChange={handleTitleChange}
                />
                <button className="task-close-btn" onClick={handleClose}>✕</button>
              </div>
    
              <div className="section">
                <div className="section-header">Description</div>
                <textarea
                  className="task-description"
                  value={selectedTask.taskDescription || ""}
                  onChange={handleDescriptionChange}
                />
              </div>
    
              <div className="section">
                <div className="section-header">Checklist</div>
                {selectedTask.taskCheckList?.map((item) => (
                  <div key={item.id} className="checklist-item">
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
                <button onClick={() => dispatch(addChecklistItem("new item"))}>+ Add Checklist Item</button>
              </div>
    
              <div className="section">
                <div className="section-header">Activity</div>
                <input type="text" placeholder="Write a comment..." />
              </div>
            </div>
    
            {/* RIGHT SIDE ACTIONS */}
            <div className="task-details-right">
              <div className="section-header">Add to card</div>
              <button className="action-button">Members</button>
              <button className="action-button">Labels</button>
              <button className="action-button">Checklist</button>
              <button className="action-button">Dates</button>
              <button className="action-button">Attachment</button>
              <button className="action-button">Location</button>
              <button className="action-button">Cover</button>
              <button className="action-button">Custom Fields</button>
    
              <div className="divider" />
    
              <div className="section-header">Actions</div>
              <button className="action-button">Move</button>
              <button className="action-button">Copy</button>
              <button className="action-button">Make template</button>
              <button className="action-button">Archive</button>
              <button className="action-button">Share</button>
            </div>
          </div>
        </div>
      );
    };
export default TaskDetails