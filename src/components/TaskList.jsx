import { TaskPreview } from "./TaskPreview.jsx"
import { useState, useRef } from "react"
export function TaskList({boardList}) {
  // TaskList.propTypes = {
  //   Tasks: PropTypes.array.isRequired,
  // }
  const [currentBoardList, setCurrentBoardList] = useState(boardList)
  if(boardList) {
    // console.log("boardList",boardList.taskListTitle)
  }

  return (
    <div>
      
      <ul className="task-list">
        <h1>{currentBoardList.taskListTitle}</h1>
        {boardList.taskList.map((task) => (
          <li key={task._id}>
            <TaskPreview
            task={task}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
