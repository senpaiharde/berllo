export function TaskPreviewLabels({ task }) {
  return (
    <div className="task-preview-labels-container">
      {task.taskLabels &&
        task.taskLabels.map((templabel, index) => (
          <div key={index} className="task-preview-label">
            <span style={{ backgroundColor: templabel.color }}></span>
          </div>
        ))}
    </div>
  );
}
