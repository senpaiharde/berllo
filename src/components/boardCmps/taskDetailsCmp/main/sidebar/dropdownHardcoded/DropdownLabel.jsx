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
    <div style={{
      display: "grid",
      gridTemplateRows: "48px auto",
      width: "100%",
      height: "100%",
    }}>
      {/* Header */}
      <div style={{
        height: "48px",
        padding: "4px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <h2 style={{
          fontSize: "14px",
          fontWeight: 500,
          padding: "0 32px",
          marginLeft: "15px",
          textAlign: "center",
          color: "#44546f",
          flex: 1,
        }}>
          {title}
        </h2>
        <button onClick={onClose} style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: "6px",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 6L6 18M6 6l12 12" stroke="#172b4d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Options */}
      <div style={{
        padding: "0px 12px 12px 12px",
        display: "grid",
        gridTemplateRows: "repeat(2, 32px)",
        gap: "4px",
      }}>
        <button onClick={() => { onConvert?.(); onClose(); }} style={{
          height: "32px",
          border: "none",
          backgroundColor: "white",
          borderRadius: "4px",
          cursor: "pointer",
          textAlign: "left",
          padding: "0 8px",
          fontSize: "14px",
          color: "#44546f",
        }}>Convert to card</button>
        <button onClick={() => { onDelete?.(); onClose(); }} style={{
          height: "32px",
          border: "none",
          backgroundColor: "white",
          borderRadius: "4px",
          cursor: "pointer",
          textAlign: "left",
          padding: "0 8px",
          fontSize: "14px",
          color: "#44546f",
        }}>Delete</button>
      </div>
    </div>
  );
};

export default DropdownLabel;
