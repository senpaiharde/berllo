import React from 'react';


import { useSelector } from 'react-redux';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';

const EditLabelDropdown = (title="1", onClose ="1") => {
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  console.log('color', task);
  const labels = (task?.taskLabels || []).map((color) => ({
    title: '',
    color,
  }));

  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">{title}</h2>
        <button onClick={onClose} className="DropdownClose">
         <SvgClose/>
        </button>
      </div>

      {/* Options */}

      <div className="DropdownLabelOption">
        <input style={{ paddingLeft: '13px' }} placeholder="Search labels..." />
        <h3 className="DropdownLabelH3">Labels</h3>

    

        <button className="DropdownLabelButton">Create a new label</button>
        <hr className="DropdownHr" />
        <button className="DropdownLabelButton">Enable colorblind friendly mode</button>
      </div>
    </div>
  );
};


export default EditLabelDropdown;
