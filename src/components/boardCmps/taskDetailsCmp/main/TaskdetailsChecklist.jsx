import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DropdownChecklist from '../main/sidebar/dropdownHardcoded/DropdownChecklist';

import ProgressBar from '../../../../utils/ProgressBar';
import { TaskOps } from '../../../../services/backendHandler';
import { liveUpdateTask } from '../../../../redux/TaskDetailsSlice';
import DropdownUi from './sidebar/dropdownHardcoded/DropdownUi';
import DropdowndeleteCheck from './dropdowns/DropdowndeleteCheck';
import { SvgServices } from '../../../../services/svgServices';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

const generateId = () => Math.random().toString(36).substr(2, 9);

const TaskChecklist = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  const [hideChecked, setHideChecked] = useState(false);
  const [hovering, setHovering] = useState(null);

  const [activeKey, setActiveKey] = useState(null);
  const [draftText, setDraftText] = useState('');
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || source.droppableId !== destination.droppableId) return;

    const updated = selectedTask.checklist.map((group) => {
      if (getGroupKey(group) !== source.droppableId) return group;
      const items = Array.from(group.items || []);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      return { ...group, items };
    });
    updateChecklist(updated);
  };
  if (!selectedTask || !Array.isArray(selectedTask.checklist)) return null;

  // Helpers for keys
  const getGroupKey = (group) => (group._id ? group._id.toString() : group.id);
  const getItemKey = (item, index) => item._id?.toString() || item.id || index.toString();

  // Dispatch helper
  const updateChecklist = (updatedChecklist) => {
    dispatch(
      liveUpdateTask({ method: TaskOps.UPDATE, workId: 'tasks', checklist: updatedChecklist })
    );
  };

  // Handlers
  const handleToggleCheck = (groupKey, itemKey) => {
    const updated = selectedTask.checklist.map((group) => {
      if (getGroupKey(group) !== groupKey) return group;
      const items = Array.isArray(group.items) ? group.items : [];
      return {
        ...group,
        items: items.map((item, i) =>
          getItemKey(item, i) === itemKey ? { ...item, done: !item.done } : item
        ),
      };
    });
    updateChecklist(updated);
  };

  const handleEditText = (groupKey, itemKey, newText) => {
    const updated = selectedTask.checklist.map((group) => {
      if (getGroupKey(group) !== groupKey) return group;
      const items = Array.isArray(group.items) ? group.items : [];
      return {
        ...group,
        items: items.map((item, i) =>
          getItemKey(item, i) === itemKey ? { ...item, text: newText } : item
        ),
      };
    });
    updateChecklist(updated);
  };

  const handleDeleteGroup = (groupKey) => {
    const updated = selectedTask.checklist.filter((group) => getGroupKey(group) !== groupKey);
    updateChecklist(updated);
  };

  const handleAddItem = (groupKey) => {
    const newItem = { id: generateId(), text: 'New Item', done: false };
    const updated = selectedTask.checklist.map((group) =>
      getGroupKey(group) !== groupKey
        ? group
        : { ...group, items: [...(Array.isArray(group.items) ? group.items : []), newItem] }
    );
    updateChecklist(updated);
  };

  const handleDeleteItem = (groupKey, itemKey) => {
    const updated = selectedTask.checklist.map((group) => {
      if (getGroupKey(group) !== groupKey) return group;
      const items = Array.isArray(group.items) ? group.items : [];
      return {
        ...group,
        items: items.filter((item) => getItemKey(item) !== itemKey),
      };
    });
    updateChecklist(updated);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="MainChecklist">
        {selectedTask.checklist.map((group) => {
          const gKey = getGroupKey(group);
          const items = Array.isArray(group.items) ? group.items : [];
          const completed = items.filter((i) => i.done).length;
          const total = items.length;
          const pct = total > 0 ? (completed / total) * 100 : 0;
          const visible = hideChecked ? items.filter((i) => !i.done) : items;

          return (
            <section style={{ marginBottom: '15px' }} key={gKey}>
              <div className="MainChecklistHeader">
                <div className="MainChecklistHeaderText">
                  <div className="MainChecklistHeaderLeft">
                    <div style={{ paddingRight: '10px', color: '#44546f', marginLeft: '-4px' }}>
                      <SvgServices name="SvgCheckV" />
                    </div>

                    <h2 className="MainChecklistHeaderLeftH2">{group.title}</h2>
                  </div>
                  <div className="MainChecklistHeaderButtons">
                    <button
                      className="notification-button-check"
                      style={{
                        marginRight: '8px',
                        height: '32px',
                        width: '147px',
                        fontWeight: '500',
                      }}
                      onClick={() => setHideChecked(!hideChecked)}>
                      {hideChecked ? 'Show Checked items' : 'Hide Checked items'}
                    </button>
                    <DropdownUi
                      trigger={
                        <button
                          className="notification-button-check"
                          style={{ height: '32px', width: '65px' }}>
                          Delete
                        </button>
                      }>
                      {(props) => (
                        <DropdowndeleteCheck {...props} onDelete={() => handleDeleteGroup(gKey)} />
                      )}
                    </DropdownUi>
                  </div>
                </div>

                <ProgressBar completionPercentage={pct} />
              </div>
              <Droppable droppableId={gKey}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {visible.map((item, i) => {2
                      const key = getItemKey(item, i);
                      const isActive = activeKey === key;

                      return (
                        <Draggable key={key} draggableId={key} index={i}>
                            {(prov) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                             {...prov.dragHandleProps}
                            className="checklist-item-wrapper"
                            style={{ position: 'relative', ...prov.draggableProps.style }}
                            onMouseEnter={() => setHovering(key)}
                            onMouseLeave={() => setHovering(null)}>
                            {item.done === true ? (
                              <span
                                onClick={() => handleToggleCheck(gKey, key)}
                                className="checklist-item-wrapper-done">
                                <div className="checklistDone">
                                  <SvgServices name="checklistDone" />
                                </div>
                              </span>
                            ) : (
                              <span
                                onClick={() => handleToggleCheck(gKey, key)}
                                className="checklist-item-wrapper-Undone"></span>
                            )}

                            <div
                              className={
                                'checklist-item-wrapper-Text' + (isActive ? ' active' : '')
                              }
                              onClick={() => {
                                setActiveKey(key);
                                setDraftText(item.text);
                              }}>
                              {/* inline input or your existing form */}
                              {!isActive && (
                                <input
                                  className="checklist-item-wrapper-Text-input"
                                  type="text"
                                  value={item.text || ''}
                                  readOnly
                                  style={{
                                    textDecoration: item.done ? 'line-through' : 'none',
                                  }}
                                />
                              )}
                              {isActive && (
                                <form
                                  className="checklist-save-cancel"
                                  onSubmit={(e) => {
                                    setActiveKey(null);
                                    e.preventDefault();
                                  }}>
                                  <textarea
                                    className="checklist-save-cancel-textarea"
                                    value={draftText}
                                    onChange={(e) => setDraftText(e.target.value)}
                                  />
                                  <div className="checklist-save-cancel-div-warper">
                                    <div className="checklist-save-cancel-div">
                                      <button
                                        type="submit"
                                        className="checklist-save-cancel-div1-save"
                                        onClick={() => {
                                          handleEditText(gKey, key, draftText);
                                        }}>
                                        Save
                                      </button>
                                      <button
                                        type="submit"
                                        className="checklist-save-cancel-div1-cancel"
                                        onClick={() => setActiveKey(null)}>
                                        Cancel
                                      </button>
                                    </div>
                                    <div className="checklist-save-cancel-div2">
                                      <div className="checklist-save-cancel-div2-Assign">
                                        Assign
                                      </div>

                                      <div className="checklist-save-cancel-div2-Due">Due date</div>
                                      <div className='dots'></div>
                                      <DropdownChecklist
                                        trigger={
                                          <div className="checklist-save-cancel-div2-dots">
                                            <SvgServices name="SvgDots" />
                                          </div>
                                        }
                                        onDelete={() => handleDeleteItem(gKey, key)}
                                      />
                                    </div>
                                  </div>
                                </form>
                              )}
                              {hovering === key && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '6px',
                                    right: '9px',
                                  }}>
                                  <DropdownChecklist
                                    trigger={
                                      <button className="checklist-item-wrapper-dots">
                                        <SvgServices name="SvgDots" />
                                      </button>
                                    }
                                    onDelete={() => handleDeleteItem(gKey, key)}
                                  />
                                </div>
                              )}
                            </div>
                          </div>)}
                        </Draggable>
                      );
                    })}{' '}
                  </div>
                )}
              </Droppable>

              <button
                className="notification-button-check"
                style={{ marginTop: '8px', marginLeft: '12px' }}
                onClick={() => handleAddItem(gKey)}>
                Add an item
              </button>
            </section>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskChecklist;
