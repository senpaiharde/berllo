import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { closeTaskDetails, liveUpdateTask, openTaskDetails } from "../redux/taskDetailsSlice"
import { useNavigate, useParams } from "react-router-dom";




const TaskDetails = () =>{
    console.log("🔥 TaskDetails mounted");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {taskId, boardId} = useParams();
    const pureTaskId = taskId.split('-')[0];
   
    
    const {selectedTask} = useSelector((state) => state.taskDetails);
    const boardLists = useSelector((state) => state.boardReducer.boardLists);
    console.log("TaskDetails mounted");
    console.log("boardId:", boardId);
    console.log(" taskId:", taskId);
    console.log("boardLists:", boardLists);


    useEffect(() => {
        if (!selectedTask && taskId && boardLists) {
          const task = boardLists
            .flatMap((list) => list.taskList || [])
            .find((task) => task._id === pureTaskId);
      
          if (task) {
            dispatch(openTaskDetails(task));
          }
        }
      }, [selectedTask, taskId, boardLists, dispatch]);
    if(!selectedTask)return null;

    const handleClose = () => {
        dispatch(closeTaskDetails());
        navigate(-1);   
    };


    const handleTitleChange = (e) => {
        dispatch(liveUpdateTask({taskTitle: e.target.value}))
    };

    const handleDescriptionChange = (e) => {
        dispatch(liveUpdateTask({ taskDescription: e.target.value }))

    }


    return(
        <div className="task-details-modal">
            <div className="task-details-backdrop" onClick={handleClose} />


            <div className="task-details-content">
                <button className="task-details-close" onClick={handleClose}>X</button>

                <input
                type="text"
                className="task-details-title"
                value={selectedTask.title}
                onChange={handleTitleChange}/>


                <textarea className="task-details-description"
                value={selectedTask.description || ''}
                onChange={handleDescriptionChange}/>
            </div>
        </div>
    )
}
export default TaskDetails