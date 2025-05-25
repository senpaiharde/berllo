import { AddItemCard } from "./addItemCard/AddItemCard"
import { TaskList } from "./TaskList"
import { useState, useRef, useEffect } from "react"
import { TextEditInput } from "./TextEditInput"
import {
  addBoardList,
  updateBoardListOrder,
  updateBoardlist,
  updateTasklistOrder,
  syncBoardAsync,
  updateBoardListOrderAndSync,
  updateTasklistOrderAndSync,
  updateboardFilter,
} from "../../redux/BoardSlice"
import { useDispatch, useSelector } from "react-redux"
import { TaskPreviewEditor } from "./taskPreviewCmps/TaskPreviewEditor"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { TaskOps } from "../../services/backendHandler"
export function BoardView() {
  const board = useSelector((state) => state.boardReducer)
  const dispatch = useDispatch()

  let taskSum = 0
  const [taskCount, setTaskCount] = useState(0)
  let filteredBoard = board

  const filterActive =
    board.filter.title !== "" ||
    board.filter.members.length > 0 ||
    board.filter.labels.length > 0
  if (filterActive) {
    filteredBoard = {
      ...board,
      boardLists: board.boardLists.map((list) => {
        let filteredTasks = list.taskList

        // Filter by title if needed
        if (board.filter.title && board.filter.title !== "") {
          const titleFilter = board.filter.title.toLowerCase()
          filteredTasks = filteredTasks.filter((task) =>
            task.taskTitle.toLowerCase().includes(titleFilter)
          )
        }

        // Filter by labels if needed
        if (board.filter.labels && board.filter.labels.length > 0) {
          filteredTasks = filteredTasks.filter((task) =>
            task.taskLabels?.some((taskLabel) =>
              board.filter.labels.some(
                (filterLabel) => filterLabel.color === taskLabel.color
              )
            )
          )
        }
        console.log("board.filter.members", board.filter.members)
        if (board.filter.members && board.filter.members.length > 0) {
          console.log("board.filter.members", board.filter.members)
          // console.log("taskMembers", task.taskMembers)
          filteredTasks = filteredTasks.filter((task) =>
            task.taskMembers?.some((taskMember) =>
              board.filter.members.some(
                (filterMember) => filterMember._id === taskMember._id
              )
            )
          )
        }
        taskSum += filteredTasks.length
        // setTaskCount(taskCount=> taskCount + filteredTasks.length)
        return {
          ...list,
          taskList: filteredTasks,
        }
      }),
    }
  }
  useEffect(() => {
    if (filterActive) {
      console.log("taskSum", taskSum)
      setTaskCount(taskSum)
    }
  }, [board])

  useEffect(() => {
    console.log("taskCount", taskCount)
    dispatch(updateboardFilter({ ...board.filter, taskCount: taskCount }))
  }, [taskCount])

  function AddNewEmptyTaskList(value) {
    // console.log("AddNewTaskList")
    dispatch(addBoardList())
    console.log("AddNewEmptyTaskList value", value)
    if (board) {
      // dispatch(
      //   syncBoardAsync({
      //     method: TaskOps.ADD,
      //     args: {
      //       body: {
      //         method: TaskOps.ADD,
      //         workId: "list",
      //         taskListBoard: board._id,
      //         taskListTitle: `new list ${board?.boardLists.length + 1}`,
      //         indexInBoard: board?.boardLists.length,
      //       },
      //     },
      //     workId: "list",
      //   })
      // )
    } else {
      console.log("AddNewEmptyTaskList : board is missing")
    }
  }
  //{ method: TaskOps.ADD, workId: "list",taskListBoard: board._id ,taskListTitle: `new list ${currentWorkSpace.boards?.length}` }

  const onDragEnd = (result, type) => {
    // debugger
    const { destination, source, draggableId } = result
    console.log("onDragEnd", result, type)
    console.log(
      "board.boardLists before change",
      board.boardLists
      // .map((list) => list._id.toString())
    )
    if (result.type === "BoardList") {
      dispatch(
        updateBoardListOrderAndSync({ draggableId, destination, source })
      )
      // dispatch(updateBoardListOrder({ draggableId, destination, source }))
      // const boardLists = board.boardLists.filter((list) => { return list._id})
      // setTimeout(() => {
      //   console.log("Waited 1 seconds!");
      //   const boardLists = board.boardLists.map((list) => list._id.toString());
      // console.log("boardLists after change", boardLists)
      // console.log("board.boardLists after change", board.boardLists)
      // // }, 1000);
      // const boardLists = board.boardLists.map((list) => list._id.toString());
      // console.log("boardLists after change", boardLists)
      // console.log("board.boardLists after change", board)
      // dispatch(
      //   syncBoardAsync({
      //     method: TaskOps.UPDATE,
      //     args: {
      //       body: {
      //         method: TaskOps.UPDATE,
      //         workId: "list",
      //         indexInBoard: destination.index,
      //       },
      //       taskId: draggableId,
      //     },

      //     workId: "list",
      //   })
      // )
    }
    if (result.type === "taskList") {
      console.log("onDragEnd taskList", draggableId, destination, source)
      dispatch(updateTasklistOrderAndSync({ draggableId, destination, source }))
      // dispatch(updateTasklistOrder({ draggableId, destination, source }))
    }
  }

  // function updateListOrder(result) {
  //   if (!result.destination) return

  //   const sourceListId = result.source.droppableId
  //   const destListId = result.destination.droppableId
  //   const sourceIndex = result.source.index
  //   const destIndex = result.destination.index

  //   if (sourceListId === destListId) {
  //     console.log("Reordering within the same list")
  //     const listIndex = board.boardLists.findIndex(
  //       (list) => list._id === sourceListId
  //     )
  //     if (listIndex === -1) return

  //     const taskList = Array.from(board.boardLists[listIndex].taskList)
  //     console.log("taskList before", taskList)

  //     const [movedTask] = taskList.splice(sourceIndex, 1)
  //     taskList.splice(destIndex, 0, movedTask)
  //     console.log("taskList after", taskList)
  //     const updatedList = {
  //       ...board.boardLists[listIndex],
  //       taskList,
  //     }

  //     dispatch(updateBoardlist(updatedList))
  //   } else {
  //     console.log("Moving task across lists")
  //     const sourceListIndex = board.boardLists.findIndex(
  //       (list) => list._id === sourceListId
  //     )
  //     const destListIndex = board.boardLists.findIndex(
  //       (list) => list._id === destListId
  //     )
  //     if (sourceListIndex === -1 || destListIndex === -1) return

  //     const sourceTaskList = Array.from(
  //       board.boardLists[sourceListIndex].taskList
  //     )
  //     const destTaskList = Array.from(board.boardLists[destListIndex].taskList)

  //     const [movedTask] = sourceTaskList.splice(sourceIndex, 1)
  //     movedTask.taskList = destListId // update the task's list ID
  //     destTaskList.splice(destIndex, 0, movedTask)

  //     const updatedSourceList = {
  //       ...board.boardLists[sourceListIndex],
  //       taskList: sourceTaskList,
  //     }

  //     const updatedDestList = {
  //       ...board.boardLists[destListIndex],
  //       taskList: destTaskList,
  //     }

  //     dispatch(updateMultipleBoardLists([updatedSourceList, updatedDestList]))
  //   }
  // }

  if (!board || !board.boardLists) {
    console.log("board is missing or boardLists undefined")
    return <div>Loading board view...</div>
  }
  if (board.boardLists.length === 0) {
    // AddNewEmptyTaskList()
  }
  // console.log(" boardLists loaded:", board.boardLists)
  if (false) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="board-view">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="BoardList"
            direction="horizontal"
            type="BoardList"
          >
            {(provided) => (
              <div
                className="task-lists-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ol className="TaskList-list">
                  {filteredBoard.boardLists.map((list, index) => (
                    <Draggable
                      key={list._id}
                      draggableId={list._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task-list-wrapper"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <li className="TaskList-list-item" key={list._id}>
                            {list.isNewTaskList === true ? (
                              <TaskList
                                boardList={list}
                                newTaskList={true}
                                onAddedNewList={AddNewEmptyTaskList}
                              ></TaskList>
                            ) : (
                              <TaskList boardList={list} />
                            )}
                          </li>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  <div className="TaskList-list-add-item ">
                    <AddItemCard
                      cardDescription={"Add another list"}
                      backgroundColor={" #ffffff3d"}
                      textColor={"#f8f5f5"}
                      addListClass={true}
                      onItemCardClick={AddNewEmptyTaskList}
                    ></AddItemCard>
                  </div>
                  {provided.placeholder}
                </ol>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* <ol className="TaskList-list">
        {board.boardLists &&
          board.boardLists.map((list) => {
            return (
              <li className="TaskList-list-item" key={list._id}>
                {list.taskListTitle === "" ? (
                  <TaskList
                    boardList={list}
                    newTaskList={true}
                    onAddedNewList={AddNewEmptyTaskList}
                  ></TaskList>
                ) : (
                  <TaskList boardList={list} />
                )}
              </li>
            )
          })}
        <div className="TaskList-list-add-item ">
          <AddItemCard
            cardDescription={"Add another list"}
            backgroundColor={" #ffffff3d"}
            textColor={"#f8f5f5"}
            addListClass={true}
            onItemCardClick={AddNewEmptyTaskList}
          ></AddItemCard>
        </div>
      </ol> */}
        <TaskPreviewEditor />
      </div>
    )
  }
}
//
