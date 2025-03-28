// import { IconButton } from "../boardCmps/boardHeaderCmp/IconButton"

import { IconButton } from "../../IconButton"

export function TaskInfoBadges({ task }) {
  function getReleventDate(date) {
    const options = { month: "long", day: "numeric" }
    if (date)
      //return  new Date(date).toISOString().split("T")[0]
      return new Date(date).toLocaleDateString("en-US", options)
  }
  /// its not nott updated by store becouse it had hardcoded once usestate so it took the data from there
  return (
    <span className="task-preview-info-badges">
      {task.taskDueDate && task.taskStartDate && (
        <span>
          {getReleventDate(task.taskStartDate)} -{" "}
          {getReleventDate(task.taskDueDate)}
        </span>
      )}

      {task.taskDescription && (
        <span>
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
        <span>
          <IconButton>
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
