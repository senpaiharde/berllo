import { AddItemCard } from "./AddItemCard"
import { TaskList } from "./TaskList"

export function BoardView({ board }) {
  // if(boardLists) console.log("TaskLists",boardLists)
  //const lists=[{_id: 'safsg', name: 'list 1'}, {_id: 'ssgsf', name: 'list 2'},{_id: 'ssgfsf', name: 'list 3'}]

  if (!board || !board.boardLists) {
    console.log("board is missing or boardLists undefined")
    return <div>Loading board view...</div>
  }
  console.log(" boardLists loaded:", board.boardLists)
  return (
    <div className="board-view">
      <ol className="TaskList-list">
        {board.boardLists.map((list) => {
          return (
            <li className="TaskList-list-item" key={list._id}>
              <TaskList boardList={list} />
            </li>
          )
        })}
        <div className="TaskList-list-add-item">
        <AddItemCard cardDescription={"Add another list"} backgroundColor={" #ffffff3d"} textColor={"#f8f5f5"}></AddItemCard>
        </div>
      </ol>
    </div>
  )
}
//
