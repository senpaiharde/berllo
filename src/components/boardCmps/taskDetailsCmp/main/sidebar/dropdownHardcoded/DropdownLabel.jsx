import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../../../redux/taskDetailsSlice';
import SvgAdd from '../../../../../../assets/svgDesgin/SvgAdd';
import DropdownUi from './DropdownUi';
import EditLabelDropdown from './EditLabelDropdown';
import { updateBoardLabels } from '../../../../../../redux/BoardSlice';


const DropdownLabel = ({ onClose, onDelete, onConvert, childern }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [editModeLabel, setEditModeLabel] = useState(null);
  const [addModeLabel, setAddModeLabel] = useState(null);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  const boardLabels = useSelector((state) => state.boardReducer.boardLabels) || [];
  
  
  

  const taskLabels = Array.isArray(task?.taskLabels) ? task.taskLabels : [];
  const colorList = [
    ...boardLabels,
    ...taskLabels.filter(
      (label) =>
        !boardLabels.some((lbl) => lbl.color.toLowerCase() === label.color.toLowerCase())
      
    )
    .map((label) => ({
        color: label.color,
        title: label.title || '',
    })),
  ];

  const uniqueColors = colorList.filter(
    (item, index, self) => index === self.findIndex((i) => i.color === item.color)
  );
  const filteredLabels = uniqueColors.filter((label) => 
    label.title?.toLowerCase().includes(searchTerm.toLowerCase()) );

  const toggleLabel = (label) => {
    if (!task) return;

    const hasLabel = task.taskLabels.some(
      (lbl) => lbl.color.toLowerCase() === label.color.toLowerCase()
    );

    const updateLabels = hasLabel
      ? task.taskLabels.filter((lbl) => lbl.color !== label.color)
      : [...(task.taskLabels || []), label];

    dispatch(liveUpdateTask({ ...task, taskLabels: updateLabels }));
  };

  const handleDeleteLabel = (label) => {
    if (!task) return;

    const updateLabel = task.taskLabels.filter(
      (lbl) => lbl.color.toLowerCase() !== label.color.toLowerCase()
    );

    dispatch(
      liveUpdateTask({
        ...task,
        taskLabels: updateLabel,
      })
    );
  };

  const updatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    if (open) {
      updatePosition();
    }
  }, [open]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <>
      {/* Options */}

      {editModeLabel || addModeLabel ? (
        <EditLabelDropdown
          title={editModeLabel ? 'Edit Label' : 'create Label'}
          label={editModeLabel}
          onDelete={handleDeleteLabel}
          onClose={() => {
            setEditModeLabel(null);
            setAddModeLabel(false);
          }}
          onSave={(newLabel) => {
            let updateTask;
            if (editModeLabel) {
              updateTask = task.taskLabels.map((lbl) =>
                lbl.color === editModeLabel.color ? newLabel : lbl
              );
            } else {
              updateTask = [...(task.taskLabels || []), newLabel];
              
              if (!boardLabels.some((b) => b.color.toLowerCase() === newLabel.color.toLowerCase())) {
                dispatch(updateBoardLabels([
                    ...boardLabels,
                    { ...newLabel, id: `l${Date.now()}` }
                  ]));
                  
              }
            }
            
              

            dispatch(
              liveUpdateTask({
                ...task,
                taskLabels: updateTask,
              })
            );
            setEditModeLabel(null);
            setAddModeLabel(false);
          }}></EditLabelDropdown>
      ) : (
        <div className="DropdownUi">
          {/* Header */}
          <div className="DropdownUiHeader">
            <h2 className="DropdownHeaderH2">Labels</h2>
            <button onClick={onClose} className="DropdownClose">
              <SvgClose />
            </button>
          </div>

          {/* Options */}
          <div className="DropdownLabelOption">
            <input style={{ paddingLeft: '13px' }} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search labels..." />
            <h3 className="DropdownLabelH3">Labels</h3>
            <ul className="DropdownUL">
              {filteredLabels.map((label) => {
                const isChecked = task?.taskLabels?.some(
                  (l) => l.color.toLowerCase() === label.color.toLowerCase()
                );

                return (
                  <li key={label.color + label.title} className="DropdownLabelItem">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      className="DropdownLabelCheckbox"
                      onChange={() => toggleLabel(label)}
                    />
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
