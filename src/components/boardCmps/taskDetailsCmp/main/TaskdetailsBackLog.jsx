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
            <span className="TaskdetailsBackLog">
            <button className="TaskdetailsBackLog-button">
              BACKLOG-SERVER
               <div className="SvgDropBacklog"><SvgServices name='SvgDrop'/></div>
              
             
            </button>
            {!isWatching && <SvgServices name='SvgEye' className='SvgDrop-BACKLOG'/>}
          </span>
          }>
          {(props) => <TaskdetailsBackLogDropdown {...props} Header={'100'} />}
        </DropdownUi>
        </div>
    )
}
export default TaskdetailsBackLog