import { useEffect, useState } from "react"
import { IconButton } from "../../IconButton"

export function AddItemCard({
  cardDescription,
  backgroundColor,
  textColor,
  addListClass,
  onItemCardClick,
}) {
  const listClass = addListClass ? "add-a-card-button-list" : ""
  const containerClass = addListClass ? "" : "add-a-card-container"
  return (
    <div className={`${containerClass}`} onClick={() => onItemCardClick()}>
      <span className={`${listClass} add-a-card-button `}>
        <span style={{ marginRight: "8px" }}>
          <IconButton label={cardDescription}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 12 3 C 11.4477 3 11 3.44772 11 4 V 11 L 4 11 C 3.44772 11 3 11.4477 3 12 C 3 12.5523 3.44772 13 4 13 H 11 V 20 C 11 20.5523 11.4477 21 12 21 C 12.5523 21 13 20.5523 13 20 V 13 H 20 C 20.5523 13 21 12.5523 21 12 C 21 11.4477 20.5523 11 20 11 L 13 11 V 4 C 13 3.44772 12.5523 3 12 3 Z"
              fill="currentColor"
            ></path>
          </IconButton>
        </span>
      </span>
    </div>
  )
}
