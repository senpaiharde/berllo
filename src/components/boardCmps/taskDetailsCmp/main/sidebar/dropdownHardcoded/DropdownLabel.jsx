import { title } from 'framer-motion/client';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../../../redux/taskDetailsSlice';
import SvgAdd from '../../../../../../assets/svgDesgin/SvgAdd';
import DropdownUi from './DropdownUi';
import EditLabelDropdown from './EditLabelDropdown';

const DropdownLabel = ({ trigger, onClose, onDelete, onConvert, childern, title }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [editModeLabel, setEditModeLabel] = useState(null);
  const dispatch = useDispatch();

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  const defaultLabelColors = [
    '#61BD4F', // green
    '#EB5A46', // red
    '#F2D600', // yellow
    '#C377E0', // purple
  ];

  const taskLabels = task?.taskLabels || [];
  const colorList = [...defaultLabelColors, ...taskLabels];

  const uniqueColors = colorList.filter((color, index) => colorList.indexOf(color) === index);

  const toggleLabel = (color) => {
    if (!task) return;
    const hasLabel = task.taskLabels.includes(color);
    const updateLabels = hasLabel
      ? task.taskLabels.filter((colors) => colors !== color)
      : [...(task.taskLabels || []), color];

    const updateTask = {
      ...task,
      taskLabels: updateLabels,
    };
    dispatch(liveUpdateTask(updateTask));
  };

  console.log(' Color List:', colorList);

  // Calculate position of the trigger
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
            title = 'edit Label'
            label={editModeLabel}
            onClose={ () => setEditModeLabel(null)}
            onSave={(newLabel) => {
                const updateTask = {
                    ...task,
                    taskLabels: task.taskLabels.map((color) =>
                    color === editModeLabel.color ? newLabel.color : color
                ),

                };
                dispatch(liveUpdateTask(updateTask));
                setEditModeLabel(null)

            }}></EditLabelDropdown>
        ):( 
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
            const isChecked = task?.taskLabels?.includes(label);
            return (
              <li key={label.id} className="DropdownLabelItem">
                <input
                  type="checkbox"
                  checked={isChecked}
                  className="DropdownLabelCheckbox"
                  onChange={() => toggleLabel(label)}></input>
                <div className="DropdownLabelColorBox" style={{ background: label }}>
                  {label.title || 'No name'}
                </div>

                <button className="DropdownLabelEditBtn"
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
