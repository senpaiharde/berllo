import { AddItemCard } from "./addItemCard/AddItemCard.jsx"
import { IconButton } from "../IconButton.jsx"
import { TaskPreview } from "./taskPreviewCmps/TaskPreview.jsx"
import { useState, useRef, useEffect } from "react"
import { TextEditInput } from "./TextEditInput.jsx"
import { useSelector, useDispatch } from "react-redux"
import { addList } from "../../redux/TaskListSlice.js"
import { Droppable } from "@hello-pangea/dnd"
import {
  addBoardList,
  addTaskToBoard,
  updateBoardlist,
  removeBoardListFromBoard,
  updateTaskInBoard,
  syncBoardAsync
} from "../../redux/BoardSlice.js"
import { ItemNameForm } from "./addItemCard/ItemNameForm.jsx"
import { TaskOps } from "../../services/backendHandler.js"
export function TaskList({ boardList, newTaskList, onAddedNewList }) {
  //console.log("boardList received by TaskList:", boardList);
  // TaskList.propTypes = {
  //   Tasks: PropTypes.array.isRequired,
  // }

  const dispatch = useDispatch()
  const [isNewTaskList, setIsNewTaskList] = useState(newTaskList)
  const [taskListTitle, setTaskListTitle] = useState(boardList.taskListTitle)
  const [newTitle, setNewTitle] = useState()

  useEffect(() => {
    // console.log("newTitle", newTitle)
  }, [newTitle])

  function onUpdateBoardList(value) {
    if (isNewTaskList && value) {
      setTaskListTitle(value)
      // boardList.taskListTitle = value
      dispatch(updateBoardlist({ ...boardList, taskListTitle: value }))
      dispatch(
        syncBoardAsync({
          method: TaskOps.ADD,
          args: {
            body: {
              method: TaskOps.ADD,
              workId: "list",
              taskListBoard: boardList.taskListBoard,
              taskListTitle: value,
              indexInBoard: boardList.indexInBoard + 1,
            },
          },

          workId: "list",
        })
      )
      onAddedNewList()
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
            isList={true}
            isNewItem={true}
            itemType={"Add list"}
          ></ItemNameForm>
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
          <div
            className="task-list-header-actions header-clickable"
            onClick={() => onRemoveCurrentList()}
          >
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

      {!isNewTaskList && (
          <Droppable droppableId={boardList._id} type="taskList">
            {(provided) => (
              <ol
                className="scrollable-task-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {boardList.taskList?.length > 0 ? ( //
                  boardList.taskList.map((task, index) => (
                    <li key={task._id} style={{ listStyle: "none" }}>
                      {task.taskTitle === "" ? (
                        <TaskPreview
                          task={task}
                          boardId={boardList.taskListBoard}
                          index={index}
                          NewTask={true}
                          onAddedNewTask={addNewEmptyTask}
                        />
                      ) : (
                        <TaskPreview
                          task={task}
                          index={index}
                          boardId={boardList.taskListBoard}
                        />
                      )}
                    </li>
                  ))
                ) : (
                  <div />
                )}
                {provided.placeholder}
              </ol>
            )}
          </Droppable>
      )}
      {!isNewTaskList && (
        <AddItemCard
          cardDescription={"Add a card"}
          itemType={"add task"}
          onItemCardClick={addNewEmptyTask}
        ></AddItemCard>
      )}
    </div>
  )
}
