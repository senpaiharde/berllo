import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
// import SvgClose from "../../../../../../assets/svgDesgin/SvgClose"
import { useDispatch, useSelector } from "react-redux"
// import { liveUpdateTask } from "../../../../../../redux/taskDetailsSlice"
// import SvgAdd from "../../../../../../assets/svgDesgin/SvgAdd"
// import EditLabelDropdown from "./EditLabelDropdown"
import SvgClose from "../../../assets/svgDesgin/SvgClose"
import { TextEditInput } from "../TextEditInput"

const BoardHeaderFilter = ({ onClose }) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [editMode, setEditMode] = useState(null)
  const dispatch = useDispatch()

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask)
  const board = useSelector((state) => state.boardReducer)
  const [inputValue, setInputValue] = useState("")
  

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
            <SvgClose />
          </button>
        </div>

        {/* Options */}
        <div className="DropdownLabelOption">
          <h3 className="DropdownLabelH3">Filter</h3>
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

          {/* <ul className="DropdownUL">
              {uniqueColors.map((label) => {
                const isChecked = task?.taskLabels?.includes(label.color)
                return (
                  <li
                    key={label.color + label.title}
                    className="DropdownLabelItem"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      className="DropdownLabelCheckbox"
                      onChange={() => toggleLabel(label.color)}
                    ></input>
                    <div
                      className="DropdownLabelColorBox"
                      style={{ background: label.color }}
                    >
                      {label.title || ""}
                    </div>

                    <button
                      className="DropdownLabelEditBtn"
                      onClick={() => setEditMode(label)}
                    >
                      <SvgAdd />
                    </button>
                  </li>
                )
              })}
            </ul> */}
        </div>
      </div>
    </>
  )
}

export default BoardHeaderFilter
