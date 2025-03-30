import { AddItemCard } from "./addItemCard/AddItemCard.jsx"
import { IconButton } from "../IconButton.jsx"
import { TaskPreview } from "./taskPreviewCmps/TaskPreview.jsx"
import { useState, useRef, useEffect } from "react"
import { TextEditInput } from "./TextEditInput.jsx"
import { useSelector, useDispatch } from "react-redux"
import { addList } from "../../redux/TaskListSlice.js"
import { addBoardList, addTaskToBoard, updateBoardlist, updateTaskInBoard } from "../../redux/BoardSlice.js"
import { ItemNameForm } from "./addItemCard/ItemNameForm.jsx"
export function TaskList({ boardList, isNewTaskList }) {
  //console.log("boardList received by TaskList:", boardList);
  // TaskList.propTypes = {
  //   Tasks: PropTypes.array.isRequired,
  // }

  const dispatch = useDispatch()
  const [taskListTitle, setTaskListTitle] = useState(boardList.taskListTitle)

  function onUpdateBoardList(value) {
    if (isNewTaskList && value) {
      setTaskListTitle(value)
      // boardList.taskListTitle = value
      dispatch(updateBoardlist({...boardList, taskListTitle: value}))
      // console.log("TaskList boardid", boardList)
    }
  }
  function addNewEmptyTask(){
    dispatch(addTaskToBoard({taskList: boardList._id}))
  }

  function onRemoveCurrentList(){
    console.log("removing list",boardList," from ",boardList.taskListBoard)
  }

  if (isNewTaskList) {
    console.log("new task list", boardList._id)
  }
  if (!boardList) return <div> Loading list</div>

  return (
    <div className="task-list">
      {isNewTaskList ? (
        <ItemNameForm
          IsEditing={isNewTaskList}
          setIsEditing={onRemoveCurrentList}
          onAddItem={onUpdateBoardList}
          itemType={"add list"}
        ></ItemNameForm>
      ) : (
        <div className="task-list-header">
          <div className="task-list-header-name">
            <TextEditInput
              activateEditing={isNewTaskList}
              value={taskListTitle}
              onChangeTextInput={onUpdateBoardList}
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
      )}

      <ul>
        {boardList.taskList?.length > 0 ? ( //
          boardList.taskList.map((task) => (
            <li key={task._id} style={{ listStyle: "none" }}>
              {task.taskTitle ==="" ? 
              (
                <TaskPreview task={task} boardId={boardList.taskListBoard} isNewTask={true}/>
              )
              :
              (
                <TaskPreview task={task} boardId={boardList.taskListBoard} />
              )}
              
            </li>
          ))
        ) : (
          <div />
        )}
        <div>
          <AddItemCard
            cardDescription={"Add a card"}
            itemType={"add task"}
            onItemCardClick={addNewEmptyTask}
          ></AddItemCard>
        </div>
      </ul>
    </div>
  )
}
