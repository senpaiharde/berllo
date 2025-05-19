// src/components/boardCmps/taskDetailsCmp/main/TaskDescription.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/TaskDetailsSlice';

import { SvgServices } from '../../../../services/svgServices';

import AttachmentUiDropdown from './dropdowns/AttachmentUiDropdown';
import { TaskOps } from '../../../../services/backendHandler';

export default function AttachmentUi() {
  const dispatch = useDispatch();
  const task = useSelector((s) => s.taskDetailsReducer.selectedTask);

  const handleSave = (html) => {
    dispatch(
      liveUpdateTask({
        method: 'UPDATE',
        workId: 'tasks',
        attachments: html,
      })
    );
  };

  const updateAttachments = (updatedAttachments) => {
    dispatch(
      liveUpdateTask({ method: TaskOps.UPDATE, workId: 'tasks', attachments: updatedAttachments })
    );
  };
  const handleDelete = (templeId) => {
    const updated = (task.attachments || []).filter((a) => a._id !== templeId);
    console.log(updated, 'delete');
    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        attachments: updated,
      })
    );
  };

  const handleMakeCover = (coverImg) => {
    console.log(coverImg, 'cover send');
    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        cover: { coverType: 'image', coverImg: coverImg, coverColor: '' },
      })
    );
  };
  const handleDeleteCover = () => {
    if (!task) return;
    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        cover: null,
      })
    );
  };
  return (
    <section className="td-section-description-main">
      <div className="td-section-attachment-container">
        <div className="SvgLefSvg">
          {' '}
          <SvgServices name="taskDetailsSvgLeft" />
        </div>
        <div className="td-section-attachment-containerDiv">
          <div className="td-section-header-attackment">Attachments</div>
          <button className="attackMentsUiEdit">Add</button>
        </div>
      </div>

      <div className="attackMentsUi">
        <h3 className="attackMentsUiH3">Files</h3>
      </div>
      <ul className="attackMentsUiContainer">
        {task.attachments.map((template, index) => {
          const date = new Date(template.createdAt);

          const formattedDate =
            date.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }) +
            ' ' +
            date.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            });
          return (
            <li key={index} className="attackMentsUiContainerInside">
              <div className="attackMentsUiContainerDiv">
                <div className="attackMentsUiContainerDivInside">
                  <a
                    className="attackMentsUiContainerDivInsideA"
                    href={template.url}
                    download={template.name}
                    title={template.name}>
                    <div
                      className="attachment-thumbnail"
                      style={{ backgroundImage: `url(${template.url})` }}
                    />
                  </a>
                  <div className='"attackMentsUiContainerDivInsideDiv'>
                    <div className="attackMentsUiContainerDivInsideDiv1">{template.name}</div>
                    <p className="attackMentsUiContainerDivInsideDivP"> Added {formattedDate}</p>
                  </div>
                </div>
                <div>
                  <AttachmentUiDropdown
                    trigger={
                      <div className="attackMentsUiContainer-dots">
                        <SvgServices name="SvgDots" />
                      </div>
                    }
                    onDownload={() => {
                      const link = document.createElement('a');
                      link.href = template.url;
                      link.download = template.name;
                      link.click();
                    }}
                    onMakeCover={() => handleMakeCover(template.url)}
                    onDelete={() => handleDelete(template._id)}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
