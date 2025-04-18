import React, { useEffect, useRef, useState } from 'react';
import SvgDropdown from '../../../../../assets/svgDesgin/SvgDate/SvgDropdown';

const BackLogDropdown = ({ label, options, value, onselect }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <label className="WorkflowAreaLabel">{label}</label>

      <div
        className="BoardReminderDiv"
        onClick={() => {setOpen((prev) => !prev);console.log(options)}}
      >
        <div className="BoardReminderDivText">
          <div className="BoardReminderDivText2">{value || 'nah'}</div>
        </div>
        <div className="BoardReminderDivSVG">
          <span className="BoardReminderDivSVG2">
            <SvgDropdown />
          </span>
        </div>
      </div>

      {open && (
        <div className="ReminderDropdown"
        
        onClick={(e) => e.stopPropagation()}
         style={{ maxHeight: '250px' }}>
            <ul>
          {options.map((group, groupIdx) => (
            <div key={groupIdx}>
              {group.id && (
                <div
                  className="WorkflowAreah4"
                  style={{ paddingLeft: '8px', marginTop: '4px' }}
                >
                  {group.id}
                </div>
              )}
              
                <li
                  key={group.title}
                  
                  className={value === group.title ? 'selected' : ''}
                  onClick={() => {
                    onselect(group.title);
                    setOpen(false);
                  }}
                >
                  {group.title}
                </li>
             
            </div>
          ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BackLogDropdown;
