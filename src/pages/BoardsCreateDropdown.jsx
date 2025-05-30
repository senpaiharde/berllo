import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRef } from 'react';
import { SvgServices } from '../services/svgServices';

const BoardsCreateDropdown = ({ onClose }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Create board</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgServices name="SvgClose" />
        </button>
      </div>

      {/* Options */}
      <div className="DropdownLabelOption">
        <h3 className="DropdownLabelH3">Background</h3>
        <h3 className="DropdownLabelH3">Board title</h3>
       <input
          
          value={''}
          className="EditDropdownInput"
          style={{ paddingLeft: '13px',height:'36px' }}
          placeholder="Search labels..."
        />
        <h3 className="DropdownLabelH3">Workspace</h3>
        <label 
                        className="BoardReminder"
                      >
                        Set due date reminder
                        <div className="BoardReminderDiv">
                          <div className="BoardReminderDivText">
                            <div className="BoardReminderDivText2">Berllo Workspace</div>
                          </div>
                          <div className="BoardReminderDivSVG">
                            <span className="BoardReminderDivSVG2">
                              <SvgServices name="SvgDropdown" />
                            </span>
                          </div>
                        </div>
                      </label>
        <h3 className="DropdownLabelH3">visibility</h3>
        <label 
                        className="BoardReminder"
                      >
                        Set due date reminder
                        <div className="BoardReminderDiv">
                          <div className="BoardReminderDivText">
                            <div className="BoardReminderDivText2">Workspace</div>
                          </div>
                          <div className="BoardReminderDivSVG">
                            <span className="BoardReminderDivSVG2">
                              <SvgServices name="SvgDropdown" />
                            </span>
                          </div>
                        </div>
                      </label>
      </div>
    </div>
  );
};

export default BoardsCreateDropdown;
