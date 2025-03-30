import { useEffect, useState } from "react"
import { TextEditInput } from "../TextEditInput"
import { IconButton } from "../../IconButton"

export function ItemNameForm({
  IsEditing,
  onAddItem,
  itemType,
  setIsEditing,
  noValueOnExit,
}) {


  function exitEditing(value) {
    console.log("exitEditing(value)",value)
    if (value && value != "") {
      onAddItem(value)
      setIsEditing(false)
    } else {
      noValueOnExit()
      setIsEditing(false)
    }
  }

  return (
    <div className="input-new-item">
      <div className="input-new-item-text-box">
        <TextEditInput
          value={""}
          onChangeTextInput={exitEditing}
          activateEditing={IsEditing}
          noValueOnExit={noValueOnExit}
          isNewItem={true}
          itemType={itemType}
        ></TextEditInput>
      </div>
    </div>
  )
}
