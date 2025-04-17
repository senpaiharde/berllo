import { useSelector } from "react-redux";
import SvgDrop from "../../../../assets/svgDesgin/SvgTaskdetails/SvgDrop"
import SvgEye from "../../../../assets/svgDesgin/SvgTaskdetails/SvgEye"


const TaskdetailsBackLog =() => {
    const selectedTask = useSelector((state) => state.taskDetailsReducer?.selectedTask);
    const isWatching = selectedTask?.isWatching;

    return(
        <div className="td-inlist-text">
          in list{' '}
          <span>
            <button className="notification-button">
              BACKLOG-SERVER
              <SvgDrop />
            </button>
            {!isWatching && <SvgEye />}
          </span>
        </div>
    )
}
export default TaskdetailsBackLog