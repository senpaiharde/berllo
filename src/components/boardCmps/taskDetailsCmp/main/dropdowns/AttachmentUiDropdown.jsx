import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const AttachmentUiDropdown = ({ trigger, onClose, onDelete,onDownload,onEdit, onComment,onMakeCover }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

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

  const dropdownContent = open ? (
    <div
      className="dropdownContentAttachment"
      ref={dropdownRef}
      style={{
        top: position.top,
        left: position.left,
      }}>
      {/* Options */}
      <div className="dropdownContentAttachmentDivButton"
       >
            <button style={{paddingBottom:'6px'}}
          className="dropdownContentAttachmentButtons"
          onClick={() => {
           
            setOpen(false);
            onEdit();
          }}>
          Edit
        </button>
        <button
          className="dropdownContentAttachmentButtons"
          onClick={() => {
           
            setOpen(false);
            onComment();
          }}>
          Comment
        </button>
        <button
          className="dropdownContentAttachmentButtons"
          onClick={() => {
            onDownload();
            setOpen(false);
          }}>
          Download
        </button>
        <button
          className="dropdownContentAttachmentButtons"
          onClick={() => {
            onMakeCover();
            setOpen(false);
          }}>
          Make Cover
        </button>
         <button
          className="dropdownContentAttachmentButtons"
          onClick={() => {
            onDelete?.();
            setOpen(false);
          }}>
          Delete
        </button>
        
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        style={{ display: 'inline-block' }}>
        {trigger}
      </div>
      {ReactDOM.createPortal(dropdownContent, document.getElementById('dropdown-root'))}
    </>
  );
};

export default AttachmentUiDropdown;
