import React, { useState, useEffect, useRef, use } from "react"
import ReactDOM from "react-dom"

import { useDispatch, useSelector } from "react-redux"


import { SvgServices } from "../../../services/svgServices"
import { updateboardFilter } from "../../../redux/BoardSlice"
import SvgAdd from "../../../assets/svgDesgin/SvgAdd"
import { BoardHeaderChooseMembers } from "./BoardHeaderChooseMembers"

const BoardHeaderFilter = ({ onClose }) => {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const dispatch = useDispatch()

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask)
  const board = useSelector((state) => state.boardReducer)
  const [inputValue, setInputValue] = useState(board.filter.title || "")
  const [labels, setLabels] = useState(board.filter.labels || [])
  const [members, setMembers] = useState(board.filter.members || [])


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
    if (action === "add") {
      // Only add if it doesn't already exist
      const exists = labels.some((l) => l.id === label.id)
      if (!exists) {
        const updatedLabels = [...labels, label]
        setLabels(updatedLabels)
        dispatch(updateboardFilter({ ...board.filter, labels: updatedLabels }))
      }
    }

    if (action === "remove") {
      const updatedLabels = labels.filter((l) => l.id !== label.id)
      setLabels(updatedLabels)
      dispatch(updateboardFilter({ ...board.filter, labels: updatedLabels }))
    }
  }

  function toggleMember(member, action) {
    console.log("toggleMember(member, action)", member, action)
    console.log("members", members)
    if (action === "add") {
      // Only add if it doesn't already exist
      const exists = members.some((m) => m._id === member._id)
      if (!exists) {
        const updatedMembers = [...members, member]
        setMembers(updatedMembers)
        dispatch(
          updateboardFilter({ ...board.filter, members: updatedMembers })
        )
      }
    }

    if (action === "remove") {
      const updatedMembers = members.filter((m) => m._id !== member._id)
      setMembers(updatedMembers)
      dispatch(updateboardFilter({ ...board.filter, members: updatedMembers }))
    }
    // console.log("members", members)
  }

  function updateMembers(members) {
    dispatch(updateboardFilter({ ...board.filter, members: members }))
  }



  useEffect(() => {
    dispatch(updateboardFilter({ ...board.filter, title: inputValue }))
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
      onUpdatefilerText(inputValue)
    }, 1000)

    return () => clearTimeout(timeoutId) // cleanup old timer if inputValue changes
  }, [inputValue])

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
            <SvgServices name="SvgClose" />
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

          <h3 className="DropdownfilterH3">Labels</h3>
          <ul className="DropdownUL">
            {board.boardLabels.map((label) => {
              const isChecked = labels?.some(
                (l) =>
                  l?.color &&
                  label?.color &&
                  l.color.toLowerCase() === label.color.toLowerCase()
              )

              return (
                <li
                  key={label.color + label.title}
                  className="DropdownLabelItem"
                >
                  {isChecked === true ? (
                    <span
                      onClick={() => toggleLabel(label, "remove")}
                      className="DropdownLabelCheckboxDone"
                    >
                      <div className="checklistDone">
                        <SvgServices name="checklistDone" />
                      </div>
                    </span>
                  ) : (
                    <span
                      onClick={() => toggleLabel(label, "add")}
                      className="DropdownLabelCheckbox-undone"
                    ></span>
                  )}

                  <div
                    className="DropdownLabelColorBox"
                    style={{ backgroundColor: label.color || "#ccc" }}
                  >
                    {label.title}
                  </div>
                  {/* <button
                      className="DropdownLabelEditBtn"
                      onClick={() => setEditModeLabel(label)}>
                      <SvgAdd />
                    </button> */}
                </li>
              )
            })}
          </ul>
        </div>
        <BoardHeaderChooseMembers
          board={board}
          updateMembers={updateMembers}
        ></BoardHeaderChooseMembers>
        {/* <div className="DropdownOptions">
          <h3 className="DropdownfilterH3">Members</h3>
          {board.boardMembers.length > 0 && (
            <>
              {board.boardMembers.map((member) => {
                const isChecked = members?.some(
                  (m) => m?._id && member?._id && m._id === member._id
                )

                return (
                  <li key={member.id} className="DropdownLabelItem">
                    {isChecked === true ? (
                      <span
                        onClick={() => toggleMember(member, "remove")}
                        className="DropdownLabelCheckboxDone"
                      >
                        <div className="checklistDone">
                          <SvgServices name="checklistDone" />
                        </div>
                      </span>
                    ) : (
                      <span
                        onClick={() => toggleMember(member, "add")}
                        className="DropdownLabelCheckbox-undone"
                      ></span>
                    )}

                    <button
                      // onClick={() => handleDeleteMember(member)}
                      key={member._id}
                      className="DropdownButton"
                    >
                      <img
                        className="memberIcon"
                        alt={`Member ${member._id}`}
                        src={member.avatar}
                      />
                      <div className="memberTitle">{member.fullname}</div>
                    </button>
                  </li>
                )
              })}
            </>
          )}
        </div> */}
      </div>
    </>
  )
}

export default BoardHeaderFilter
// <button
//   onClick={() => handleDeleteMember(member)}
//   key={member._id}
//   className="DropdownButton"
// >
//   <img
//     className="memberIcon"
//     alt={`Member ${member._id}`}
//     src={member.avatar}
//   />
//   <div className="memberTitle">{member.fullname}</div>
// </button>
