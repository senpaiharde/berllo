import React, { useEffect, useRef, useState } from 'react';

import { liveUpdateTask } from '../../../../../redux/taskDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TaskOps } from '../../../../../services/backendHandler';
import { SvgServices } from '../../../../../services/svgServices';

const Attachment = ({ onClose }) => {
  const dispatch = useDispatch();
  const task = useSelector((s) => s.taskDetailsReducer.selectedTask);
  const fileInputRef = useRef();

  // 1) When the user clicks "Choose a file"
  const handleChoose = () => {
    fileInputRef.current.click();
  };

  // 2) When they select a file
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 3) Upload via your backend (TaskOps.uploadAttachment is hypothetical)
    //    It should return { url, contentType, size }
    const { url, contentType, size } = await TaskOps.uploadAttachment(task._id, file);

    // 4) Dispatch a single liveUpdateTask to append the new attachment
    dispatch(
      liveUpdateTask({
        method: 'UPDATE',
        workId: 'tasks',

        attachments: [
          ...(task.attachments || []),
          {
            name: file.name,
            url,
            contentType,
            size,
          },
        ],
      })
    );

    // 5) Clear the input so the same file can be re-selected if needed
    e.target.value = '';
    onClose(); // close the dropdown if that’s desired
  };

  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Attach</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgServices name="SvgClose" />
        </button>
      </div>

      {/* Options */}
      <div className="coverstyle">
        <h3 className="DropdownLabelH3">Attach a file from your computer</h3>
        <h3 className="DropdownLabelH3">You can also drag and drop files to upload them.</h3>

        <button
          style={{ marginTop: '10px' }}
          className="DropdownCoverButton"
          onClick={handleChoose}>
          Choose a file
        </button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <hr className="DropdownHrCover" />
      </div>
    </div>
  );
};

export default Attachment;
