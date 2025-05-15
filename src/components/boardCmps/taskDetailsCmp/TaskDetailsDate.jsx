import React from 'react';
import { useSelector } from 'react-redux';
import SvgDropDate from '../../../assets/svgDesgin/SvgTaskdetails/SvgDropDate';
import DropdownUi from './main/sidebar/dropdownHardcoded/DropdownUi';

import DropdownDate from './main/sidebar/dropdownHardcoded/DropdownDate';
import { getTaskDueStatus } from '../../../utils/CalendarDays';
const TaskDetailsDate = () => {
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const dueStatus = getTaskDueStatus(task);
  const taskDate = task?.taskDueDate;
  const formattedDate = taskDate
    ? new Date(taskDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour:'numeric',
        minute:'numeric',
      })
    : 'no Date';
  return (
    <section style={{ marginLeft: '-15px' }} className="td-section-top-section">
      <h3 className="td-section-top-h3">Due date</h3>
      <div>
        <DropdownUi
          trigger={
            <button className="Date-Button">
              <span>{formattedDate}</span>
              <span className="notification-button-span">
                <span className="notification-button-span" style={{ marginLeft: '-5px' }}>
                  
                  {dueStatus && (
                    <span className={`task-due-tag ${dueStatus}`}>
                      {dueStatus === 'complete' && 'Complete'}
                      {dueStatus === 'overdue' && 'Overdue'}
                      {dueStatus === 'due-soon' && 'Due soon'}
                      {dueStatus === 'overdue-late' && 'Overdue'}
                    </span>
                  )}
                  <SvgDropDate />
                </span>
              </span>
            </button>
          }>
          {(props) => <DropdownDate {...props} />}
        </DropdownUi>
      </div>
    </section>
  );
};
export default TaskDetailsDate;
