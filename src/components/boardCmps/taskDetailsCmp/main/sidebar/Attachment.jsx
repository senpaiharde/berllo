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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ← REPLACED backend call with local metadata extraction:
    const url = URL.createObjectURL(file);
    const contentType = file.type;
    const size = file.size;
    const createdAt = Date.now();
    console.log(size, contentType, url, 'meta data file');

    // 4) Dispatch a single liveUpdateTask to append the new attachment
      dispatch(liveUpdateTask({
      workId: 'tasks',
      method: 'update',
      attachments: [
        ...(task.attachments || []),
        { name: file.name, url, contentType, size, createdAt },
      ],
    }));

    e.target.value = '';
    onClose();
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
        <h3 className="attackmentTextsmallh3" >Attach a file from your computer</h3>
        <h3 className="attackmentTextsmall">You can also drag and drop files to upload them.</h3>

        <button
          style={{ marginTop: '8px' ,marginBottom: '8px'}}
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

        <label className="attackmentTextBig">Search or Paste a Link</label>
        <input className="attackmentInput"
        placeholder='Find recent links or paste a new link'/>

        <label className="attackmentTextBig">Display text (optional)</label>
        <input className="attackmentInput"
        placeholder='Text to display'/>

       <h2 className='attackmentViewedText'>Recently Viewed</h2>
       <div>                 {/** where the longs will get displayed */}</div>


      <footer className='attackmentFooter'>
        <button className='attackmentFooterCancel' >cancel</button>
        <button  className='attackmentFooterInsert'>insert</button>
      </footer>
      </div>
    </div>
  );
};

export default Attachment;
