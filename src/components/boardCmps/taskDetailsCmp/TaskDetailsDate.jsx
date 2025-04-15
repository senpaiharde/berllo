import React from "react";
import { useSelector } from "react-redux";
import SvgDropDate from "../../../assets/svgDesgin/SvgTaskdetails/SvgDropDate";
const TaskDetailsDate = () => {
    const data = useSelector((state) => state.taskDetailsReducer?.selectedTask);

    return (
        <section style={{marginLeft:'-15px'}} className="td-section-top-section">
                <h3 className="td-section-top-h3">Due date</h3>
                <div>
                <button className="Date-Button"
            
          >
                        <span>2 Apr, 13:15</span>
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