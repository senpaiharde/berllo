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
import { BackgroundImage } from "@mantine/core"
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
        console.log("board.filter.labels", board.filter.labels)
        if (board.filter.labels && board.filter.labels.length > 0) {
          filteredTasks = filteredTasks.filter((task) =>
            task.taskLabels?.some((taskLabel) =>
              board.filter.labels.some(
                (filterLabel) => {
                  console.log("taskLabel", taskLabel)
                  return (
                    filterLabel.color === taskLabel.color &&
                    filterLabel.title === taskLabel.title
                  )
                } // Ensure color is set for the label
              )
            )
          )
        }

        if (board.filter.members && board.filter.members.length > 0) {
          console.log("board.filter.members", board.filter.members)
          filteredTasks = filteredTasks.filter((task) =>
            task.taskMembers?.some((taskMember) =>
              board.filter.members.some(
                (filterMember) => filterMember._id === taskMember._id
              )
            )
          )
        }
        taskSum += filteredTasks.length
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
    dispatch(updateboardFilter({ ...board.filter, taskCount: taskCount }))
  }, [taskCount])

  function AddNewEmptyTaskList(value) {
    dispatch(addBoardList())
    console.log("AddNewEmptyTaskList value", value)
    if (board) {
    } else {
      console.log("AddNewEmptyTaskList : board is missing")
    }
  }

  const onDragEnd = (result, type) => {
    const { destination, source, draggableId } = result
    console.log("onDragEnd", result, type)
    console.log("board.boardLists before change", board.boardLists)
    if (result.type === "BoardList") {
      dispatch(
        updateBoardListOrderAndSync({ draggableId, destination, source })
      )
    }
    if (result.type === "taskList") {
      console.log("onDragEnd taskList", draggableId, destination, source)
      dispatch(updateTasklistOrderAndSync({ draggableId, destination, source }))
    }
  }

  const boardListsById = board.boardLists.map((list) => list._id.toString())
  if (!board || !board.boardLists) {
    console.log("board is missing or boardLists undefined")
    return <div>Loading board view...</div>
  }

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
                            />
                          ) : (
                            <TaskList
                              boardList={list}
                              boardListsById={boardListsById}
                            />
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

      <TaskPreviewEditor />
    </div>
  )
}
