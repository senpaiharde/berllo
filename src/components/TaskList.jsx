import { TaskPreview } from "./TaskPreview.jsx"

export function TaskList({TaskList}) {
  // TaskList.propTypes = {
  //   Tasks: PropTypes.array.isRequired,
  // }
  const taskList = [
    { _id: "safsg", name: "list 1" },
    { _id: "ssgsf", name: "list 2" },
  ]
  return (
    <div>
      
      <ul className="task-list">
        <h1>Task List</h1>
        {taskList.map((Task) => (
          <li key={Task._id}>
            <TaskPreview
            // Task={Task}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
