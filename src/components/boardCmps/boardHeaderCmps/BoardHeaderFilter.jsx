import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"

import { useDispatch, useSelector } from "react-redux"

import { TextEditInput } from "../TextEditInput"
import { SvgServices } from "../../../services/svgServices"
import { updateboardFilter } from "../../../redux/BoardSlice"
import SvgAdd from "../../../assets/svgDesgin/SvgAdd"

const BoardHeaderFilter = ({ onClose }) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [editMode, setEditMode] = useState(null)
  const dispatch = useDispatch()

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask)
  const board = useSelector((state) => state.boardReducer)
  const [inputValue, setInputValue] = useState(board.filter.title || "")
  const [labels, setLabels] = useState(board.filter.labels || [])

  const taskLabels = task?.taskLabels || []
  

  const updatePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      })
    }
  }
  function toggleLabel(label, action) {
  if (action === 'add') {
    // Only add if it doesn't already exist
    const exists = labels.some((l) => l.id === label.id);
    if (!exists) {
      const updatedLabels = [...labels, label];
      setLabels(updatedLabels);
      dispatch(updateboardFilter({ ...board.filter, labels: updatedLabels }));
    }
  }

  if (action === 'remove') {
    const updatedLabels = labels.filter((l) => l.id !== label.id);
    setLabels(updatedLabels);
    dispatch(updateboardFilter({ ...board.filter, labels: updatedLabels }));
  }
}

  // function toggleLabel(label, action){
  //   console.log("toggleLabel(label, action)", label, action)
  //   console.log("board.filter.labels", board.filter.labels)
  //   let labels = [...board.filter.labels]
  //   if(action === 'add'){
  //     labels.push(label)
  //     // console.log("board.filter.labels.push(label)", labels)
  //     dispatch(updateboardFilter({...board.filter, labels: labels}))
  //   }
  //   if(action === 'remove'){
  //     labels => labels.filter(l => l.id !== label.id)
  //     // console.log("board.filter.labels.filter(label)", board.filter.labels.filter(label))
  //     dispatch(updateboardFilter({...board.filter, labels: labels}))
  //   }
  // }

  useEffect(() => {

    dispatch(updateboardFilter({...board.filter, title: inputValue}))
  }, [inputValue])

  useEffect(() => {
    if (open) {
      updatePosition()
    }
  }, [open])

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false)
        onClose?.()
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onUpdatefilerText(inputValue);
    }, 1000);
  
    return () => clearTimeout(timeoutId); // cleanup old timer if inputValue changes
  }, [inputValue]);

  function onUpdatefilerText(value) {
    console.log("onUpdatefilerText(value)", value)
  }

  return (
    <>
      {/* Options */}
      <div className="DropdownUi">
        {/* Header */}
        <div className="DropdownUiHeader">
          <h2 className="DropdownHeaderH2">Filter</h2>
          <button onClick={onClose} className="DropdownClose">
             <SvgServices name='SvgClose'/>
        
          </button>
        </div>

        {/* Options */}
        <div className="DropdownLabelOption">
          <h3 className="DropdownLabelH3">Keyword</h3>
          {/* <TextEditInput
            // activateEditing={isNewTaskList}
            fontSize={14}
            value={board.boardTitle}
            onChangeTextInput={onUpdatefilerText}
          ></TextEditInput> */}
          <input
            style={{ paddingLeft: "13px" }}
            placeholder="Enter a keyword..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* <div className="EditDropdownLabelColor">
          {board.boardLabels.map((label) => {
            return (
              <div className="EditDropdownLabelBox" key={label}>
                <button
                  style={{
                    background: label,
                    // border: selectedColor === label ? '2px solid #000' : 'none',
                  }}
                  onClick={() => setSelectedColor(label)}
                  className="EditDropdownLabelBoxbutton"></button>
              </div>
            );
          })}
        </div> */}
        <h3 className="DropdownLabelH3">Labels</h3>
        <ul className="DropdownUL">
              {board.boardLabels.map((label) => {
                const isChecked = labels?.some(
                  (l) =>
                    l?.color && label?.color && l.color.toLowerCase() === label.color.toLowerCase()
                );

                return (
                  <li key={label.color + label.title} className="DropdownLabelItem">
                    {isChecked  === true ? 
                                             (<span 
                                             onClick={() => toggleLabel(label,'remove')}
                                             className="DropdownLabelCheckboxDone">
                                                <div className='checklistDone'>
                                                    <SvgServices name='checklistDone'/></div>
                                               
                                             </span>):
                                             (<span
                                             onClick={() => toggleLabel(label,'add')}
                                             className="DropdownLabelCheckbox-undone" >
                    
                                                
                                             </span>)}
                   
                    <div
                      className="DropdownLabelColorBox"
                      style={{ backgroundColor: label.color || '#ccc' }}>
                      {label.title}
                    </div>
                    {/* <button
                      className="DropdownLabelEditBtn"
                      onClick={() => setEditModeLabel(label)}>
                      <SvgAdd />
                    </button> */}
                  </li>
                );
              })}
            </ul>
          
        </div>
      </div>
    </>
  )
}

export default BoardHeaderFilter
