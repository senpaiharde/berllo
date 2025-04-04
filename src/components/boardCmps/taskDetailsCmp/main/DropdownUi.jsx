import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const DropdownMenu = ({ trigger, onClose, onDelete, onConvert, children }) => {
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

  const dropdownContent = open ? (
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: "304px",
        height: "124px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        zIndex: 9999,
        borderRadius: "8px",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "48px auto",
      }}
      
    >
        <div style={{padding:'12px'}}
       >
         {children}

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
        style={{ display: "inline-block" }}
      >
        {trigger}
      </div>
      {ReactDOM.createPortal(dropdownContent, document.getElementById("dropdown-root"))}
    </>
  );
};

export default DropdownMenu;
