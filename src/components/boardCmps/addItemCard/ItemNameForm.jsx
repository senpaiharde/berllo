import { useEffect, useState } from "react"
import { TextEditInput } from "../TextEditInput"
import { IconButton } from "../../IconButton"

export function ItemNameForm({
  IsEditing,
  onAddItem,
  itemType,
  setText,
  isNewItem,
  isList,
  setIsEditing,
  noValueOnExit,
}) {
  const [inputValue, setInputValue] = useState()
  function exitEditing(value) {
    // console.log("exitEditing(value)", value)
    if (value && value != "") {
      onAddItem(value)
      setIsEditing(false)
    } else {
      noValueOnExit()
      setIsEditing(false)
    }
  }
  useEffect(() => {
    // console.log("ItemNameForm inputValue", inputValue)
    
  }, [inputValue])

  const textareaSize = !isList ? { height: "56px" } : { height: "32px" }
  const textareaClass = isList ? "input-new-item-new-list-textarea" : "input-new-item-new-task-textarea"
  const inputNameFormPadding = isList ? "8px" : "0px"
  const inputFormButtonsPadding = isList ? "4px" : "0px"

  return (
    <div className="input-new-item"
    style={{padding: inputNameFormPadding}}
    >
      <div 
      className="input-new-item-text-box"
      >
        {!isNewItem && <TextEditInput
          value={""}
          onChangeTextInput={exitEditing}
          activateEditing={IsEditing}
          noValueOnExit={noValueOnExit}
          isNewItem={true}
          itemType={itemType}
        ></TextEditInput>}
        {isNewItem && <textarea
          // class="qJv26NWQGVKzI9"
          className={textareaClass}
          dir="auto"
          autoFocus={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && exitEditing(inputValue)}
          placeholder={itemType}
          style={textareaSize}
        ></textarea>
        }
      
      </div>
      <div className="input-new-item-buttons" style={{ paddingLeft: inputFormButtonsPadding }}>
        <div onClick={() => exitEditing(inputValue)}>
          <button
            // className="icon-container-button input-new-item-label"
            className="input-new-item-add-button"
            // style={{ backgroundColor: "#0000FF", color: "#FFFFFF" }}
          >
            {itemType}
          </button>
        </div>
        <div
          className="input-new-item-svg"
          onClick={(e) => {
            console.log("disableBlur = true")
            // disableBlur = true
            noValueOnExit() // Prevent blur from firing
          }}
        >
          <IconButton centerd={true}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
              fill="currentColor"
            ></path>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
