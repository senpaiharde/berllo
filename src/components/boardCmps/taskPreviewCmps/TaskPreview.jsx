import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TaskInfoBadges } from "./TaskInfoBadges"
import { IconButton } from "../../IconButton"
import { ItemNameForm } from "../addItemCard/ItemNameForm"
import {
  removeTaskFromBoard,
  updateTaskInBoard,
} from "../../../redux/BoardSlice"
import { useDispatch } from "react-redux"
import { TaskPreviewLabels } from "./TaskPreviewLabels"
import TaskDetailsMembers from "../taskDetailsCmp/TaskDetailsMembers"
// import { getBaseUrl } from "../services/util.service.js"
// import { PropTypes } from "prop-types"

export function TaskPreview({ task, boardId, NewTask }) {
  // TaskPreview.propTypes = {
  //   Task: PropTypes.object.isRequired,
  // }
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [taskChecked, setTaskChecked] = useState(task.taskChecked)

  // useEffect(() => {

  // }, [taskChecked]);

  const [isNewtask, setIsNewTask] = useState(NewTask)
  if (task) {
    // console.log("Task",task)
  }

  function onUpdateTask(value) {
    console.log("onUpdateTask value", value)
    if (value === true || value === false) {
      dispatch(updateTaskInBoard({ ...task, taskChecked: value }))
    } else {
      dispatch(updateTaskInBoard({ ...task, taskTitle: value }))
    }
  }

  function onRemoveCurrentTask(value) {
    console.log("onRemoveCurrentTask", value)
    if (value) return
    console.log("removing task", task._id, " from ", task.taskList)
    dispatch(removeTaskFromBoard({ _id: task._id, taskList: task.taskList }))
  }

  const TaskPreviewRef = useRef(null)

  // function handleMouseEnter() {
  //   if (TaskPreviewRef.current) {
  //     // console.log("TaskPreviewRef.current", TaskPreviewRef.current)
  //     TaskPreviewRef.current.style.borderColor = "blue"
  //   }
  // }

  // function handleMouseLeave() {
  //   if (TaskPreviewRef.current) {
  //     TaskPreviewRef.current.style.borderColor = "transparent"
  //   }
  // }

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
      // ref={TaskPreviewRef}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
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
        <div style={{ padding: "10px", paddingLeft: "15px" }}>
          <ItemNameForm
            IsEditing={isNewtask}
            setIsEditing={setIsNewTask}
            noValueOnExit={onRemoveCurrentTask}
            onAddItem={onUpdateTask}
            itemType={"add task"}
          ></ItemNameForm>
          {/* <ItemNameForm
            IsEditing={isNewtask}
            setIsEditing={setIsNewTask}
            noValueOnExit={onRemoveCurrentTask}
            onAddItem={onUpdateTask}
            // itemType={"add task"}
          ></ItemNameForm>
          <div className="input-new-item-buttons">
            <div onClick={() => onChangeTextInput(inputValue)}>
              <button
                className="icon-container-button input-new-item-label"
                style={{ backgroundColor: "#0000FF", color: "#FFFFFF" }}
              >
                add list
              </button>
            </div>
            <div
              className="input-new-item-svg"
              onClick={(e) => {
                console.log("onRemoveCurrentList")
                onRemoveCurrentList()
              }}
            >
              <IconButton
                // onClick={(e) => {
                //   console.log("disableBlur = true")
                //   // disableBlur = true
                //   onRemoveCurrentList() // Prevent blur from firing
                // }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                  fill="currentColor"
                ></path>
              </IconButton>
            </div>
          </div> */}
        </div>
      ) : (
        <div
          style={{ display: "flex", flexGrow: 1, zIndex: 0 }}
          onClick={(e) => {
            if (!isNewtask) {
              console.log("🧠 Navigating to task:", task._id)
              navigate(
                `/b/${boardId}/board/${task._id}-${encodeURIComponent(
                  task.taskTitle
                )}`
              )
            }
          }}
        >
          <div className="task-front-cover"></div>
          <div className="task-preview-details">
            <div className="task-preview-labels">
              <TaskPreviewLabels task={task}></TaskPreviewLabels>
            </div>
            <div className="task-preview-header">
              <span className="task-preview-header-completion-status" onClick={(e) => {
                    e.stopPropagation()
                    // e.preventDefault()
                    setTaskChecked(!taskChecked)
                    onUpdateTask(!taskChecked)
                  }}>
                {/* <div style={{zIndex: 1, paddingRight: "6px"}}> */}

                {/* <input
                  type="checkbox"
                  id="taskChecked"
                  checked={taskChecked}
                  onClick={(e) => {
                    e.stopPropagation()
                    // e.preventDefault()
                    setTaskChecked(!taskChecked)
                    onUpdateTask(!taskChecked)
                  }}
                  onChange={setTaskChecked}
                ></input> */}
                {taskChecked && (
                  <IconButton iconSize={"25px"} offset={-8}>
                    <path
                      fill="#22a06b"
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m12.326-2.52-1.152-.96L6.75 9.828 4.826 7.52l-1.152.96 2.5 3a.75.75 0 0 0 1.152 0z"
                      clipRule="evenodd"
                    ></path>
                  </IconButton>
                )}
                {!taskChecked && (
                  <IconButton iconSize={"25px"} backgColor={"#ffffff"} offset={-8}>
                    <circle
                      cx="8"
                      cy="8"
                      r="7.25"
                      stroke="#626f86"
                      strokeWidth="1.5"
                    ></circle>
                  </IconButton>
                )}
                {/* </div> */}
              </span>
              <span className="task-preview-header-title">
                <a style={{ fontSize: 14 }}>{task.taskTitle}</a>
              </span>
            </div>
            <div className="task-preview-info">
              <TaskInfoBadges task={task}></TaskInfoBadges>
              <div className="task-preview-info-users">
                <TaskDetailsMembers style={{}} />
                {/* {task.taskMembers &&
                  task.taskMembers.map((member) => (
                    <span key={member} className="task-preview-user">
                      {member}
                    </span>
                  ))} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
