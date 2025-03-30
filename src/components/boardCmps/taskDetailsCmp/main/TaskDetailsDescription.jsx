import React from "react";

const TaskDetailsDescription = () => {


    return(
        <div className="td-section">
              <div className="td-section-header">Description</div>
              <textarea
                className="td-description"
                value={selectedTask.taskDescription || ""}
                onChange={handleDescriptionChange}
              />
            </div>

    )
}
export default TaskDetailsDescription;