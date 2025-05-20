import { AddItemCard } from "./addItemCard/AddItemCard"
import { TaskList } from "./TaskList"
import { useState, useRef, useEffect } from "react"
import { TextEditInput } from "./TextEditInput"
import {
  addBoardList,
  updateBoardListOrder,
  updateBoardlist,
  updateTasklistOrder,
} from "../../redux/BoardSlice"
import { useDispatch, useSelector } from "react-redux"
import { TaskPreviewEditor } from "./taskPreviewCmps/TaskPreviewEditor"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
export function BoardView() {
  const [newListClicked, setNewListClicked] = useState(true)
  // const [previewEditorPositon, setPreviewEditorPosition] = useState()
  const board = useSelector((state) => state.boardReducer)
  const dispatch = useDispatch()
  function AddNewEmptyTaskList() {
    // console.log("AddNewTaskList")
    // dispatch(addBoardList())
    // dispatch(
    //         syncBoardAsync({
    //                 method: TaskOps.FETCH,
    //                 args: { taskId: boardId , body: {method: TaskOps.FETCH, workId: 'board'}},
    //                 workId: 'board',
    //               })
    //             );
  }

  const onDragEnd = (result, type) => {
    // debugger
    const { destination, source, draggableId } = result
    console.log("onDragEnd", result, type)

    if (result.type === "BoardList") {
      dispatch(updateBoardListOrder({draggableId,destination, source}))
      // dispatch(updateBoardListOrder())
    }
    if (result.type === "taskList" ) {
        dispatch(updateTasklistOrder({draggableId,destination, source}))
    }
    
  }

  function updateListOrder(result) {
    if (!result.destination) return

    const sourceListId = result.source.droppableId
    const destListId = result.destination.droppableId
    const sourceIndex = result.source.index
    const destIndex = result.destination.index

    if (sourceListId === destListId) {
      console.log("Reordering within the same list")
      const listIndex = board.boardLists.findIndex(
        (list) => list._id === sourceListId
      )
      if (listIndex === -1) return

      const taskList = Array.from(board.boardLists[listIndex].taskList)
      console.log("taskList before", taskList)

      const [movedTask] = taskList.splice(sourceIndex, 1)
      taskList.splice(destIndex, 0, movedTask)
      console.log("taskList after", taskList)
      const updatedList = {
        ...board.boardLists[listIndex],
        taskList,
      }

      dispatch(updateBoardlist(updatedList))
    } else {
      console.log("Moving task across lists")
      const sourceListIndex = board.boardLists.findIndex(
        (list) => list._id === sourceListId
      )
      const destListIndex = board.boardLists.findIndex(
        (list) => list._id === destListId
      )
      if (sourceListIndex === -1 || destListIndex === -1) return

      const sourceTaskList = Array.from(
        board.boardLists[sourceListIndex].taskList
      )
      const destTaskList = Array.from(board.boardLists[destListIndex].taskList)

      const [movedTask] = sourceTaskList.splice(sourceIndex, 1)
      movedTask.taskList = destListId // update the task's list ID
      destTaskList.splice(destIndex, 0, movedTask)

      const updatedSourceList = {
        ...board.boardLists[sourceListIndex],
        taskList: sourceTaskList,
      }

      const updatedDestList = {
        ...board.boardLists[destListIndex],
        taskList: destTaskList,
      }

      dispatch(updateMultipleBoardLists([updatedSourceList, updatedDestList]))
    }
  }

  

  if (!board || !board.boardLists) {
    console.log("board is missing or boardLists undefined")
    return <div>Loading board view...</div>
  }
  if (board.boardLists.length === 0) {
    AddNewEmptyTaskList()
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
                  {board.boardLists.map((list, index) => (
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
