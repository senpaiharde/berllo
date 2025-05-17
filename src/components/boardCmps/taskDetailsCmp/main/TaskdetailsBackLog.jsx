import { useSelector } from "react-redux";


import DropdownUi from "./sidebar/dropdownHardcoded/DropdownUi";
import TaskdetailsBackLogDropdown from "./dropdowns/TaskdetailsBackLogDropdown";
import { SvgServices } from "../../../../services/svgServices";


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
               <SvgServices name='SvgDrop'/>
             
            </button>
            {!isWatching && <SvgServices name='SvgEye'/>}
          </span>
          }>
          {(props) => <TaskdetailsBackLogDropdown {...props} />}
        </DropdownUi>
        </div>
    )
}
export default TaskdetailsBackLog