import { TaskList } from "./TaskList"


export function BoardView({ board }) {
// if(boardLists) console.log("TaskLists",boardLists)
const lists=[{_id: 'safsg', name: 'list 1'}, {_id: 'ssgsf', name: 'list 2'},{_id: 'ssgfsf', name: 'list 3'}]

if(board) {
  // console.log("board",board)
  // console.log("board",board.boardTitle)
  // console.log("board",board.boardLists)
}
  return (
    <div className="board-view">
      <ul className="TaskList-list">
        {board.boardLists.map((list) => (
          <li key={list._id}>
            {/* <h1>{list.taskListTitle}</h1> */}
            <TaskList boardList={list} />
          </li>
        ))}
      </ul>
    </div>
  )
}
//