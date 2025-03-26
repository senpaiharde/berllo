import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { closeTaskDetails, liveUpdateTask, openTaskDetails } from "../redux/taskDetailsSlice"
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
      
          if (task) {
            dispatch(openTaskDetails(task));
          }
        }
      }, [selectedTask, taskId, boardLists, dispatch]);
    
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
      


    return(
        <div className="task-details-modal">
            <div className="task-details-backdrop" onClick={handleClose} />


            <div className="task-details-content">
                <button className="task-details-close" onClick={handleClose}>X</button>

                <input
                type="text"
                className="task-details-title"
                value={selectedTask.taskTitle || ''}
                onChange={handleTitleChange}/>


                <textarea className="task-details-description"
                value={selectedTask.taskDescription || ''}
                onChange={handleDescriptionChange}/>
            </div>
        </div>
    )
}
export default TaskDetails