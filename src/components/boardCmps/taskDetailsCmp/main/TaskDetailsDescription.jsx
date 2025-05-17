// src/components/boardCmps/taskDetailsCmp/main/TaskDescription.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/TaskDetailsSlice';
import DescriptionEditor from './DescriptionEditor';
import { SvgServices } from '../../../../services/svgServices';


export default function TaskDescription() {
  const dispatch = useDispatch();
  const task = useSelector(s => s.taskDetailsReducer.selectedTask);
  const saved = task?.taskDescription || '';
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = html => {
    dispatch(
      liveUpdateTask({
        method: 'UPDATE',
        workId: 'tasks',
        args: { taskId: task._id, body: { taskDescription: html } },
      })
    );
    setIsEditing(false);
  };

  return (
    <section className="td-section-description-main">
      <div className="td-section-description-container">
        <div className="SvgLeft" > <SvgServices name="taskDetailsSvgLeft" /></div>
        <div className="td-section-header-description">Description</div>
      </div>

      {isEditing ? (
        <div className="task-description-editor">
          <DescriptionEditor
            initial={saved}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <textarea
          className={saved.trim() ? 'td-description' : 'td-description-null'}
          value={saved.trim() ? saved : 'Add a more detailed description...'}
          readOnly
          onClick={() => setIsEditing(true)}
        />
      )}
    </section>
  );
}
