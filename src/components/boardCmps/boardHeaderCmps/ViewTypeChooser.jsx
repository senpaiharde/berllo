import { IconButton } from "../../IconButton"

export function ViewTypeChooser({ togglePressed }) {
  return (
    <div
      className="chooser-container"
      onClick={(e) => togglePressed(e.currentTarget)}
    >
      <div style={{ display: "flex", gap: "4px" }}>
        <div
          className="header-clickable"
          onClick={(e) => togglePressed(e.currentTarget, "board")}
        >
          <IconButton label="Board" iconSize={"16px"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"
              fill="currentColor"
            ></path>
          </IconButton>
        </div>
        <div
          className="header-clickable"
          onClick={(e) => togglePressed(e.currentTarget, "choose")}
        >
          <IconButton iconSize={"16px"}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 11.2929 16.7071 L 4.22185 9.63606 C 3.83132 9.24554 3.83132 8.61237 4.22185 8.22185 C 4.61237 7.83133 5.24554 7.83133 5.63606 8.22185 L 12 14.5858 L 18.364 8.22185 C 18.7545 7.83132 19.3877 7.83132 19.7782 8.22185 C 20.1687 8.61237 20.1687 9.24554 19.7782 9.63606 L 12.7071 16.7071 C 12.3166 17.0977 11.6834 17.0977 11.2929 16.7071 Z"
              fill="currentColor"
            ></path>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
