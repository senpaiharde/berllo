import { useState, useRef } from "react"
export function BoardHeader({ board }) {

  const [currentBoard, setCurrentBoard] = useState(board)
  function toggleBoardStar() {
    console.log("toggleBoardStar")
  }
  function changeVisibility() {
    console.log("changeVisibility")
  }
  function changeToBoardView() {
    console.log("changeToBoardView")
  }
  function changeToTableView() {
    console.log("changeToTableView")
  }
  function toggleDropDown() {
    console.log("toggleDropDown")
  }
  function toggleFilterCmp() {
    console.log("toggleFilterCmp")
  }
  function toggleUserCmp(user) {
    console.log("toggleUserCmp", user)
  }
  function shareBoard(board) {
    console.log("shareBoard", board)
  }
  
  return (
    <span className="board-header">
      <span>{currentBoard.boardTitle}</span>
      <button className="toggleable" onClick={() => toggleBoardStar()}>
        star
      </button>
      <button className="toggleable" onClick={() => changeVisibility()}>
        change visibility
      </button>
      <button className="toggleable" onClick={() => changeToBoardView()}>
        Board
      </button>
      <button className="toggleable" onClick={() => changeToTableView()}>
        Table
      </button>
      <button className="toggleable" onClick={() => toggleDropDown()}>
        dropDown
      </button>
      <button className="toggleable" onClick={() => toggleFilterCmp()}>
        Filters
      </button>
      {board.users &&
        board.users.map((user) => (
          <span onClick={(user) => toggleUserCmp(user)}>{user.name}</span>
        ))}
      <button className="toggleable" onClick={() => shareBoard(board)}>
        Share
      </button>
    </span>
  )
}
