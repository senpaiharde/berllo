import React from "react";
import '../../../styles/taskDetailsFolder/TaskDetailsNotifications.scss';
import SvgWatching from "../../../assets/svgDesgin/SvgWatching";
import SvgCheck from "../../../assets/svgDesgin/SvgCheck";
const TaskDetailsNotifcations = () => {

    return (
        <section className="td-section-top-section">
        <h3 className="td-section-top-h3">Notifications</h3>
        <div>
          <button className="notification-button1"
            
          >
            <span className="notification-button-span">
              <span className="notification-button-span">
                <SvgWatching/>
              </span>
            </span>
            Watching
            <span className="notification-button-span"
              style={{
                marginLeft: "-5px",
              }}
            >
              <span  className="notification-button-span">
                <SvgCheck/>
              </span>
            </span>
          </button>
        </div>
      </section>
    );
  }
    

export default TaskDetailsNotifcations;