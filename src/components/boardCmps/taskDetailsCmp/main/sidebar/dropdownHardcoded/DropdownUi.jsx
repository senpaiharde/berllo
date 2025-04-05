import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const DropdownUi = ({ trigger, children, onClose }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

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
    if (open) updatePosition();
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownContent = open ? (
    <div className="dropDownContent"
      ref={dropdownRef}
      style={{
        
        top: position.top,
        left: position.left,
        
      }}
    >
      {typeof children === "function" ? children({ onClose: () => setOpen(false) }) : children}


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
        style={{ display: "inline-block" }}
      >
        {trigger}
      </div>

      {open && ReactDOM.createPortal(dropdownContent, document.getElementById("dropdown-root"))}
    </>
  );
};

export default DropdownUi;
