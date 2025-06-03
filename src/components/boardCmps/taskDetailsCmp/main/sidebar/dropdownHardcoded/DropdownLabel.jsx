import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../../../redux/TaskDetailsSlice';
import SvgAdd from '../../../../../../assets/svgDesgin/SvgAdd';
import DropdownUi from './DropdownUi';
import EditLabelDropdown from './EditLabelDropdown';
import { updateBoardLabels } from '../../../../../../redux/BoardSlice';
import { SvgServices } from '../../../../../../services/svgServices';

const DropdownLabel = ({ onClose }) => {
  const [editModeLabel, setEditModeLabel] = useState(null);
  const [addModeLabel, setAddModeLabel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const boardLabels = useSelector((state) => state.boardReducer.boardLabels) || [];
  const taskLabels = Array.isArray(task?.labels) ? task.labels : [];
 const normalizeLabels = (labels) =>
  labels.map((label) =>
    typeof label === 'string'
      ? { color: label, title: '' }
      : label
  );
  const colorList = [
    ...boardLabels,
    ...taskLabels
      .filter(
        (label) =>
          label?.color &&
          !boardLabels.some(
            (lbl) => lbl?.color && lbl.color.toLowerCase() === label.color.toLowerCase()
          )
      )
      .map((label) => ({
        color: label.color,
        title: label.title || '',
      })),
  ];

  const uniqueColors = colorList.filter(
    (item, index, self) => index === self.findIndex((i) => i.color === item.color)
  );
  
  const filteredLabels = uniqueColors.filter((label) => {
    if (!searchTerm.trim()) return true;
    return label.title?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleLabel = (label) => {
    if (!task) return;

    const hasLabel = task.labels?.some(
      (lbl) => lbl?.color && label?.color && lbl.color.toLowerCase() === label.color.toLowerCase()
    );

    const updatedLabels = hasLabel
      ? task.labels.filter((lbl) => lbl.color !== label.color)
      : [...(task.labels || []), label];

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        labels: normalizeLabels(updatedLabels),
      })
    );
  };

  const handleDeleteLabel = (label) => {
    if (!task) return;

    const updatedLabels = task.labels.filter(
      (lbl) => lbl.color.toLowerCase() !== label.color.toLowerCase()
    );

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        labels: normalizeLabels(updatedLabels),
      })
    );
  };

  const handleSave = (newLabel) => {
    if (!task) return;

    let updatedLabels;
    let updatedBoardLabels;

    if (editModeLabel) {
      updatedLabels = task.labels.map((lbl) =>
        lbl.color === editModeLabel.color ? newLabel : lbl
      );

      updatedBoardLabels = boardLabels.map((lbl) =>
        lbl.color === editModeLabel.color ? { ...lbl, ...newLabel } : lbl
      );

      dispatch(updateBoardLabels(updatedBoardLabels));
    } else {
      updatedLabels = [...(task.labels || []), newLabel];

      if (!boardLabels.some((b) => b.color.toLowerCase() === newLabel.color.toLowerCase())) {
        dispatch(updateBoardLabels([...boardLabels, { ...newLabel, id: `l${Date.now()}` }]));
      }
    }

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        labels: normalizeLabels(updatedLabels),
      })
    );

    setEditModeLabel(null);
    setAddModeLabel(false);
  };

  return (
    <>
      {editModeLabel || addModeLabel ? (
        <EditLabelDropdown
          title={editModeLabel ? 'Edit Label' : 'Create Label'}
          label={editModeLabel}
          onDelete={handleDeleteLabel}
          onClose={() => {
            setEditModeLabel(null);
            setAddModeLabel(false);
          }}
          onSave={handleSave}
        />
      ) : (
        <div className="DropdownUi">
          {/* Header */}
          <div className="DropdownUiHeader">
            <h2 className="DropdownHeaderH2">Labels</h2>
            <button onClick={onClose} className="DropdownClose">
                <SvgServices name='SvgClose'/>
              
            </button>
          </div>

          {/* Options */}
          <div className="DropdownLabelOption">
            <input
              style={{ paddingLeft: '13px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search labels..."
            />
            <h3 className="DropdownLabelH3">Labels</h3>
            <ul className="DropdownUL">
              {filteredLabels.map((label) => {
                const isChecked = task?.labels?.some(
                  (l) =>
                    l?.color && label?.color && l.color.toLowerCase() === label.color.toLowerCase()
                );

                return (
                  <li key={label.color + label.title} className="DropdownLabelItem">
                    {isChecked  === true ? 
                                             (<span 
                                             onClick={() => toggleLabel(label)}
                                             className="DropdownLabelCheckboxDone">
                                                <div className='checklistDone'>
                                                    <SvgServices name='checklistDone'/></div>
                                               
                                             </span>):
                                             (<span
                                             onClick={() => toggleLabel(label)}
                                             className="DropdownLabelCheckbox-undone" >
                    
                                                
                                             </span>)}
                   
                    <div
                      className="DropdownLabelColorBox"
                      style={{ backgroundColor: label.color || '#ccc' }}>
                      {label.title}
                    </div>
                    <button
                      className="DropdownLabelEditBtn"
                      onClick={() => setEditModeLabel(label)}>
                      <SvgAdd />
                    </button>
                  </li>
                );
              })}
            </ul>
            <button onClick={() => setAddModeLabel(true)} className="DropdownLabelButton">
              Create a new label
            </button>
            <hr className="DropdownHr" />
            <button className="DropdownLabelButton">Enable colorblind friendly mode</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DropdownLabel;
