import { useSelector } from "react-redux";
import SvgDrop from "../../../../assets/svgDesgin/SvgTaskdetails/SvgDrop"
import SvgEye from "../../../../assets/svgDesgin/SvgTaskdetails/SvgEye"
import DropdownUi from "./sidebar/dropdownHardcoded/DropdownUi";
import TaskdetailsBackLogDropdown from "./dropdowns/TaskdetailsBackLogDropdown";


const TaskdetailsBackLog =() => {
    const selectedTask = useSelector((state) => state.taskDetailsReducer?.selectedTask);
    const isWatching = selectedTask?.isWatching;

    return(
        <div className="td-inlist-text">
          in list{' '}
          <DropdownUi
          trigger={
            <span>
            <button className="notification-button">
              BACKLOG-SERVER
              <SvgDrop />
            </button>
            {!isWatching && <SvgEye />}
          </span>
          }>
          {(props) => <TaskdetailsBackLogDropdown {...props} />}
        </DropdownUi>
        </div>
    )
}
export default TaskdetailsBackLog