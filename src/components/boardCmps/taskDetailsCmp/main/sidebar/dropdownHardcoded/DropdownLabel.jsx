import { title } from "framer-motion/client";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const DropdownLabel = ({ trigger, onClose, onDelete, onConvert, childern,title }) => {
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

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">
          {title}
        </h2>
        <button onClick={onClose} className="DropdownClose">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 6L6 18M6 6l12 12" stroke="#172b4d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Options */}
      <div className="DropdownOptions">
        <button onClick={() => { onConvert?.(); onClose(); }} className="CheckListDropdown">Convert to card</button>
        <button onClick={() => { onDelete?.(); onClose(); }} className="CheckListDropdown">Delete</button>
      </div>
    </div>
  );
};

export default DropdownLabel;
