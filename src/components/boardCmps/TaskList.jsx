import { AddItemCard } from "./AddItemCard.jsx"
import { IconButton } from "../IconButton.jsx"
import { TaskPreview } from "./taskPreviewCmps/TaskPreview.jsx"
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
            <li key={task._id} style={{listStyle: "none"}}>
              <TaskPreview task={task} boardId={boardList.taskListBoard} />
            </li>
          ))
        ) : (
          <li>No tasks found</li>
        )}
        <div>
        <AddItemCard cardDescription={"Add a card"}></AddItemCard>
        </div>
      </ul>
    </div>
  );
}