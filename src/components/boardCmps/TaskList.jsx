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
  syncBoardAsync,
} from "../../redux/BoardSlice.js"
import { ItemNameForm } from "./addItemCard/ItemNameForm.jsx"
import { TaskOps } from "../../services/backendHandler.js"
export function TaskList({ boardList, newTaskList, onAddedNewList, boardListsById }) {
  //console.log("boardList received by TaskList:", boardList);
  // TaskList.propTypes = {
  //   Tasks: PropTypes.array.isRequired,
  // }

  const dispatch = useDispatch()
  const [isNewTaskList, setIsNewTaskList] = useState(newTaskList)
  const [taskListTitle, setTaskListTitle] = useState(boardList.taskListTitle)
  const [newTitle, setNewTitle] = useState()
  const board = useSelector((state) => state.boardReducer)
  const list = useSelector((state) => state.boardReducer)

  // filter:{
  //     title: "",
  //     member: "",
  //     labels: [],
  //   },
  const filterActive =
    board.filter.title !== "" ||
    board.filter.members.length > 0 ||
    board.filter.labels.length > 0
  const filteredAmount = boardList.taskList?.length
  const filteredText =
    filteredAmount && (filteredAmount > 1 || filteredAmount === 0)
      ? `${filteredAmount} cards match filters`
      : `${filteredAmount} card match filters`

  function onUpdateBoardList(value) {
    if (isNewTaskList && value) {
      setTaskListTitle(value)
      console.log(
        "creating taskList title",
        value,
        "boardList.taskListBoard",
        boardList.taskListBoard,
        "boardList",
        boardList
      )
      console.log("boardList.indexInBoard", boardList.indexInBoard)
      dispatch(
        updateBoardlist({
          ...boardList,
          taskListTitle: value,
          isNewTaskList: false,
        })
      )
      setIsNewTaskList(false)
      dispatch(
        syncBoardAsync({
          method: TaskOps.ADD,
          args: {
            body: {
              method: TaskOps.ADD,
              workId: "list",
              taskListBoard: boardList.taskListBoard,
              taskListTitle: value,
              indexInBoard: boardList.indexInBoard,
            },
          },

          workId: "list",
        })
      )
      onAddedNewList()
      // console.log("TaskList boardid", boardList)
    }
    if (!isNewTaskList && value) {
      console.log(
        "updating task list title",
        value,
        "isNewTaskList",
        isNewTaskList,
        "listId", boardList._id
      )
      dispatch(updateBoardlist({ ...boardList, taskListTitle: value }))
      dispatch(
        syncBoardAsync({
          method: TaskOps.UPDATE,
          args: {
            taskId: boardList._id,
            body: {
              method: TaskOps.UPDATE,
              workId: "list",
              taskListBoard: boardList.taskListBoard,
              taskListTitle: value,
            },
          },

          workId: "list",
        })
      )
    }
  }

  function addNewEmptyTask() {
    dispatch(
      addTaskToBoard({
        taskList: boardList._id,
        position: boardList.taskList.length,
      })
    )
  }
  function onDeleteList(){

    onRemoveCurrentListFromState()
    deleteListFromBoardInBackend()
    //delete list from list collection in backend
    dispatch(
      syncBoardAsync({
        method: TaskOps.DELETE,
        args: {
          taskId: boardList._id,
          body: {
            method: TaskOps.DELETE,
            workId: "list",
          },
        },

        workId: "list",
      })
    )
  }

  function deleteListFromBoardInBackend() {
      console.log("boardListById", boardListsById)
    console.log("boardListById",boardListsById," remove :", boardList._id)
    const index = boardListsById.indexOf(boardList._id);
    if (index !== -1) {
      boardListsById.splice(index, 1);
    }
    
    console.log("new boardListById", boardListsById)
    // delete list from board taskList in backend
    dispatch(
        syncBoardAsync({
          method: TaskOps.UPDATE,
          args: {
            body: {
              method: TaskOps.UPDATE,
              workId: "board",
              boardLists: boardListsById,
            },
            taskId: boardList.taskListBoard,
          },
    
          workId: "board",
        })
      )
  }

  function onRemoveCurrentListFromState(value) {
    if (value) return
    console.log("removing list", boardList._id)
    dispatch(removeBoardListFromBoard(boardList._id))
  }

  // if (isNewTaskList) {
  //   console.log("new task list", boardList._id)
  // }
  const [headerHeight,setHeaderHeight] = useState()
  const taskListById = boardList.taskList.map((task) =>
            task._id.toString()
          )
  if (!boardList) return <div> Loading list</div>

  return (
    <div className="task-list">
      {isNewTaskList ? (
        <div>
          <ItemNameForm
            IsEditing={isNewTaskList}
            // setIsEditing={setIsNewTaskList}
            setText={setNewTitle}
            noValueOnExit={onRemoveCurrentListFromState}
            onAddItem={onUpdateBoardList}
            isList={true}
            isNewItem={true}
            itemType={"Add list"}
          ></ItemNameForm>
        </div>
      ) : (
        <div className="task-list-header"
        style={headerHeight ? { height: headerHeight } : undefined}>
          <TextEditInput
            activateEditing={isNewTaskList}
            fontSize={14}
            value={taskListTitle}
            itemType={"list"}
            onChangeTextInput={onUpdateBoardList}
            setHeaderHeight={setHeaderHeight}
          ></TextEditInput>
          <div
            className="task-list-header-actions header-clickable"
            style={{marginLeft: "8px"}}
            onClick={() => onRemoveCurrentListFromState()}
          >
            {/* <IconButton>
              <path
                fillRule="nonzero"
                clipRule="evenodd"
                d="M 5 14 C 6.10457 14 7 13.1046 7 12 C 7 10.8954 6.10457 10 5 10 C 3.89543 10 3 10.8954 3 12 C 3 13.1046 3.89543 14 5 14 Z M 12 14 C 13.1046 14 14 13.1046 14 12 C 14 10.8954 13.1046 10 12 10 C 10.8954 10 10 10.8954 10 12 C 10 13.1046 10.8954 14 12 14 Z M 21 12 C 21 13.1046 20.1046 14 19 14 C 17.8954 14 17 13.1046 17 12 C 17 10.8954 17.8954 10 19 10 C 20.1046 10 21 10.8954 21 12 Z"
                fill="currentColor"
              ></path>
            </IconButton> */}
            <div className="task-preview-header-action-button archive-list"
                  data-tooltip="Delete list"
                  style={{color: "black"}}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteList()
                  }}>
                    <IconButton
                      iconSize={"16px"}
                      centerd={true}
                      alternativeViewBox={"0 0 16 16"}
                      // displayOnHover={true}
                      // onClick={(e) => {
                      //   e.stopPropagation()
                      //   onRemoveCurrentTask()
                      // }}
                    >
                      <path
                        fill="currentcolor"
                        fillRule="evenodd"
                        d="M1 1h14v5h-1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1zm2.5 5v7a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V6zm10-1.5h-11v-2h11zm-3 4.5h-5V7.5h5z"
                        clipRule="evenodd"
                      ></path>
                    </IconButton>
                  </div>
            
          </div>
          
          {filterActive && <p className="task-list-filter-p">{filteredText}</p>}
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
                        taskListById={taskListById}
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
