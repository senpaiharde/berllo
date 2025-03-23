import { TaskList } from "./TaskList"


export function BoardView({ TaskLists }) {

const lists=[{_id: 'safsg', name: 'list 1'}, {_id: 'ssgsf', name: 'list 2'},{_id: 'ssgfsf', name: 'list 3'}]

  return (
    <div className="board-view">
      <ul className="TaskList-list">
        {lists.map((list) => (
          <li key={list._id}>
            <TaskList
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
