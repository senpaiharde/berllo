import { useEffect, useState } from "react"

export function TextEditInput({ value, onChangeTextInput, activateEditing ,exitEditing }) {
  const [isEditing, setIsEditing] = useState(activateEditing)
  const [inputValue, setInputValue] = useState(value)
  const [pervValue,setPrevValue] = useState(value)
  const handleBlur = (e) => {
    const newValue = e.target.value.trim()
    if (newValue === "") {
      setInputValue(pervValue) 
    } else {
      setInputValue(newValue)
      setPrevValue(newValue)
      onChangeTextInput(newValue) 
    }
    setIsEditing(false)
    exitEditing()
  }
  if(activateEditing){
    // console.log("activateEditing",value)
  }
  const inputLength = (inputValue) => {
    if (inputValue) {
      if (inputValue.length < 12) {
        return 12;
      }
      return inputValue.length
    } else {
      return 12
    }
  }

  return (
    <div>
      {isEditing ? (
        <input
          autoFocus={activateEditing || isEditing}
          placeholder="enter list name..."
          className="board-name-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur} 
          onKeyDown={(e) => e.key === "Enter" && handleBlur(e)} // Save on Enter
          size={inputLength(inputValue)}
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
