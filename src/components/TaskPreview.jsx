import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { getBaseUrl } from "../services/util.service.js"
// import { PropTypes } from "prop-types"

export function TaskPreview({ task }) {
  // TaskPreview.propTypes = {
  //   Task: PropTypes.object.isRequired,
  // }
  if(task) {
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
      }
    ],
  }
  // console.log("taskActivityComments", listTask.taskActivityComments)
  const [currentTaskPreview, setCurrentTaskPreview] = useState(task)

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
    const options = { month: 'long', day: 'numeric' };
    if (date) //return  new Date(date).toISOString().split("T")[0]
              return  new Date(date).toLocaleDateString('en-US', options)
  }

  return (
    <div
      className="task-preview"
      ref={TaskPreviewRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    > 
      <div className="task-front-cover"></div>
      <div className="task-preview-details">
        <div className="task-preview-labels"></div>
        <div className="task-preview-header">
            <span className="task-preview-header-completion-status">
                <button>toggle</button>
            </span>
            <span className="task-preview-header-title">
                <h2>{currentTaskPreview.taskTitle}</h2>
            </span>
        </div>
        <div className="task-preview-info">
          <span className="task-preview-info-badges" >
            {(currentTaskPreview.taskDueDate && currentTaskPreview.taskStartDate) && 
            <span>{getReleventDate(currentTaskPreview.taskStartDate)} - {getReleventDate(currentTaskPreview.taskDueDate)}</span>}

            {currentTaskPreview.taskDescription &&
             <span>decr</span>}

            {currentTaskPreview.taskActivityComments &&
             <span>{currentTaskPreview.taskActivityComments.length} comments</span>}

          </span>

          <ul className="task-preview-info-users" style={{ display: "flex", flexDirection: "row", margin: "1em", alignItems: "center" }}>
            {currentTaskPreview.taskMembers &&
              currentTaskPreview.taskMembers.map((member) => (
                <li key={member}>
                  <button>{member}</button>
                </li>
              ))}
          </ul>

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