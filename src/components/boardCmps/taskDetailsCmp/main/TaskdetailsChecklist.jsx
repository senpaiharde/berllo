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

  // Helper: use existing _id or generated id as a key
  const getItemKey = (item) => (item._id ? item._id.toString() : item.id);

  const handleToggleCheck = (groupId, itemId) => {
    if (!selectedTask) return;
    const updatedChecklist = selectedTask.checklist.map((group) => {
      if (group._id.toString() !== groupId) return group;
      return {
        ...group,
        items: group.items.map((item) => {
          const key = getItemKey(item);
          return key === itemId ? { ...item, done: !item.done } : item;
        }),
      };
    });
    dispatch(
      liveUpdateTask({ method: TaskOps.UPDATE, workId: 'tasks', checklist: updatedChecklist })
    );
  };

  const handleEditText = (groupId, itemId, newText) => {
    if (!selectedTask) return;
    const updatedChecklist = selectedTask.checklist.map((group) => {
      if (group._id.toString() !== groupId) return group;
      return {
        ...group,
        items: group.items.map((item) => {
          const key = getItemKey(item);
          return key === itemId ? { ...item, text: newText } : item;
        }),
      };
    });
    dispatch(
      liveUpdateTask({ method: TaskOps.UPDATE, workId: 'tasks', checklist: updatedChecklist })
    );
  };

  const handleDeleteGroup = (groupId) => {
    if (!selectedTask) return;
    const updatedChecklist = selectedTask.checklist.filter(
      (group) => group._id.toString() !== groupId
    );
    dispatch(
      liveUpdateTask({ method: TaskOps.UPDATE, workId: 'tasks', checklist: updatedChecklist })
    );
  };

  const handleAddItem = (groupId) => {
    if (!selectedTask) return;
    const newItem = { id: generateId(), text: 'New Item', done: false };
    const updatedChecklist = selectedTask.checklist.map((group) =>
      group._id.toString() !== groupId
        ? group
        : { ...group, items: [...group.items, newItem] }
    );
    dispatch(
      liveUpdateTask({ method: TaskOps.UPDATE, workId: 'tasks', checklist: updatedChecklist })
    );
  };

  const handleClearGroup = (groupId) => {
    if (!selectedTask) return;
    const updatedChecklist = selectedTask.checklist.map((group) =>
      group._id.toString() !== groupId ? group : { ...group, items: [] }
    );
    dispatch(
      liveUpdateTask({ method: TaskOps.UPDATE, workId: 'tasks', checklist: updatedChecklist })
    );
  };

  const handleDeleteItem = (groupId, itemId) => {
    if (!selectedTask) return;
    const updatedChecklist = selectedTask.checklist.map((group) => {
      if (group._id.toString() !== groupId) return group;
      return {
        ...group,
        items: group.items.filter((item) => getItemKey(item) !== itemId),
      };
    });
    dispatch(
      liveUpdateTask({ method: TaskOps.UPDATE, workId: 'tasks', checklist: updatedChecklist })
    );
  };

  return (
    <div className="MainChecklist">
      {selectedTask.checklist.map((group) => {
        const completed = group.items.filter((i) => i.done).length;
        const total = group.items.length;
        const pct = total > 0 ? (completed / total) * 100 : 0;
        const visible = hideChecked ? group.items.filter((i) => !i.done) : group.items;

        return (
          <section key={group._id.toString()}>
            <div className="MainChecklistHeader">
              <div className="MainChecklistHeaderText">
                <div className="MainChecklistHeaderLeft">
                  <SvgCheckV />
                  <h2 className="MainChecklistHeaderLeftH2">{group.title}</h2>
                </div>
                <div className="MainChecklistHeaderButtons">
                  <button
                    className="notification-button-check"
                    style={{ marginRight: '8px', height: '32px', width: '147px', fontWeight: '500' }}
                    onClick={() => setHideChecked(!hideChecked)}
                  >
                    {hideChecked ? 'Show Checked items' : 'Hide Checked items'}
                  </button>
                  <button
                    className="notification-button-check"
                    style={{ height: '32px', width: '65px' }}
                    onClick={() => handleDeleteGroup(group._id.toString())}
                  >
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
                  onMouseLeave={() => setHovering(null)}
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggleCheck(group._id.toString(), key)}
                    className="checklist-item-wrapper-checkbox"
                  />

                  <div className="checklist-item-wrapper-Text">
                    <input
                      className="checklist-item-wrapper-Text-input"
                      type="text"
                      value={item.text || ''}
                      onChange={(e) => handleEditText(group._id.toString(), key, e.target.value)}
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
                              }
                            >
                              <SvgDots />
                            </button>
                          }
                          onDelete={() => handleDeleteItem(group._id.toString(), key)}
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
              onClick={() => handleAddItem(group._id.toString())}
            >
              Add an item
            </button>
          </section>
        );
      })}
    </div>
  );
};

export default TaskChecklist;
