import { useEffect, useState } from "react"
import { IconButton } from "../IconButton"

export function TextEditInput({
  value,
  onChangeTextInput,
  activateEditing,
  fontSize,
  noValueOnExit,
  isNewItem,
  itemType,
}) {
  const [isEditing, setIsEditing] = useState(activateEditing)
  const [inputValue, setInputValue] = useState(value)
  const [pervValue, setPrevValue] = useState(value)
  let disableBlur = false
  const handleBlur = (e) => {
    setIsEditing(false)
    if (disableBlur) {
      disableBlur = false
      return
    }
    const newValue = e.target.value.trim()
    console.log("handleBlur e.target.value.trim()", e.target.value.trim())
    if (newValue === "") {
      console.log("TextEditInput noValueOnExit()")
      noValueOnExit()
    } else {
      // setIsEditing(false)
      onChangeTextInput(inputValue)
    }
    setIsEditing(false)
  }

  function emptyExit() {
    // setInputValue(null)
    exitEditing(null)
  }
  if (activateEditing) {
    // console.log("activateEditing",value)
  }
  const inputLength = (inputValue) => {
    if (inputValue) {
      if (inputValue.length < 12) {
        return 12
      }
      return inputValue.length
    } else {
      return 12
    }
  }

  return (
    <div>
      {isEditing ? (
        <div
        // onMouseDown={(e) => {
        //   console.log("disableBlur = true")
        //   disableBlur = true // Prevent blur from firing
        // }}
        >
          <input
            autoFocus={activateEditing || isEditing}
            placeholder="enter list name..."
            className="board-name-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // onBlur={handleBlur}
            onKeyDown={(e) => e.key === "Enter" && handleBlur(e)} // Save on Enter
            size={inputLength(inputValue)}
          />
          {isNewItem ? (
            <div className="input-new-item-buttons">
              <div onClick={() => onChangeTextInput(inputValue)}>
                <button className="icon-container-button input-new-item-label" style={{backgroundColor : "#0000FF", color: "#FFFFFF"}}>{itemType}</button>
                {/* <IconButton
                  label={itemType}
                  backgColor={"#0000FF"}
                  textColor={"#FFFFFF"}
                ></IconButton> */}
              </div>
              <div className="input-new-item-svg" onClick={(e) => {
                    console.log("disableBlur = true")
                    // disableBlur = true
                    noValueOnExit() // Prevent blur from firing
                  }}>
                <IconButton
                  onClick={(e) => {
                    console.log("disableBlur = true")
                    // disableBlur = true
                    noValueOnExit() // Prevent blur from firing
                  }}
                  // onClick={(e) => {
                  //   disableBlur = true
                  //   console.log("pressed X")
                  //   e.preventDefault() // Prevents losing focus before click
                  //   e.stopPropagation() // Prevents triggering onBlur indirectly
                  //   noValueOnExit()
                  // }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                    fill="currentColor"
                  ></path>
                </IconButton>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <h1
          className="board-name-display"
          style={{fontSize:fontSize}}
          onClick={() => setIsEditing(true)} // Click to edit
        >
          {inputValue}
        </h1>
      )}
    </div>
  )
}
