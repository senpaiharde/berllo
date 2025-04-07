import React, { useRef, useState,useEffect } from 'react';


import { useSelector } from 'react-redux';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import { color } from 'framer-motion';

const EditLabelDropdown = ({onClose,title,onSave}) => {
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const triggerRef = useRef();
  const dropdownRef = useRef()
  console.log('color', task);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [labelTitle, setLabelTitle] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const defaultLabelColors = [
    '#61BD4F', // green
    '#EB5A46', // red
    '#F2D600', // yellow
    '#C377E0', // purple
    '#61BD4F', // green
    '#EB5A46', // red
    '#F2D600', // yellow
    '#C377E0', // purple
  ];
  const [open,setOpen] = useState(false);
  const labels = (task?.taskLabels || []).map((color) => ({
    title: '',
    color,
  }));

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

  return (
    <div className="DropdownUiEdit">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">{title}</h2>
        <button onClick={onClose} className="DropdownClose">
         <SvgClose/>
        </button>
      </div>
      <div className='EditDropdownHeader'>
        <span style={{
            backgroundColor:selectedColor,
        }} className='EditDropdownHeaderspan'>{labelTitle || 'Preview'}</span></div>
      <div className='EditDropdownOptions'>
        
        <h3 className="EditDropdownLabelH3">Title</h3>
        <input onChange={(e) => setLabelTitle(e.target.value)}
         value={labelTitle}
        className='EditDropdownInput'
         style={{ paddingLeft: '13px' }} placeholder="Search labels..." />
         <h3 className="EditDropdownLabelH3">Select a color</h3>
         <div className='EditDropdownLabelColor' >{defaultLabelColors.map((label)=> {
            return(
            <div className='EditDropdownLabelBox' 
                key={label} 
                >
                    <button
                    style={{background:label,
                        border: selectedColor === label ? '2px solid #000' : 'none',
                    }}
                    onClick={() => setSelectedColor(label)}
                     className='EditDropdownLabelBoxbutton'>2</button></div>)
         })}</div>
         <button className='EditDropdownLabelBoxbuttonADD'>Remove Button</button>
         <hr className="DropdownHr" />
         <div className='EditDropDownBottom'>
            <button className='EditDropDownBottom1' 
            onClick={() => {
                if (selectedColor) {
                  onClose?.(); 
                 
                  onSave?.({ backgroundColor: selectedColor, title: labelTitle });
                }
              }}
            >
             Save</button>
            <button className='EditDropDownBottom2' >Delete</button>
            </div>

      </div>


      {/* Options */}

      
    </div>
  );
};


export default EditLabelDropdown;
