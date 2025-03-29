import { useState } from "react"

export function TextEditInput({ value, onChangeTextInput }) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const handleBlur = (e) => {
    setIsEditing(false)
    console.log("handleBlur e.target.value",e.target.value)
    onChangeTextInput(e.target.value) // Use e.target.value instead of expecting newValue
  }

  return (
    <div>
      {isEditing ? (
        <input
          autoFocus
          className="board-name-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur} // Save title on blur
          onKeyDown={(e) => e.key === "Enter" && handleBlur(e)} // Save on Enter
          size={value.length || 1}
        />
      ) : (
        <h1
          className="board-name-display"
          onClick={() => setIsEditing(true)} // Click to edit
        >
          {inputValue}
        </h1>
      )}
    </div>
  )
}
