import React, { useState, useRef, useEffect } from "react";

const DropdownMenu = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block",}}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        {trigger}
      </div>
      {open && (
        <div
          style={{
            top:'110%',
            height:'124px',
            position: "absolute",
            
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "6px",
            zIndex: 1000,
            minWidth: "120px",
            width:'304px',
          }}
        >
            <header style={{height:'48px',width:'304px', padding:'4px 8px'}}>
                <h2 style={{height:'40px',width:'288px', padding:'0 32px', 
                   fontsize: "11px",
                   fontweight: "600",
                   display:'block',
                   position:'relative',
                   gridColumn:'1 / span 3 ',
                   lineHeight:'40px',
                }}>Item actions


</h2></header>
            <div style={{}}>
          {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
