import { useEffect, useState } from "react"
import { TextEditInput } from "../TextEditInput"
import { IconButton } from "../../IconButton"

export function ItemNameForm({IsEditing,onAddItem,itemType,setIsEditing}) {
    const [title, setTitle] = useState()
    useEffect(() => {
        onInputNewItem(title)
      }, [title])
    
      function onInputNewItem(value) {
        if (value) onAddItem(value)
      }

  return (
    <div className="input-new-item">
      <div className="input-new-item-text-box">
        <TextEditInput
          onChangeTextInput={setTitle}
          activateEditing={IsEditing}
          exitEditing={() => setIsEditing(false)}
        ></TextEditInput>
      </div>
      <div className="input-new-item-label">
        <IconButton
          label={itemType}
          onClick={onInputNewItem}
          backgColor={"#0000FF"}
          textColor={"#FFFFFF"}
        ></IconButton>
        <IconButton>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
            fill="currentColor"
          ></path>
        </IconButton>
      </div>
    </div>
  )
}
