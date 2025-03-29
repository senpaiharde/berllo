import { AddItemCard } from "./AddItemCard.jsx"
import { IconButton } from "../IconButton.jsx"
import { TaskPreview } from "./taskPreviewCmps/TaskPreview.jsx"
import { useState, useRef } from "react"
import { TextEditInput } from "./TextEditInput.jsx"
export function TaskList({ boardList }) {
  //console.log("boardList received by TaskList:", boardList);
  // TaskList.propTypes = {
  //   Tasks: PropTypes.array.isRequired,
  // }

  if (!boardList) return <div> Loading list</div>

  return (
    <div className="task-list">
      <div className="task-list-header">
        <div className="task-list-header-name">
          <TextEditInput
            value={boardList.taskListTitle}
            onChangeTextInput={""}
          ></TextEditInput>
        </div>
        <div className="task-list-header-actions header-clickable">
          <IconButton>
            <path
              fillRule="nonzero"
              clipRule="evenodd"
              d="M 5 14 C 6.10457 14 7 13.1046 7 12 C 7 10.8954 6.10457 10 5 10 C 3.89543 10 3 10.8954 3 12 C 3 13.1046 3.89543 14 5 14 Z M 12 14 C 13.1046 14 14 13.1046 14 12 C 14 10.8954 13.1046 10 12 10 C 10.8954 10 10 10.8954 10 12 C 10 13.1046 10.8954 14 12 14 Z M 21 12 C 21 13.1046 20.1046 14 19 14 C 17.8954 14 17 13.1046 17 12 C 17 10.8954 17.8954 10 19 10 C 20.1046 10 21 10.8954 21 12 Z"
              fill="currentColor"
            ></path>
          </IconButton>
        </div>
      </div>
      <ul>
        {boardList.taskList?.length > 0 ? ( //
          boardList.taskList.map((task) => (
            <li key={task._id} style={{ listStyle: "none" }}>
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
  )
}
