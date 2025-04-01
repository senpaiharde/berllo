import { AddItemCard } from "./addItemCard/AddItemCard"
import { TaskList } from "./TaskList"
import { useState, useRef, useEffect } from "react"
import { TextEditInput } from "./TextEditInput"
import { addBoardList } from "../../redux/BoardSlice"
import { useDispatch } from "react-redux"

export function BoardView({ board }) {
  const [newListClicked, setNewListClicked] = useState(true)
  const dispatch = useDispatch()
  function AddNewEmptyTaskList() {
    // console.log("AddNewTaskList")
    dispatch(addBoardList())
  }

  // const newTaskList ={
  //   taskListTitle : ""
  // }

  if (!board || !board.boardLists) {
    console.log("board is missing or boardLists undefined")
    return <div>Loading board view...</div>
  }
  // console.log(" boardLists loaded:", board.boardLists)
  return (
    <div className="board-view">
      <ol className="TaskList-list">
        {board.boardLists.map((list) => {
          return (
            <li className="TaskList-list-item" key={list._id}>
              {list.taskListTitle === "" ? (
                <TaskList boardList={list} newTaskList={true}></TaskList>
              ) : (
                <TaskList boardList={list} />
              )}
            </li>
          )
        })}
        <div className="TaskList-list-add-item "  
        // style={{ backgroundColor: " #ffffff3d", color: "#f8f5f5" }}
        >
          {/* {newListClicked === false ?
          <div className="TaskList-list-item">
            <TaskList boardList={newTaskList} isNewTaskList={true} onAddNewTaskList={AddNewTaskList}></TaskList>
          </div>
          :
          <AddItemCard cardDescription={"Add another list"} backgroundColor={" #ffffff3d"} textColor={"#f8f5f5"} onItemCardClick={AddNewTaskList}></AddItemCard>
          } */}

          <AddItemCard
            cardDescription={"Add another list"}
            backgroundColor={" #ffffff3d"}
            textColor={"#f8f5f5"}
            addListClass={true}
            onItemCardClick={AddNewEmptyTaskList}
          ></AddItemCard>
        </div>
      </ol>
    </div>
  )
}
//
