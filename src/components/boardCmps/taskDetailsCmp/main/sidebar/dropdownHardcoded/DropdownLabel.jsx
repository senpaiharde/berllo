import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../../../redux/taskDetailsSlice';
import SvgAdd from '../../../../../../assets/svgDesgin/SvgAdd';
import DropdownUi from './DropdownUi';
import EditLabelDropdown from './EditLabelDropdown';
import { label } from 'framer-motion/client';










const DropdownLabel = ({ trigger, onClose, onDelete, onConvert, childern, title }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [editModeLabel, setEditModeLabel] = useState(null);
  const dispatch = useDispatch();

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  const defaultLabelColors = [
    { id: 'd1', color: '#61Bd4f', title: 'Feature' },
    { id: 'd2', color: '#eb5a46', title: 'Bug' },
    { id: 'd3', color: '#f2d600', title: 'Warning' },
    { id: 'd4', color: '#c377e0', title: 'Idea' },
  ];

  const taskLabels = Array.isArray(task?.taskLabels) ? task.taskLabels : [];
  const colorList = [
    ...defaultLabelColors,
    ...taskLabels
      .filter((label) => !defaultLabelColors
      .some((lbl) => lbl.color.toLowerCase() === label.color.toLowerCase())
  ),
  ];

  const uniqueColors = colorList.filter(
    (item, index, self) => index === self.findIndex((i) => i.color === item.color)
  );

  const toggleLabel = (label) => {
    if (!task) return;

    const hasLabel = task.taskLabels.some(
        (lbl) => lbl.color.toLowerCase() === label.color.toLowerCase());

    const updateLabels = hasLabel
      ?  task.taskLabels.filter((lbl) => lbl.color !== label.color)

      : [...(task.taskLabels || []), label];

    dispatch(liveUpdateTask({ ...task, taskLabels: updateLabels }));
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

      {editModeLabel ? (
        <EditLabelDropdown
          title="edit Label"
          label={editModeLabel}
          onClose={() => setEditModeLabel(null)}
          onSave={(newLabel) => {
            const updateTask =  task.taskLabels.map((lbl) =>
                lbl.color === editModeLabel.color ? newLabel : lbl);
          
            dispatch(liveUpdateTask({
                ...task,
                taskLabels:updateTask,
            }));
            setEditModeLabel(null);
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
            <input style={{ paddingLeft: '13px' }} placeholder="Search labels..." />
            <h3 className="DropdownLabelH3">Labels</h3>
            <ul className="DropdownUL">
              {uniqueColors.map((label) => {
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
                    <div className="DropdownLabelColorBox" 
                    style={{ backgroundColor: label.color || '#ccc'
 }}>
                      {label.title || ''}
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
            <button className="DropdownLabelButton">Create a new label</button>
            <hr className="DropdownHr" />
            <button className="DropdownLabelButton">Enable colorblind friendly mode</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DropdownLabel;
