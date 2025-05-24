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
  const [dateBackgroundColor, setDateBackgroundColor] = useState(
    task.taskChecked ? "#1f845a" : "#ffd5d2"
  )
  const [dateColor, setDateColor] = useState(
    task.taskChecked ? "#ffffff" : "#ae2a19"
  )
  const startdate = task.taskStartDate
    ? getReleventDate(task.taskStartDate)
    : ""
  const enddate = task.taskDueDate ? getReleventDate(task.taskDueDate) : ""
  const date =
    task.taskDueDate && task.taskStartDate
      ? `${startdate} - ${enddate}`
      : `${enddate}`
  // const date = task.taskDueDate && task.taskStartDate ? `${getReleventDate(task.taskStartDate)} - ${getReleventDate(
  //             task.taskDueDate
  //           )}` :  `${getReleventDate(task.taskDueDate)}`

  useEffect(() => {
    setDateBackgroundColor(task.taskChecked ? "#1f845a" : "#ffd5d2")
    setDateColor(task.taskChecked ? "#ffffff" : "#ae2a19")
    // console.log("task.taskChecked",task.taskChecked)
    // console.log("dateColor",dateColor)
  }, [task.taskChecked])
  if (task.taskCheckList) {
    // console.log("task.taskCheckList", task.taskCheckList[0])
  }
  let checklistBackgoundColor = ""
  let checklistColor = ""
  const checklistDone = () => {
    let doneCount = 0
    if (task.taskCheckList) {
      if (task.taskCheckList[0]) {
        task.taskCheckList[0].items?.forEach((item) => {
          if (item.done) doneCount++
        })
        // console.log("checklistDone", `${doneCount}/${task.taskCheckList[0].items.length}`)
        if (doneCount === task.taskCheckList[0].items?.length) {
          // checklistColor = ({backgroundColor: "#1f845a"})
          checklistBackgoundColor = "#1f845a"
          checklistColor = "#ffffff"
        }
        return `${doneCount}/${task.taskCheckList[0].items?.length}`
      }
    }
    return ""
  }
  const taskCheckListLabel = checklistDone()
  /// its not nott updated by store becouse it had hardcoded once usestate so it took the data from there
  return (
    <span className="task-preview-info-badges">
      {date !== "" && (
        <span
          className="task-preview-info-badges-date"
          style={{ backgroundColor: dateBackgroundColor, color: dateColor }}
        >
          <IconButton
            label={date}
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

      {task.taskActivityComments?.length > 0 && (
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
      {task.attachments && (
        <span style={{ display: "flex", alignItems: "center" }}>
          <IconButton
          // label={task.attachments.length}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.6426 17.9647C10.1123 19.46 7.62736 19.4606 6.10092 17.9691C4.57505 16.478 4.57769 14.0467 6.10253 12.5566L13.2505 5.57184C14.1476 4.6952 15.5861 4.69251 16.4832 5.56921C17.3763 6.44184 17.3778 7.85135 16.4869 8.72199L9.78361 15.2722C9.53288 15.5172 9.12807 15.5163 8.86954 15.2636C8.61073 15.0107 8.60963 14.6158 8.86954 14.3618L15.0989 8.27463C15.4812 7.90109 15.4812 7.29546 15.0989 6.92192C14.7167 6.54838 14.0969 6.54838 13.7146 6.92192L7.48523 13.0091C6.45911 14.0118 6.46356 15.618 7.48523 16.6163C8.50674 17.6145 10.1511 17.6186 11.1679 16.6249L17.8712 10.0747C19.5274 8.45632 19.5244 5.83555 17.8676 4.2165C16.2047 2.59156 13.5266 2.59657 11.8662 4.21913L4.71822 11.2039C2.42951 13.4404 2.42555 17.083 4.71661 19.3218C7.00774 21.5606 10.7323 21.5597 13.0269 19.3174L19.7133 12.7837C20.0956 12.4101 20.0956 11.8045 19.7133 11.431C19.331 11.0574 18.7113 11.0574 18.329 11.431L11.6426 17.9647Z"
              fill="currentColor"
            ></path>
          </IconButton>
          {task.attachments.length}
        </span>
      )}
      {task.taskCheckList && task.taskCheckList[0] && (
        <span
          className="task-preview-info-badges-date"
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: checklistBackgoundColor,
            color: checklistColor,
          }}
        >
          <IconButton
          // label={task.attachments.length}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13V18H6V6L16 6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H6ZM8.73534 10.3223C8.36105 9.91618 7.72841 9.89038 7.3223 10.2647C6.91619 10.639 6.89039 11.2716 7.26467 11.6777L10.8768 15.597C11.4143 16.1231 12.2145 16.1231 12.7111 15.6264L13.0754 15.2683C13.3699 14.9785 13.6981 14.6556 14.0516 14.3075C15.0614 13.313 16.0713 12.3169 17.014 11.3848L17.0543 11.3449C18.7291 9.68869 20.0004 8.42365 20.712 7.70223C21.0998 7.30904 21.0954 6.67589 20.7022 6.28805C20.309 5.90022 19.6759 5.90457 19.2881 6.29777C18.5843 7.01131 17.3169 8.27244 15.648 9.92281L15.6077 9.96263C14.6662 10.8937 13.6572 11.8889 12.6483 12.8825L11.8329 13.6851L8.73534 10.3223Z"
              fill="currentColor"
            ></path>
          </IconButton>
          {taskCheckListLabel}
        </span>
      )}
    </span>
  )
}
