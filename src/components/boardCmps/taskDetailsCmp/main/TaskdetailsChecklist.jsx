import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DropdownChecklist from '../main/sidebar/dropdownHardcoded/DropdownChecklist';


import ProgressBar from '../../../../utils/ProgressBar';
import { TaskOps } from '../../../../services/backendHandler';
import { liveUpdateTask } from '../../../../redux/taskDetailsSlice';
import DropdownUi from './sidebar/dropdownHardcoded/DropdownUi';
import DropdowndeleteCheck from './dropdowns/DropdowndeleteCheck';
import { SvgServices } from '../../../../services/svgServices';

const generateId = () => Math.random().toString(36).substr(2, 9);

const TaskChecklist = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  const [hideChecked, setHideChecked] = useState(false);
  const [hovering, setHovering] = useState(null);

  const [activeKey, setActiveKey] = useState(null);
  const [draftText, setDraftText] = useState('');

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
                    <div style={{marginRight:'5px'}}>
                        <SvgServices name='SvgCheckV'/>
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
                    style={{ height: '32px', width: '65px' }}
                    >
                    Delete
                  </button>
                    }>
                        {(props) => <DropdowndeleteCheck {...props} onDelete={() => handleDeleteGroup(gKey)} />}
                        
                    </DropdownUi>
                  
                </div>
              </div>

              <ProgressBar completionPercentage={pct} />
            </div>

            {visible.map((item, i) => {
              const key = getItemKey(item, i);
              const isActive = activeKey === key;

              return (
                <div
                  key={key}
                  className="checklist-item-wrapper"
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHovering(key)}
                  onMouseLeave={() => setHovering(null)}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggleCheck(gKey, key)}
                    className="checklist-item-wrapper-checkbox"
                  />

                  <div
                    className={'checklist-item-wrapper-Text' + (isActive ? ' active' : '')}
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
                            <div
                            className="checklist-save-cancel-div"
                            >
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
                          <div className='checklist-save-cancel-div2'>


                          <div className="checklist-save-cancel-div2-Assign">
                            Assign

                          </div>
                          
                          <div className="checklist-save-cancel-div2-Due">
                            Due date

                          </div>
 


                        <DropdownChecklist
                          trigger={
                            <div  className="checklist-save-cancel-div2-dots">
                                <SvgServices name='SvgDots'/>
                            
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
                              <SvgServices name='SvgDots'/>
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
