import { AddItemCard } from "./addItemCard/AddItemCard.jsx"
import { IconButton } from "../IconButton.jsx"
import { TaskPreview } from "./taskPreviewCmps/TaskPreview.jsx"
import { useState, useRef, useEffect } from "react"
import { TextEditInput } from "./TextEditInput.jsx"
import { useSelector, useDispatch } from "react-redux"
import { addList } from "../../redux/TaskListSlice.js"
import {
  addBoardList,
  addTaskToBoard,
  updateBoardlist,
  removeBoardListFromBoard,
  updateTaskInBoard,
} from "../../redux/BoardSlice.js"
import { ItemNameForm } from "./addItemCard/ItemNameForm.jsx"
export function TaskList({ boardList, newTaskList }) {
  //console.log("boardList received by TaskList:", boardList);
  // TaskList.propTypes = {
  //   Tasks: PropTypes.array.isRequired,
  // }

  const dispatch = useDispatch()
  const [isNewTaskList, setIsNewTaskList] = useState(newTaskList)
  const [taskListTitle, setTaskListTitle] = useState(boardList.taskListTitle)
  const [newTitle, setNewTitle] = useState()

  useEffect(() => {
    console.log("newTitle",newTitle)
  }, [newTitle]);

  function onUpdateBoardList(value) {
    if (isNewTaskList && value) {
      setTaskListTitle(value)
      // boardList.taskListTitle = value
      dispatch(updateBoardlist({ ...boardList, taskListTitle: value }))
      // console.log("TaskList boardid", boardList)
    }
  }
  function addNewEmptyTask() {
    dispatch(addTaskToBoard({ taskList: boardList._id }))
  }

  function onRemoveCurrentList(value) {
    if (value) return
    console.log("removing list", boardList._id)
    dispatch(removeBoardListFromBoard(boardList._id))
  }

  if (isNewTaskList) {
    console.log("new task list", boardList._id)
  }
  if (!boardList) return <div> Loading list</div>

  return (
    <div className="task-list">
      {isNewTaskList ? (
        <div>
          <ItemNameForm
            IsEditing={isNewTaskList}
            setIsEditing={setIsNewTaskList}
            setText={setNewTitle}
            noValueOnExit={onRemoveCurrentList}
            onAddItem={onUpdateBoardList}
            itemType={"add list"}
          ></ItemNameForm>
          {/* <div className="input-new-item-buttons">
            <div onClick={() => onChangeTextInput(inputValue)}>
              <button
                className="icon-container-button input-new-item-label"
                style={{ backgroundColor: "#0000FF", color: "#FFFFFF" }}
              >
                add list
              </button>
            </div>
            <div
              className="input-new-item-svg"
              onClick={(e) => {
                console.log("onRemoveCurrentList")
                onRemoveCurrentList()
              }}
            >
              <IconButton
                // onClick={(e) => {
                //   console.log("disableBlur = true")
                //   // disableBlur = true
                //   onRemoveCurrentList() // Prevent blur from firing
                // }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                  fill="currentColor"
                ></path>
              </IconButton>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="task-list-header">
          <div className="task-list-header-name">
            <TextEditInput
              activateEditing={isNewTaskList}
              fontSize={14}
              value={taskListTitle}
              onChangeTextInput={onUpdateBoardList}
            ></TextEditInput>
          </div>
          <div className="task-list-header-actions header-clickable" onClick={()=>onRemoveCurrentList()}>
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

      <ol className="scrollable-task-list">
        {boardList.taskList?.length > 0 ? ( //
          boardList.taskList.map((task) => (
            <li key={task._id} style={{ listStyle: "none" }}>
              {task.taskTitle === "" ? (
                <TaskPreview
                  task={task}
                  boardId={boardList.taskListBoard}
                  NewTask={true}
                />
              ) : (
                <TaskPreview task={task} boardId={boardList.taskListBoard} />
              )}
            </li>
          ))
        ) : (
          <div />
        )}
      </ol>
      <div>
        <AddItemCard
          cardDescription={"Add a card"}
          itemType={"add task"}
          onItemCardClick={addNewEmptyTask}
        ></AddItemCard>
      </div>
    </div>
  )
}
