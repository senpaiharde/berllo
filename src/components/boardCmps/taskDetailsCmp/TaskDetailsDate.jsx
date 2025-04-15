import React from "react";
import { useSelector } from "react-redux";
import SvgDropDate from "../../../assets/svgDesgin/SvgTaskdetails/SvgDropDate";
const TaskDetailsDate = () => {
    const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
    const taskDate = task?.taskDueDate;
    const formattedDate = taskDate 
    ? new Date(taskDate).toLocaleDateString('en-US',{
        year:'numeric',
        month:'short',
        day:'numeric',
    }) : 'no Date';
    return (
        <section style={{marginLeft:'-15px'}} className="td-section-top-section">
                <h3 className="td-section-top-h3">Due date</h3>
                <div>
                <button className="Date-Button"
            
          >
                        <span>{formattedDate}</span>
                        <span className="notification-button-span">
              <span className="notification-button-span"
                style={{marginLeft: "-5px"}}
              >
                <SvgDropDate/>
              </span>
            </span>
                    </button>
                </div>
            </section>
    )

}
export default TaskDetailsDate;