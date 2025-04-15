import React, {  useState } from "react";
import '../../../styles/taskDetailsFolder/TaskDetailsNotifications.scss';
import SvgWatching from "../../../assets/svgDesgin/SvgWatching";
import SvgCheck from "../../../assets/svgDesgin/SvgCheck";
const TaskDetailsNotifcations = () => {
    const [isWatching, setIsWatching] = useState(false);


    return (
        <section className="td-section-top-section">
        <h3 className="td-section-top-h3">Notifications</h3>
        <div>
            {isWatching ? (
                <button style={{width:'88px'}}
                onClick={() => setIsWatching(prev => !prev)} className="notification-button1">
            <span className="notification-button-span">
              <span className="notification-button-span">
                <SvgWatching/>
              </span>
            </span>
            Watch
            <span className="notification-button-span"
              style={{
                marginLeft: "-5px",
              }}
            >
              <span  className="notification-button-span">
                {isWatching ? '' : <SvgCheck/>}
              </span>
            </span>
          </button>) : (<button  
          onClick={() => setIsWatching(prev => !prev)} className="notification-button1">
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
          </button>)}
          
        </div>
      </section>
    );
  }
    

export default TaskDetailsNotifcations;