import { TaskPreview } from "./TaskPreview.jsx"
import { useState, useRef } from "react"
export function TaskList({boardList}) {
    //console.log("boardList received by TaskList:", boardList);
  // TaskList.propTypes = {
  //   Tasks: PropTypes.array.isRequired,
  // }
  
  if(!boardList) return <div> Loading list</div>

  return (
    <div className="task-list">
      <h3>{boardList.taskListTitle}</h3>

      <ul>
        {boardList.taskList?.length > 0 ? (   // 
          boardList.taskList.map((task) => (
            <li key={task._id}>
              <TaskPreview task={task} boardId={boardList.taskListBoard} />
            </li>
          ))
        ) : (
          <li>No tasks found</li>
        )}
      </ul>
    </div>
  );
}