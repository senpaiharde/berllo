import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { SvgServices } from '../../../../../services/svgServices';


export default function AttachmentUiDropdown({
  trigger,
  onDelete,
  onDownload,
  onEdit,
  onComment,
  onMakeCover,
  onClose,
  value,
}) {
 
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [editName, setEditName] = useState(value);

  useEffect(() => setEditName(value), [value]);

  useEffect(() => {
    if (open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + window.scrollY, left: r.left + window.scrollX });
    }
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        closeAll();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setIsEditing(false);
    onClose?.();
  };

  const dropdownContent = (open || isEditing) && (
    <div>
      {isEditing ? (
        <div
          className="dropDownContent"
          ref={dropdownRef}
          style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 1000 }}>
          <div className="DropdownUi">
            <div className="DropdownUiHeader">
              <h2 className="DropdownHeaderH2">Edit attachment</h2>
              <button className="DropdownClose" onClick={closeAll}>
                <SvgServices name="SvgClose" />
              </button>
            </div>

            <div style={{ gap: '0px' }} className="DropdownOptions">
              <div className="DropdownMembers">
                <h3 className="DropdownMembersh3">File name</h3>
              </div>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="AddchecklistDrop"
                style={{ padding: '5px' }}
              />
              <div className="workFlowCard">
                <div className="BoardReminderWrapper"></div>
              </div>

              <button
                onClick={() => {
                  onEdit(editName);
                  closeAll();
                }}
                className="UpdateAttchment">
                update
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="dropdownContentAttachment"
          ref={dropdownRef}
          style={{ position: 'absolute', top: pos.top, left: pos.left, zIndex: 1000 }}>
          <div className="dropdownContentAttachmentDivButton">
            <button
              className="dropdownContentAttachmentButtons"
              onClick={() => {
                setIsEditing(true);
              }}>
              Edit
            </button>
            <button
              className="dropdownContentAttachmentButtons"
              onClick={() => {
                onComment();
                closeAll();
              }}>
              Comment
            </button>
            <button
              className="dropdownContentAttachmentButtons"
              onClick={() => {
                onDownload();
                closeAll();
              }}>
              Download
            </button>
            <button
              className="dropdownContentAttachmentButtons"
              onClick={() => {
                onMakeCover();
                closeAll();
              }}>
              Make Cover
            </button>
            <button
              className="dropdownContentAttachmentButtons"
              onClick={() => {
                onDelete();
                closeAll();
              }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation();

          setOpen((o) => !o);
          setIsEditing(false);
        }}
        style={{ display: 'inline-block' }}>
        {trigger}
      </div>
      {ReactDOM.createPortal(dropdownContent, document.getElementById('dropdown-root'))}
    </>
  );
}
