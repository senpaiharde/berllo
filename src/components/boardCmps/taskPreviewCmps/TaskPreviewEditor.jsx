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
import {
  openTaskDetails,
  liveUpdateTask,
} from "../../../redux/taskDetailsSlice"
import { TaskPreviewLabels } from "./TaskPreviewLabels"
import TaskDetailsMembers from "../taskDetailsCmp/TaskDetailsMembers"
import { TextEditInput } from "../TextEditInput"
import { useSelector, useDispatch } from "react-redux"
import { p, tr } from "framer-motion/client"
import { TaskPreviewActions } from "./TaskPrieviewActions"
import { transformTaskFromBackend } from "../../../services/backendDataConverionToState"

export function TaskPreviewEditor({}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const previewEditorPosition = useSelector(
    (state) => state.boardReducer.previewEditorPositon
  )
  console.log("previewEditorPosition", previewEditorPosition)
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
  // console.log("displayWidth", displayWidth)
  //   const task = previewEditorPositon ? useSelector((state) => state.taskDetailsReducer.selectedTask) : null;
  const task = useSelector((state) => state.taskDetailsReducer.selectedTask)
  const [inputValue, setInputValue] = useState(task ? task.title : "")
  //   console.log("TaskPreviewEditor task", task.taskTitle)
  useEffect(() => {
    // console.log("TaskPreviewEditor task", task.taskTitle)
    if (task) {
      console.log("TaskPreviewEditor task", task.taskTitle)
      setInputValue(task.title)
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
  console.log("TaskPreviewEditor task", task)
  const TaskPreviewRef = useRef(null)
  const textValue = task ? task.taskTitle : ""

  const convertedTask = task ? transformTaskFromBackend(task) : null
  return (
    <div
      className="editor-background"
      style={{ display: display }}
      onClick={(e) => {
        console.log("editor-background clicked")
        dispatch(updatePreviewEditorPositon(undefined))
        e.stopPropagation()
      }}
    >
      <div className="task-preview-editor-container" style={displayPosition}
      onClick={(e) => {
         e.stopPropagation()
      }}>
        <form>
          <div
            className="task-preview"
            style={{ ...displayWidth, backgroundColor: "#ffffff" }}
          >
            {task && task.cover && (
              <div
                className={
                  task.cover.coverType === "image"
                    ? "task-front-cover task-front-cover--image"
                    : "task-front-cover task-front-cover--color"
                }
                // className="task-front-cover"
                style={{
                  backgroundImage:
                    task.cover.coverType === "image"
                      ? `url(${task.cover.coverImg})`
                      : undefined,
                  backgroundColor:
                    task.cover.coverType === "color"
                      ? task.cover.coverColor
                      : undefined,
                  height:
                    task.cover.coverType === "image" && imageHeight
                      ? `${imageHeight}px`
                      : undefined,
                }}
              ></div>
            )}
            <div className="task-preview-details">
              <div className="task-preview-labels">
                {task && <TaskPreviewLabels task={convertedTask}></TaskPreviewLabels>}
              </div>
              <div className="task-preview-header">
                <span className="task-preview-header-title">
                  {/* <a style={{ fontSize: 14 }}>{task.taskTitle}</a> */}
                  <textarea
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log("textarea clicked")
                    }}
                    className={"edit-task-textarea"}
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
              {task && (
                <div className="task-preview-info">
                  {task && (
                    <TaskInfoBadges task={convertedTask}></TaskInfoBadges>
                  )}
                  <div className="task-preview-info-users">
                    {convertedTask.taskMembers &&
                      convertedTask.taskMembers
                        .filter(
                          (member) =>
                            member &&
                            typeof member === "object" &&
                            member.avatar
                        )
                        .map((member) => (
                          <button
                            key={member._id || member.id}
                            className="td-section-members-button"
                          >
                            <img
                              src={member.avatar}
                              alt={`Member ${member._id || member.id}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "100%",
                              }}
                            />
                          </button>
                        ))}
                  </div>
                </div>
              )}
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
        <TaskPreviewActions
          task={task}
          parentPosition={previewEditorPosition}
        />
      </div>
    </div>
  )
}
