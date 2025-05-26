import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/TaskDetailsSlice';

import { SvgServices } from '../../../../services/svgServices';

import AttachmentUiDropdown from './dropdowns/AttachmentUiDropdown';

import DropdownUi from './sidebar/dropdownHardcoded/DropdownUi';
import Attachment from './sidebar/Attachment';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

export default function AttachmentUi() {
  const dispatch = useDispatch();
  const task = useSelector((s) => s.taskDetailsReducer.selectedTask);

  const handleReorder = (result) => {
    const { source, destination } = result;
    if (!destination || source.droppableId !== destination.droppableId) return;

    const updated = Array.from(task.attachments || []);
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        attachments: updated,
      })
    );
  };
  const handleSave = (html) => {
    dispatch(
      liveUpdateTask({
        method: 'UPDATE',
        workId: 'tasks',
        attachments: html,
      })
    );
  };

  const updateText = (newName, changingId) => {
    const updated = task.attachments.map((att) =>
      att._id === changingId ? { ...att, name: newName } : att
    );

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        attachments: updated,
      })
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

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    // TODO: actually upload these files, then dispatch liveUpdateTask to add them.
    console.log('Dropped files:', files);
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <DragDropContext onDragEnd={handleReorder}>
      <section className="td-section-description-main">
        <div className="td-section-attachment-container">
          <div className="SvgLefSvg">
            {' '}
            <SvgServices name="AttackmentSvg" />
          </div>
          <div className="td-section-attachment-containerDiv">
            <div className="td-section-header-attackment">Attachments</div>
            <DropdownUi trigger={<button className="attackMentsUiEdit">Add</button>}>
              {(props) => <Attachment {...props} />}
            </DropdownUi>
          </div>
        </div>

        <div className="attackMentsUi">
          <h3 className="attackMentsUiH3">Files</h3>
        </div>
        <Droppable droppableId="attachments">
          {(provided) => (
            <ul
              className="attackMentsUiContainer"
              ref={provided.innerRef}
              {...provided.droppableProps}>
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
                  <Draggable key={template._id} draggableId={template._id} index={index}>
                    {(prov) => (
                      <li
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className="attackMentsUiContainerInside">
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
                              <div className="attackMentsUiContainerDivInsideDiv1">
                                {template.name}
                              </div>
                              <p className="attackMentsUiContainerDivInsideDivP">
                                {' '}
                                Added {formattedDate}
                              </p>
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
                              onEdit={(newName) => updateText(newName, template._id)}
                              value={template.name}
                              onMakeCover={() => handleMakeCover(template.url)}
                              onDelete={() => handleDelete(template._id)}
                            />
                          </div>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
            </ul>
          )}
        </Droppable>
      </section>
    </DragDropContext>
  );
}
