import React, { useRef, useState,useEffect } from 'react';


import { useSelector } from 'react-redux';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import { color } from 'framer-motion';
import Svgback from '../../../../../../assets/svgDesgin/Svgback';

const EditLabelDropdown = ({onClose,title,onSave}) => {
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const triggerRef = useRef();
  const dropdownRef = useRef()
  console.log('color', task);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [labelTitle, setLabelTitle] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const defaultLabelColors = [
    '#BAF3DB', //1
    '#F8E6A0',//2
    '#FEDEC8', //3
    '#FFD5D2',//4
    '#DFD8FD',//5
    '#4BCE97', //6
    '#F5CD47', //7
    '#FEA362', //8
    '#F87168', //9
    '#9F8FEF',//10
    '#1F845A', //11
    '#946F00',//12
    '#C25100',//13
    '#C9372C', //14
    '#6E5DC6', //15
    '#CCE0FF', //16
    '#C6EDFB',//17
    '#D3F1A7', //18
    '#FDD0EC', //19
    '#DCDFE4', //20
    '#579DFF', //21
    '#6CC3E0',//22
    '#94C748', //23
    '#E774BB', //24
    '#8590A2', //25
    '#0C66E4', //26
    '#227D9B',//27
    '#5B7F24', //28
    '#AE4787', //29
    '#626F86', //30
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
      <button onClick={onClose} className="DropdownClose">
         <Svgback/>
        </button>
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
                     className='EditDropdownLabelBoxbutton'></button></div>)
         })}</div>
         
         <button className='EditDropdownLabelBoxbuttonADD'><SvgClose/> Remove Button</button>
         <hr className="DropdownHr" />
         <div className='EditDropDownBottom'>
            <button className='EditDropDownBottom1' 
            onClick={() => {
                if (selectedColor) {
                  onClose?.(); 
                 
                  onSave?.({ color: selectedColor, title: labelTitle });

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
