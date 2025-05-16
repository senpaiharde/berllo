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
  const textareaClassName = isEmpty ? 'td-description-null' : 'td-description';
  return (
    <section className="td-section">
      <div className="td-section-description">
        <div
          className="SvgLeft"
          style={{ marginRight: '12px', marginLeft: '-32px', marginTop: '-14px' }}>
          <SvgServices name="taskDetailsSvgLeft" />
        </div>
        <div className="td-section-description-container">
          <div className="td-section-header" style={{ fontSize: '16px' }}>
            Description
          </div>

          {!isEmpty && <button className="notification-button-description">Edit</button>}
        </div>
      </div>
      {handleDescriptionChange}
      <textarea
        className={isEmpty ? 'td-description-null' : 'td-description'}
        placeholder={isEmpty ? 'Add a more detailed description...' : ''}
        value={taskDescription}
        onChange={handleDescriptionChange}
      />
    </section>
  );
};

export default TaskDescription;
