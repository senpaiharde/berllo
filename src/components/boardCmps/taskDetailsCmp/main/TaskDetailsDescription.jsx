// src/components/boardCmps/taskDetailsCmp/main/TaskDescription.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/TaskDetailsSlice';
import DescriptionEditor from './DescriptionEditor';
import { SvgServices } from '../../../../services/svgServices';
import DropdownUi from './sidebar/dropdownHardcoded/DropdownUi';
import AttachmentSvg from '../../../../assets/svgDesgin/AttachmentSvg';

export default function TaskDescription() {
  const dispatch = useDispatch();
  const task = useSelector((s) => s.taskDetailsReducer.selectedTask);
  const saved = task?.description || '';
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (html) => {
    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        description: html,
      })
    );
    setIsEditing(false);
  };

  const taRef = useRef(null);

  useEffect(() => {
    if (!taRef.current) return;
    
    taRef.current.style.height = 'auto';
    taRef.current.style.height = taRef.current.scrollHeight + 'px';
  }, [saved, isEditing]);
  return (
    <section className="td-section-description-main">
      <div className="td-section-attachment-container">
        <div className="SvgLefSvg">
          {' '}
          <SvgServices name="taskDetailsSvgLeft" />
        </div>
        <div className="td-section-attachment-containerDiv">
          <div className="td-section-header-attackment">Description</div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="attackMentsUiEdit">
            Edit
          </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="task-description-editor">
          <DescriptionEditor
          height={'315px'}
            textarea={'275px'}
            textarea1yes={'223px'}
            initial={saved}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <textarea
          ref={taRef}
          className={saved.trim() ? 'td-description' : 'td-description-null'}
          value={saved.trim() ? saved : 'Add a more detailed description...'}
          readOnly
          onClick={() => setIsEditing(true)}
        />
      )}
    </section>
  );
}
