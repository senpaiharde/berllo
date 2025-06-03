import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect, useRef, use } from "react"
import { SvgServices } from "../../../services/svgServices"

export function BoardHeaderChooseMembers({board, updateMembers}) {
//   console.log("BoardHeaderChooseMembers", board)
  const [members, setMembers] = useState(board.filter.members || [])

  function toggleMember(member, action) {
    // console.log("toggleMember(member, action)", member, action)
    // console.log("members", members)
    if (action === "add") {
      // Only add if it doesn't already exist
      const exists = members.some((m) => m._id === member._id)
      if (!exists) {
        const updatedMembers = [...members, member]
        setMembers(updatedMembers)
        updateMembers(updatedMembers)
        // dispatch(
        //   updateboardFilter({ ...board.filter, members: updatedMembers })
        // )
      }
    }

    if (action === "remove") {
      const updatedMembers = members.filter((m) => m._id !== member._id)
      setMembers(updatedMembers)
      updateMembers(updatedMembers)
    //   dispatch(updateboardFilter({ ...board.filter, members: updatedMembers }))
    }
  }

  return (
    <div className="DropdownOptions">
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
    </div>
  )
}
