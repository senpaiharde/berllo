// import { IconButton } from "../boardCmps/boardHeaderCmp/IconButton"

import { use } from "react"
import { IconButton } from "../../IconButton"
import { useState, useRef, useEffect } from "react"
export function TaskInfoBadges({ task }) {
  function getReleventDate(date) {
    const options = { month: "short", day: "numeric" }
    if (date)
      //return  new Date(date).toISOString().split("T")[0]
      return new Date(date).toLocaleDateString("en-US", options)
  }
  // const dateBackgroundColor = task.taskChecked ? "#1f845a" : "#ffd5d2"
  // const dateColor = task.taskChecked ? "#ffffff" : "#ae2e244"
  const [dateBackgroundColor, setDateBackgroundColor] = useState(task.taskChecked ? "#1f845a" : "#ffd5d2")
  const [dateColor, setDateColor] = useState(task.taskChecked ? "#ffffff" : "#ae2a19")
  

  useEffect(() => {
    
    setDateBackgroundColor(task.taskChecked ? "#1f845a" : "#ffd5d2")
    setDateColor(task.taskChecked ? "#ffffff" : "#ae2a19")
    // console.log("task.taskChecked",task.taskChecked)
    // console.log("dateColor",dateColor)
  }, [task.taskChecked])
  
  /// its not nott updated by store becouse it had hardcoded once usestate so it took the data from there
  return (
    <span className="task-preview-info-badges">
      {task.taskDueDate && task.taskStartDate && (
        <span
          className="task-preview-info-badges-date"
          style={{ backgroundColor: dateBackgroundColor, color: dateColor }}
        >
          <IconButton
            label={`${getReleventDate(task.taskStartDate)} - ${getReleventDate(
              task.taskDueDate
            )}`}
            //  style={{backgroundColor: dateBackgroundColor, color: dateColor}}
            textColor={dateColor}
          >
            <path
              d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
              fill={dateColor}
              // color={"purple"}
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
              fill={dateColor}
              color={dateColor}
            ></path>
          </IconButton>
        </span>
      )}

      {task.taskDescription && (
        <span
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <IconButton>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 4 5 C 3.44772 5 3 5.44772 3 6 C 3 6.55228 3.44772 7 4 7 H 20 C 20.5523 7 21 6.55228 21 6 C 21 5.44772 20.5523 5 20 5 H 4 Z M 4 9 C 3.44772 9 3 9.44772 3 10 C 3 10.5523 3.44772 11 4 11 H 20 C 20.5523 11 21 10.5523 21 10 C 21 9.44772 20.5523 9 20 9 H 4 Z M 3 14 C 3 13.4477 3.44772 13 4 13 H 20 C 20.5523 13 21 13.4477 21 14 C 21 14.5523 20.5523 15 20 15 H 4 C 3.44772 15 3 14.5523 3 14 Z M 4 17 C 3.44772 17 3 17.4477 3 18 C 3 18.5523 3.44772 19 4 19 H 14 C 14.5523 19 15 18.5523 15 18 C 15 17.4477 14.5523 17 14 17 H 4 Z"
              fill="currentColor"
            ></path>
          </IconButton>
        </span>
      )}

      {task.taskActivityComments && (
        <span style={{ display: "flex", alignItems: "center" }}>
          <IconButton 
          // label={task.taskActivityComments.length}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 16 17 H 12.5 L 8.28037 20.4014 C 6.97772 21.4869 5 20.5606 5 18.865 V 16.1973 C 3.2066 15.1599 2 13.2208 2 11 C 2 7.68629 4.68629 5 8 5 H 16 C 19.3137 5 22 7.68629 22 11 C 22 14.3137 19.3137 17 16 17 Z M 16 7 H 8 C 5.79086 7 4 8.79086 4 11 C 4 12.8638 5.27477 14.4299 7 14.874 V 19 L 12 15 H 16 C 18.2091 15 20 13.2091 20 11 C 20 8.79086 18.2091 7 16 7 Z"
              fill="currentColor"
            ></path>
          </IconButton>
          {task.taskActivityComments.length}
        </span>
      )}
    </span>
  )
}
