import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/TaskDetailsSlice';
import { SvgServices } from '../../../../services/svgServices';

const TaskDescription = () => {
  const dispatch = useDispatch();
  const taskDescription = useSelector(
    (state) => state.taskDetailsReducer?.selectedTask?.taskDescription || ''
  );

  const handleDescriptionChange = (e) => {
    dispatch(liveUpdateTask({ taskDescription: e.target.value }));
  };
  const isEmpty = taskDescription.trim() === '';
  
  return (
    <section className="td-section-description-main">
      <div className="td-section-description">
       
        <div className="td-section-description-container">
             <div
          className="SvgLeft"
          style={{ marginRight: '12px', marginLeft: '-32px', }}>
          <SvgServices name="taskDetailsSvgLeft" />
        </div>
          <div className="td-section-header-description">
            Description
          </div>

          {!isEmpty && <button className="notification-button-description">Edit</button>}
        </div>
      </div>
      {handleDescriptionChange}
      <textarea
        className={isEmpty ? 'td-description-null' : 'td-description'}
        value={isEmpty ? 'Add a more detailed description...' : `${taskDescription}`}
       
        onChange={handleDescriptionChange}
      />
    </section>
  );
};

export default TaskDescription;
