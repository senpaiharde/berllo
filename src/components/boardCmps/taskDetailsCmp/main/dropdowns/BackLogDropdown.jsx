import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import SvgDropdown from '../../../../../assets/svgDesgin/SvgDate/SvgDropdown';

const BackLogDropdown = ({ label, options, value, onselect }) => {
  const [open, setOpen] = useState(false);
  const [dropdownStyles, setDropdownStyles] = useState({});
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
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
      <label className="WorkflowAreaLabel">{label}</label>
      <div
        className="BoardReminderDiv"
        ref={triggerRef}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="BoardReminderDivText">
          <div className="BoardReminderDivText2">{value || 'Select'}</div>
        </div>
        <div className="BoardReminderDivSVG">
          <span className="BoardReminderDivSVG2">
            <SvgDropdown />
          </span>
        </div>
      </div>

      {open &&
        ReactDOM.createPortal(
          <div
            className="ReminderDropdown"
            style={{
              ...dropdownStyles,
              maxHeight: '250px',
             
            }}
          >
            <ul >
              {options.map((li, idx) => (
                <React.Fragment key={li.title + idx}>
                  {li.id && (
                    <h2 className="WorkflowAreah4" style={{ paddingLeft: '8px' }}>
                      {li.id}
                    </h2>
                  )}
                  <li
                    style={{ padding: '8px 12px', cursor: 'pointer' }}
                    onClick={() => {
                      onselect(li.title);
                      setOpen(false);
                    }}
                  >
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
