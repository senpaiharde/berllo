import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TaskInfoBadges } from "./TaskInfoBadges"
import { IconButton } from "../../IconButton"
import { ItemNameForm } from "../addItemCard/ItemNameForm"
import {
  removeTaskFromBoard,
  updateTaskInBoard,
  updatePreviewEditorPositon,
  syncBoardAsync,
} from "../../../redux/BoardSlice"
import {
  openTaskDetails,
  syncTaskAsync,
  liveUpdateTask,
} from "../../../redux/TaskDetailsSlice"
import { useDispatch } from "react-redux"
import { TaskPreviewLabels } from "./TaskPreviewLabels"
import TaskDetailsMembers from "../taskDetailsCmp/TaskDetailsMembers"
import { Draggable } from "@hello-pangea/dnd"
import { TaskOps } from "../../../services/backendHandler"
import api from "../../../api/api"


export function TaskPreview({
  task,
  boardId,
  NewTask,
  onAddedNewTask,
  index,
  taskListById,
}) {
  // TaskPreview.propTypes = {
  //   Task: PropTypes.object.isRequired,
  // }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const taskCover = () => {
    if (task.taskCover) {
      if (task.taskCover.coverType === "image") {
        return { backgroundImage: `url(${task.taskCover.coverImg})` }
      }
      if (task.taskCover.coverType === "color") {
        return { backgroundColor: task.taskCover.coverColor }
      }
    }
    return ""
  }
  const [imageHeight, setImageHeight] = useState(null)

  useEffect(() => {
    if (task.taskCover.coverType === "image") {
      const img = new Image()
      img.src = task.taskCover.coverImg
      img.onload = () => {
        setImageHeight(img.height * 0.7) // 70% of image height
      }
    }
  }, [task])

  const [taskChecked, setTaskChecked] = useState(task.taskChecked)

  useEffect(() => {
    setTaskChecked(task.taskChecked)
  }, [task])

  const [isNewtask, setIsNewTask] = useState(NewTask)

  async function onUpdateTask(value) {
    // console.log("onUpdateTask value", value)
    if (value === true || value === false) {
      dispatch(
        updateTaskInBoard({
          task: { ...task, taskChecked: value },
          fromBoard: true,
        })
      )
      dispatch(openTaskDetails(task))

      // c) then fetch the real details from the API
      dispatch(liveUpdateTask({ method: TaskOps.FETCH, workId: "tasks" }))
      dispatch(
        liveUpdateTask({
          isDueComplete: value,
          workId: "tasks",
          method: TaskOps.UPDATE,
        })
      )
    } else {
      // dispatch(updateTaskInBoard({ ...task, taskTitle: value }))
      // console.log("updating task title", value)
      // console.log("task", task)
      // dispatch(
      //   syncTaskAsync({
      //     method: TaskOps.ADD,
      //     args: {
      //       body: {
      //         method: TaskOps.ADD,
      //         workId: "tasks",
      //         board: task.taskboard,
      //         title: value,
      //         position: task.position,
      //         listId: task.taskList,
      //       },
      //     },

      //     workId: "tasks",
      //   })
      // )
      const NewTaskFromBackend = await addTaskToBackend(value)
      console.log("NewTaskFromBackend", NewTaskFromBackend)

      dispatch(updateTaskInBoard( {NewTaskFromBackend, newTask: true})) 
      onAddedNewTask()
    }
  }
  async function addTaskToBackend(value) {
    const body = {
      method: TaskOps.ADD,
      workId: "tasks",
      board: task.taskboard,
      title: value,
      position: task.position,
      listId: task.taskList,
    }
    try {
      const resp = await api.post(`/${body.workId}/`, body)
      console.log("addTaskToBackend resp", resp)
      const taskk = resp.data
      console.log("addTaskToBackend taskk", taskk)
      return taskk;
    } catch (error) {
      console.error("Error adding task to backend:", error)
      return null
    }
  }
  function onDeleteTask() {
    console.log(
      "onDeleteTask task._id",
      task._id,
      "task.taskList",
      task.taskList
    )
    onRemoveCurrentTask()
    deleteTaskFromList()
    // delete task from backend
    dispatch(
      syncBoardAsync({
        method: TaskOps.DELETE,
        args: {
          taskId: task._id,
          body: {
            method: TaskOps.DELETE,
            workId: "tasks",
            listId: task.taskList,
          },
        },

        workId: "tasks",
      })
    )
  }

  function deleteTaskFromList() {
    console.log("taskList", taskListById)
    console.log("taskList", taskListById, " remove :", task._id)
    const index = taskListById.indexOf(task._id)
    if (index !== -1) {
      taskListById.splice(index, 1)
    }

    console.log("new boardListById", taskListById)
    // delete task from list taskList in backend
    dispatch(
      syncBoardAsync({
        method: TaskOps.UPDATE,
        args: {
          body: {
            method: TaskOps.UPDATE,
            workId: "list",
            taskList: taskListById,
          },
          taskId: task.taskList,
        },

        workId: "list",
      })
    )
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

  const elementRef = useRef(null)

  function getElementPosition() {
    const rect = elementRef.current?.getBoundingClientRect()
    console.log("getElementPosition", rect.width)
    // if (rect) {
    //   console.log("X:", rect.x, "Y:", rect.y)
    //   console.log("Top:", rect.top, "Left:", rect.left)
    // }
    return {
      width: rect.width,
      x: rect.x,
      y: rect.y,
    }
  }

  function openPreviewEditor() {
    // console.log("openPreviewEditor", getElementPosition())
    dispatch(openTaskDetails({ _id: task._id }))
    dispatch(liveUpdateTask({ method: TaskOps.FETCH, workId: "tasks" }))
    dispatch(updatePreviewEditorPositon(getElementPosition()))
  }

  return (
    <div
      className="task-preview parent-container"
      ref={elementRef}
      onClick={(e) => {
        console.log("onClick task preview", task._id)
        if (!isNewtask) {
          console.log("🧠 Navigating to task:", task._id)
          // navigate(
          //   `/b/${boardId}/board/${task._id}
          //   -${encodeURIComponent(
          //     task.taskTitle
          //   )}`

          // )
          navigate(`/b/${boardId}/board/${task._id}`)
        } else {
          console.log(
            "cannont Navigating to task:",
            task._id,
            "isNewtask=",
            isNewtask
          )
        }
      }}
    >
      {isNewtask ? (
        <ItemNameForm
          IsEditing={isNewtask}
          setIsEditing={setIsNewTask}
          noValueOnExit={onRemoveCurrentTask}
          isNewItem={true}
          isList={false}
          onAddItem={onUpdateTask}
          itemType={"add task"}
        ></ItemNameForm>
      ) : (
        <Draggable
          draggableId={task._id}
          index={index}
          style={{ backgroundColor: "#ffffff" }}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
                className="task-preview"
                style={{
                  backgroundColor: "#ffffff",
                }}
              >
                {task.taskCover.coverType !== "" &&
                  task.taskCover.coverType && (
                    <div
                      className={
                        task.taskCover.coverType === "image"
                          ? "task-front-cover task-front-cover--image task-preview-img"
                          : "task-front-cover task-front-cover--color"
                      }
                      // className="task-front-cover"
                      style={{
                        backgroundImage:
                          task.taskCover.coverType === "image"
                            ? `url(${task.taskCover.coverImg})`
                            : undefined,
                        backgroundColor:
                          task.taskCover.coverType === "color"
                            ? task.taskCover.coverColor
                            : undefined,
                        height:
                          task.taskCover.coverType === "image" && imageHeight
                            ? `${imageHeight}px`
                            : undefined,
                      }}
                    ></div>
                  )}
                <div className="task-preview-details">
                  <div className="task-preview-labels">
                    <TaskPreviewLabels task={task}></TaskPreviewLabels>
                  </div>
                  <div className="task-preview-header">
                    <span
                      className="task-preview-header-completion-status"
                      onClick={(e) => {
                        e.stopPropagation()
                        // e.preventDefault()
                        setTaskChecked(!taskChecked)
                        onUpdateTask(!taskChecked)
                      }}
                    >
                      {taskChecked && (
                        <IconButton
                          
                          alternativeViewBox={"0 0 16 16"}
                          iconSize={"16px"}
                          displayOnHover={false}
                          textColor={"#ffffff"}
                        >
                          <path
                            fill="#22a06b"
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m12.326-2.52-1.152-.96L6.75 9.828 4.826 7.52l-1.152.96 2.5 3a.75.75 0 0 0 1.152 0z"
                            clipRule="evenodd"
                          ></path>
                        </IconButton>
                      )}
                      {!taskChecked && (
                        <IconButton
                          alternativeViewBox={"0 0 16 16"}
                          iconSize={"16px"}
                          textColor={"#ffffff"}
                          backgColor={"#ffffff"}
                          displayOnHover={true}
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7.25"
                            stroke="#626f86"
                            strokeWidth="1.5"
                          ></circle>
                        </IconButton>
                      )}
                    </span>
                    <span className="task-preview-header-title">
                      <a
                      // style={{ fontSize: 14 }}
                      >
                        {task.taskTitle}
                      </a>
                    </span>
                  </div>
                  <div className="task-preview-info">
                    <TaskInfoBadges task={task}></TaskInfoBadges>

                    <div className="task-preview-info-users">
                      {task.taskMembers &&
                        task.taskMembers
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
                      {/* <TaskDetailsMembers style={{}} /> */}
                    </div>
                  </div>
                </div>
                <div className="task-preview-header-action-buttons-container">
                  {taskChecked && (
                    <div
                      className="task-preview-header-action-button archive archive-task"
                      data-tooltip="Delete task"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteTask()
                      }}
                    >
                      <IconButton
                        iconSize={"16px"}
                        centerd={true}
                        alternativeViewBox={"0 0 16 16"}
                        displayOnHover={true}
                        // onClick={(e) => {
                        //   e.stopPropagation()
                        //   onRemoveCurrentTask()
                        // }}
                      >
                        <path
                          fill="currentcolor"
                          fillRule="evenodd"
                          d="M1 1h14v5h-1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1zm2.5 5v7a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V6zm10-1.5h-11v-2h11zm-3 4.5h-5V7.5h5z"
                          clipRule="evenodd"
                        ></path>
                      </IconButton>
                    </div>
                  )}
                  <div
                    className="task-preview-header-action-button edit archive-task"
                    data-tooltip="Edit task"
                    onClick={(e) => {
                      e.stopPropagation()
                      openPreviewEditor()
                    }}
                  >
                    <IconButton
                      iconSize={"16px"}
                      centerd={true}
                      alternativeViewBox={"0 0 16 16"}
                      displayOnHover={true}
                      // onClick={(e) => {
                      //   e.stopPropagation()
                      //   onRemoveCurrentTask()
                      // }}
                    >
                      <path
                        fill="currentcolor"
                        fillRule="evenodd"
                        d="M11.586.854a2 2 0 0 1 2.828 0l.732.732a2 2 0 0 1 0 2.828L10.01 9.551a2 2 0 0 1-.864.51l-3.189.91a.75.75 0 0 1-.927-.927l.91-3.189a2 2 0 0 1 .51-.864zm1.768 1.06a.5.5 0 0 0-.708 0l-.585.586L13.5 3.94l.586-.586a.5.5 0 0 0 0-.707zM12.439 5 11 3.56 7.51 7.052a.5.5 0 0 0-.128.217l-.54 1.89 1.89-.54a.5.5 0 0 0 .217-.127zM3 2.501a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-3H15v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h3v1.5z"
                        clipRule="evenodd"
                      ></path>
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </div>
  )
}
