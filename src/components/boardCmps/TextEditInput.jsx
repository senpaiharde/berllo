import { use, useEffect, useState, useRef } from "react"
import { IconButton } from "../IconButton"

export function TextEditInput({
  value,
  onChangeTextInput,
  activateEditing,
  fontSize,
  noValueOnExit,
  isNewItem,
  itemType,
  setHeaderHeight,
}) {
  const [isEditing, setIsEditing] = useState(activateEditing)
  const [inputValue, setInputValue] = useState(value)
  const [pervValue, setPrevValue] = useState(value)
  const [textAreaHeight, setTextAreaHeight] = useState("28px")
  const [marginBottom, setMarginBottom] = useState("0px")

  const mirrorRef = useRef(null)
  const mainDivClass =
    itemType && itemType === "list" ? "task-list-header-name" : ""

  const inputClass =
    itemType && itemType === "list"
      ? "task-list-header-input"
      : "board-name-input"

  const h2Class =
    itemType && itemType === "list"
      ? "task-list-header-h1"
      : "board-name-display"

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
      onChangeTextInput(inputValue)
    }
    setIsEditing(false)
    if (itemType && itemType === "list") {
      setHeaderHeight(null)
    }
    setMarginBottom("0px")
  }
  useEffect(() => {
    if (value !== pervValue) {
      setInputValue(value)
      setPrevValue(value)
    }
  }, [value])
  function emptyExit() {
    exitEditing(null)
  }
  if (activateEditing) {
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

  useEffect(() => {
    if (mirrorRef.current) {
      setTextAreaHeight(`${mirrorRef.current.scrollHeight}px`)
      setMarginBottom(`${mirrorRef.current.scrollHeight + 8}px`)
      if (itemType && itemType === "list") {
        setHeaderHeight(`${mirrorRef.current.scrollHeight + 8}px`)
      }
    }
  }, [inputValue])

  return (
    <div className={mainDivClass}>
      {isEditing ? (
        <div style={{ display: "flex" }}>
          <div
            ref={mirrorRef}
            style={{
              position: "absolute",
              visibility: "hidden",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              padding: "6px 8px 6px 12px",
              boxSizing: "border-box",
              width: "210px",
              font: "inherit",
            }}
            className="task-list-header-input"
          >
            {inputValue || "enter list name..."}
          </div>
          {itemType && itemType === "list" ? (
            <textarea
              style={{ height: textAreaHeight, overflow: "hidden" }}
              className="task-list-header-input"
              autoFocus={activateEditing || isEditing}
              placeholder="enter list name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleBlur(e)}
              size={inputLength(inputValue)}
            ></textarea>
          ) : (
            <input
              autoFocus={activateEditing || isEditing}
              placeholder="enter list name..."
              className="board-name-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleBlur(e)}
              size={inputLength(inputValue)}
            />
          )}
          {isNewItem ? (
            <div className="input-new-item-buttons">
              <div onClick={() => onChangeTextInput(inputValue)}>
                <button
                  className="icon-container-button input-new-item-label"
                  style={{ backgroundColor: "#0000FF", color: "#FFFFFF" }}
                >
                  {itemType}
                </button>
              </div>
              <div
                className="input-new-item-svg"
                onClick={(e) => {
                  console.log("disableBlur = true")
                  noValueOnExit()
                }}
              >
                <IconButton
                  onClick={(e) => {
                    console.log("disableBlur = true")
                    noValueOnExit()
                  }}
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
          className={h2Class}
          style={{ fontSize: fontSize, textOverflow: "ellipsis" }}
          onClick={() => setIsEditing(true)}
        >
          {itemType && itemType === "board" && inputValue.length > 71
            ? inputValue.slice(0, 71) + "..."
            : inputValue}
        </h1>
      )}
    </div>
  )
}
