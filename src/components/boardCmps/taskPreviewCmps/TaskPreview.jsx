import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TaskInfoBadges } from "./TaskInfoBadges"
import { IconButton } from "../../IconButton"
import { ItemNameForm } from "../addItemCard/ItemNameForm"
import { removeTaskFromBoard, updateTaskInBoard } from "../../../redux/BoardSlice"
import { useDispatch } from "react-redux"
// import { getBaseUrl } from "../services/util.service.js"
// import { PropTypes } from "prop-types"

export function TaskPreview({ task, boardId, NewTask }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // TaskPreview.propTypes = {
  //   Task: PropTypes.object.isRequired,
  // }
  const [isNewtask,setIsNewTask] = useState(NewTask)
  if (task) {
    // console.log("Task",task)
  }
  
  function onUpdateTask(value) {
    
    dispatch(updateTaskInBoard({...task , taskTitle: value}))
  }

  function onRemoveCurrentTask(value){
    console.log("onRemoveCurrentTask",value)
    if(value) return
    console.log("removing task",task._id," from ",task.taskList)
    dispatch(removeTaskFromBoard({_id: task._id, taskList: task.taskList}))
  }

  const TaskPreviewRef = useRef(null)

  function handleMouseEnter() {
    if (TaskPreviewRef.current) {
      // console.log("TaskPreviewRef.current", TaskPreviewRef.current)
      TaskPreviewRef.current.style.borderColor = "blue"
    }
  }

  function handleMouseLeave() {
    if (TaskPreviewRef.current) {
      TaskPreviewRef.current.style.borderColor = "transparent"
    }
  }

  function getReleventDate(date) {
    const options = { month: "long", day: "numeric" }
    if (date)
      //return  new Date(date).toISOString().split("T")[0]
      return new Date(date).toLocaleDateString("en-US", options)
  }
  // isNewTask =true
  return (
    <div
      className="task-preview"
      ref={TaskPreviewRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      //onClick={() => navigate(`/b/${task.taskBoard}/${task._id}`)}
      // onClick={(e) => {
      //   if(!isNewtask){
      //   console.log("🧠 Navigating to task:", task._id)
      //    navigate(
      //     `/b/${boardId}/board/${task._id}-${encodeURIComponent(
      //       task.taskTitle
      //     )}`
      //   )}
      // }}
    >
      {isNewtask ? (
        <div style={{padding: "10px", paddingLeft: "15px"}}>
          <ItemNameForm
          IsEditing={isNewtask}
          setIsEditing={setIsNewTask}
          noValueOnExit={onRemoveCurrentTask}
          onAddItem={onUpdateTask}
          itemType={"add task"}
        ></ItemNameForm>
        </div>
      ) : (
        <div onClick={(e) => {
          if(!isNewtask){
          console.log("🧠 Navigating to task:", task._id)
           navigate(
            `/b/${boardId}/board/${task._id}-${encodeURIComponent(
              task.taskTitle
            )}`
          )}
        }}>
          <div className="task-front-cover"></div>
          <div className="task-preview-details">
            <div className="task-preview-labels"></div>
            <div className="task-preview-header">
              <span className="task-preview-header-completion-status">
                <IconButton>
                  <circle></circle>
                </IconButton>
              </span>
              <span className="task-preview-header-title">
                <a style={{fontSize: 14}}>{task.taskTitle}</a>
              </span>
            </div>
            <div className="task-preview-info">
              <TaskInfoBadges task={task}></TaskInfoBadges>
              <div className="task-preview-info-users">
                {task.taskMembers &&
                  task.taskMembers.map((member) => (
                    <span key={member} className="task-preview-user">
                      {member}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
