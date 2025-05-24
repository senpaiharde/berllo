import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { SvgServices } from '../../../../../services/svgServices';

const BackLogDropdown = ({ label, options, value, onselect, disabled }) => {
  const [open, setOpen] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState({});
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!triggerRef.current?.contains(e.target) && !dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: 'absolute',
        top: `${rect.bottom + window.scrollY + 4}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        zIndex: 9999,
      });
    }
    setOpen((prev) => !prev);
  };

  return (
    <>
      {label.length > 0 && <label className="WorkflowAreaLabel">{label}</label>}
      <div
        className={`BoardReminderDiv${disabled ? ' disabled' : ''}`}
        ref={triggerRef}
        onClick={handleClick}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
        <div className="BoardReminderDivText">
          <div className="BoardReminderDivText2">
            {' '}
            {options.find((o) => o.id === value)?.title || 'Select'}
          </div>
        </div>
        <div className="BoardReminderDivSVG">
          <span className="BoardReminderDivSVG2">
            <SvgServices name="SvgDropdown" />
          </span>
        </div>
      </div>

      {open &&
        ReactDOM.createPortal(
          <div
           onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            ref={dropdownRef}
            className="ReminderDropdown"
            style={{
              ...dropdownStyles,
              maxHeight: '250px',
            }}>
            <ul>
              {options.map((li, idx) => (
                <React.Fragment key={li.title + idx}>
                  <li
                    key={li.id}
                    style={{ padding: '8px 12px', cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onselect(li.id);
                      setOpen(false);
                    }}>
                    {li.title}
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </>
  );
};

export default BackLogDropdown;
