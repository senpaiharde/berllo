import React  from "react";
import '../../../styles/taskDetailsFolder/TaskDetailsNotifications.scss';
import SvgWatching from "../../../assets/svgDesgin/SvgWatching";
import SvgCheck from "../../../assets/svgDesgin/SvgCheck";
import { useDispatch, useSelector } from "react-redux";
import { liveUpdateTask } from "../../../redux/taskDetailsSlice";
const TaskDetailsNotifcations = () => {
    const dispatch = useDispatch();
    const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  
    const isWatching = task?.isWatching || false;
  
    function toogleWatching() {
      dispatch(
        liveUpdateTask({
          isWatching: !isWatching,
        })
      );
    }
    
    return (
        <section className="td-section-top-section">
        <h3 className="td-section-top-h3">Notifications</h3>
        <div>
            {isWatching ? (
                <button style={{width:'88px'}}
                onClick={toogleWatching} className="notification-button1">
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
          onClick={toogleWatching} className="notification-button1">
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