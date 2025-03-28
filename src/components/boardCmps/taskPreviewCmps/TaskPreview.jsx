import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TaskInfoBadges } from "./TaskInfoBadges"
import { IconButton } from "../../IconButton"
// import { getBaseUrl } from "../services/util.service.js"
// import { PropTypes } from "prop-types"

export function TaskPreview({ task, boardId }) {
  const navigate = useNavigate()
  // TaskPreview.propTypes = {
  //   Task: PropTypes.object.isRequired,
  // }
  if (task) {
    // console.log("Task",task)
  }
  const listTask = {
    //_id: "dgdfgs",
    taskChecked: false,
    taskMembers: ["asfasf", "asfasy"],
    taskTitle: "testTaskTitle",
    taskDescription: "testDescription",
    taskLabels: ["red", "orange", "blue"],
    taskStartDate: 1710945000000,
    taskCoordinates: [32.0, 34.6],
    taskDueDate: 1750946000000,
    taskDateReminder: 1750942000000,
    taskList: "asfaf",
    taskBoard: "dgsgs1",
    taskCheckList: ["1", "2", "3"],
    taskCover: {
      coverType: "color",
      coverColor: "#000000",
      coverImg: "http://www.img.com",
    },
    taskActivityComments: [
      {
        _id: "comment1",
        userId: "asfasf",
        comment: "testComment 1",
        date: 1710945000000,
      },
      {
        _id: "comment2",
        userId: "user2",
        comment: "testComment 2",
        date: 1710955000000,
      },
    ],
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
  /// its not nott updated by store becouse it had hardcoded once usestate so it took the data from there
  return (
    <div
      className="task-preview"
      ref={TaskPreviewRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      //onClick={() => navigate(`/b/${task.taskBoard}/${task._id}`)}
      onClick={() => {
        console.log("🧠 Navigating to task:", task._id)
        navigate(
          `/b/${boardId}/board/${task._id}-${encodeURIComponent(
            task.taskTitle
          )}`
        )
      }}
    >
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
            <h2>{task.taskTitle}</h2>
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
      <span className="preview-title">
        {/* <Link to={`/Task/${Task._id}`}>
          <h2>{Task.name}</h2>
        </Link> */}
      </span>
    </div>
  )
}
