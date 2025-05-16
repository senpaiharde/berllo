import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DropdownChecklist from '../main/sidebar/dropdownHardcoded/DropdownChecklist';
import SvgDots from '../../../../assets/svgDesgin/SvgDate/SvgDors';
import SvgCheckV from '../../../../assets/svgDesgin/SvgDate/SvgCheck';
import ProgressBar from '../../../../utils/ProgressBar';
import { TaskOps } from '../../../../services/backendHandler';
import { liveUpdateTask } from '../../../../redux/taskDetailsSlice';

const generateId = () => Math.random().toString(36).substr(2, 9);

const TaskChecklist = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const [hideChecked, setHideChecked] = useState(false);
  const [hovering, setHovering] = useState(null);

  if (!selectedTask || !Array.isArray(selectedTask.checklist)) return null;

  // Helpers for keys
  const getGroupKey = (group) => (group._id ? group._id.toString() : group.id);
  const getItemKey = (item) => (item._id ? item._id.toString() : item.id);

  // Common: rebuild checklist and dispatch
  const updateChecklist = (updatedChecklist) => {
    dispatch(
      liveUpdateTask({ method: TaskOps.UPDATE, workId: 'tasks', checklist: updatedChecklist })
    );
  };

  const handleToggleCheck = (groupKey, itemKey) => {
    const updated = selectedTask.checklist.map((group) => {
      if (getGroupKey(group) !== groupKey) return group;
      const items = Array.isArray(group.items) ? group.items : [];
      return {
        ...group,
        items: items.map((item) =>
          getItemKey(item) === itemKey ? { ...item, done: !item.done } : item
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
        items: items.map((item) =>
          getItemKey(item) === itemKey ? { ...item, text: newText } : item
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

  const handleClearGroup = (groupKey) => {
    const updated = selectedTask.checklist.map((group) =>
      getGroupKey(group) !== groupKey ? group : { ...group, items: [] }
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
    <div className="MainChecklist">
      {selectedTask.checklist.map((group) => {
        const gKey = getGroupKey(group);
        const items = Array.isArray(group.items) ? group.items : [];
        const completed = items.filter((i) => i.done).length;
        const total = items.length;
        const pct = total > 0 ? (completed / total) * 100 : 0;
        const visible = hideChecked ? items.filter((i) => !i.done) : items;

        return (
          <section key={gKey}>
            <div className="MainChecklistHeader">
              <div className="MainChecklistHeaderText">
                <div className="MainChecklistHeaderLeft">
                  <SvgCheckV />
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
                  <button
                    className="notification-button-check"
                    style={{ height: '32px', width: '65px' }}
                    onClick={() => handleDeleteGroup(gKey)}>
                    Delete
                  </button>
                </div>
              </div>

              <ProgressBar completionPercentage={pct} />
            </div>

            {visible.map((item) => {
              const key = getItemKey(item);
              return (
                <div
                  key={key}
                  className="checklist-item-wrapper"
                  onMouseEnter={() => setHovering(key)}
                  onMouseLeave={() => setHovering(null)}>
                  <input
                    type="checkbox"
                    checked={item.done}
                     onChange={() => handleToggleCheck(gKey, key)}
                    className="checklist-item-wrapper-checkbox"
                  />

                  <div className="checklist-item-wrapper-Text">
                    <input
                      className="checklist-item-wrapper-Text-input"
                      type="text"
                      value={item.text || ''}
                      onChange={(e) => handleEditText(gKey, key, e.target.value)}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid #388bff';
                        e.target.style.boxShadow = '0 0 0 2px #388bff33';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = 'none';
                        e.target.style.boxShadow = 'none';
                      }}
                    />

                    {hovering === key && (
                      <div style={{ position: 'absolute', top: '6px', right: '9px' }}>
                        <DropdownChecklist
                          trigger={
                            <button
                              className="checklist-item-wrapper-dots"
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = 'rgba(9,30,66,0.18)')
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = 'rgba(9,30,66,0.06)')
                              }
                              onMouseDown={(e) =>
                                (e.currentTarget.style.backgroundColor = 'rgba(9,30,66,0.18)')
                              }
                              onMouseUp={(e) =>
                                (e.currentTarget.style.backgroundColor = 'rgba(9,30,66,0.12)')
                              }>
                              <SvgDots />
                            </button>
                          }
                          onDelete={() => handleDeleteItem(gKey, key)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <button
              className="notification-button-check"
              style={{ marginTop: '20px', marginLeft: '16px' }}
              onClick={() => handleAddItem(gKey)}>
              Add an item
            </button>
          </section>
        );
      })}
    </div>
  );
};

export default TaskChecklist;








  {isActive && (
                      <form
                        className="checklist-save-cancel"
                        onSubmit={(e) => {
                          e.preventDefault();
                         handleEditText(gKey, key, draftText);
                          setActiveKey(null);
                        }}
                      >
                        <textarea
                          className="checklist-save-cancel-textarea"
                          value={draftText}
                         onChange={(e) => setDraftText(e.target.value)}
                        />
                        <div className="checklist-save-cancel-div">
                          <button
                            type="submit"
                            className="checklist-save-cancel-div1-save"
                            
                       >
                           Save
                          </button>
                         <button
                            type="button"
                            className="checklist-save-cancel-div1-cancel"
                            onClick={() => setActiveKey(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}



{isActive && (
                      <form className="checklist-save-cancel" onSubmit={(e) => e.preventDefault()}>
                        <textarea
                          className="checklist-save-cancel-textarea"
                          value={draftText}
                          onChange={(e) => setDraftText(e.target.value)}
                        />
                        <div className="checklist-save-cancel-div">
                          <button
                            type="button"
                            className="checklist-save-cancel-div1-save"
                            onClick={() => {
                              handleEditText(gKey, key, draftText);
                              setActiveKey(null);
                            }}>
                            Save
                          </button>
                          <button
                            type="button"
                            className="checklist-save-cancel-div1-cancel"
                            onClick={() => setActiveKey(null)}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
