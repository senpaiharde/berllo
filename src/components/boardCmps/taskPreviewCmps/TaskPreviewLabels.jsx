export function TaskPreviewLabels({task}) {
    // console.log("task",task.taskTitle,"labels",task.taskLabels)
    const templabels = [
        { title: "dsgsg", color: "orange" },
        { title: "dg", color: "red" },
        { title: "sfs", color: "mediumpurple" },
        { title: "fhhf", color: "royalblue" },
        
    ];
  return (
    <div className="task-preview-labels-container">
      {task.taskLabels &&
        task.taskLabels.map((templabel, index) => (
            <div key={index} className="task-preview-label">
              <span style={{ backgroundColor: templabel }}></span>
            </div>
          ))}
    </div>
  )
}
