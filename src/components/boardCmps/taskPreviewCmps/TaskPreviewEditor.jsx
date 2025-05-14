import { useState, useRef, useEffect, use } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TaskInfoBadges } from "./TaskInfoBadges"
import { IconButton } from "../../IconButton"
import { ItemNameForm } from "../addItemCard/ItemNameForm"
import {
  removeTaskFromBoard,
  updateTaskInBoard,
  updatePreviewEditorPositon,
} from "../../../redux/BoardSlice"
import { openTaskDetails,liveUpdateTask } from "../../../redux/taskDetailsSlice"
import { TaskPreviewLabels } from "./TaskPreviewLabels"
import TaskDetailsMembers from "../taskDetailsCmp/TaskDetailsMembers"
import { TextEditInput } from "../TextEditInput"
import { useSelector, useDispatch } from "react-redux"
import { p, tr } from "framer-motion/client"
import { TaskPreviewActions } from "./TaskPrieviewActions"

export function TaskPreviewEditor({}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const previewEditorPosition = useSelector(
    (state) => state.boardReducer.previewEditorPositon
  )
  //   console.log("previewEditorPosition", previewEditorPosition)
  const display = previewEditorPosition ? "block" : "none"
  const displayPosition = previewEditorPosition
    ? {
        transform: `translate3d(${previewEditorPosition.x}px, ${previewEditorPosition.y}px, 0px)`,
      }
    : { transform: "translate3d(0px, 0px, 0px)" }
  const displayWidth = previewEditorPosition
    ? {
        width: `${previewEditorPosition.width}px`,
      }
    : { width: "0px" }
  console.log("displayWidth", displayWidth)
  //   const task = previewEditorPositon ? useSelector((state) => state.taskDetailsReducer.selectedTask) : null;
  const task = useSelector((state) => state.taskDetailsReducer.selectedTask)
  const [inputValue, setInputValue] = useState("")
  //   console.log("TaskPreviewEditor task", task.taskTitle)
  useEffect(() => {
    // console.log("TaskPreviewEditor task", task.taskTitle)
    if (task) {
      console.log("TaskPreviewEditor task", task.taskTitle)
      setInputValue(task.taskTitle)
    }
  }, [task])

  function onUpdateTask(value) {
    // console.log("onUpdateTask value", value)
    if (value !== "true") {
    //   dispatch(updateTaskInBoard({ ...task, taskChecked: value }))
      dispatch(liveUpdateTask({ taskTitle: value }))
    }
    dispatch(openTaskDetails(null))
    dispatch(updatePreviewEditorPositon(null))
  }

  function onRemoveCurrentTask(value) {
    console.log("onRemoveCurrentTask", value)
    if (value) return
    console.log("removing task", task._id, " from ", task.taskList)
    dispatch(removeTaskFromBoard({ _id: task._id, taskList: task.taskList }))
  }

  const TaskPreviewRef = useRef(null)
  const textValue = task ? task.taskTitle : ""
  return (
    <div className="editor-background" style={{ display: display }}>
      <div className="task-preview-editor-container" style={displayPosition}>
        <form>
          <div className="task-preview" style={displayWidth}>
            <div className="task-front-cover"></div>
            <div className="task-preview-details">
              <div className="task-preview-labels">
                {task && <TaskPreviewLabels task={task}></TaskPreviewLabels>}
              </div>
              <div className="task-preview-header">
                <span className="task-preview-header-title">
                  {/* <a style={{ fontSize: 14 }}>{task.taskTitle}</a> */}
                  <textarea
                    className={"input-new-item-new-task-textarea"}
                    dir="auto"
                    autoFocus={true}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && onUpdateTask(inputValue)
                    }
                    // placeholder={itemType}
                    // style={textareaSize}
                  ></textarea>
                </span>
              </div>
              <div className="task-preview-info">
                {task && <TaskInfoBadges task={task}></TaskInfoBadges>}
                <div className="task-preview-info-users">
                  <TaskDetailsMembers style={{}} />
                </div>
              </div>
            </div>
          </div>
          <button
            className="task-preview-editor-save-button"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              onUpdateTask(inputValue)
            }}
          >
            Save
          </button>
        </form>
        <TaskPreviewActions parentPosition={previewEditorPosition}/>
      </div>
    </div>
  )
}
