import { title } from "framer-motion/client";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import SvgClose from "../../../../../../assets/svgDesgin/SvgClose";

const DropdownMembers = ({ trigger, onClose, onDelete, onConvert, childern,title }) => {
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
      <div className="DropdownUiHeader" >
        <h2 className="DropdownHeaderH2">
          {title}
        </h2>
        <button className="DropdownClose" onClick={onClose} >

          <SvgClose/>
        </button>
      </div>

      {/* Options */}
      <div className="DropdownOptions" style={{
       
      }}>
       <input placeholder="Search Members" style={{padding:'13px'}}/>
       <div className="DropdownMembers">
        <h3 className="DropdownMembersh3" >
            Card members</h3>
            </div>
        <button className="DropdownButton" ></button>
        
        <div className="DropdownMembers">
        <h3 className="DropdownMembersh3" >board members</h3>
        </div>
        <button  className="DropdownButton" >
            <span></span>
            <div></div>
            <span></span>
        </button>
      </div>
    </div>
  );
};

export default DropdownMembers;
