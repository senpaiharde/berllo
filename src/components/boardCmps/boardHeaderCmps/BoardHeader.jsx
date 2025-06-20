import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ViewTypeChooser } from "./ViewTypeChooser"
import { IconButton } from "../../IconButton"
import {
  updateboardTitle,
  updateStarStatus,
  toggleShareModal,
  toggleRightMenuOpen,
  syncBoardAsync,
} from "../../../redux/BoardSlice"
import { updateBoardNameInWorkSpace } from "../../../redux/WorkSpaceSlice"
import { TextEditInput } from "../TextEditInput"
import DropdownUi from "../taskDetailsCmp/main/sidebar/dropdownHardcoded/DropdownUi"
import BoardHeaderFilter from "./BoardHeaderFilter.jsx"

import { TaskOps, toggleStar } from "../../../services/backendHandler"

export function BoardHeader() {
  const board = useSelector((state) => state.boardReducer)

  const [isEditing, setIsEditing] = useState(false)
  // const [title, setTitle] = useState(board.boardTitle)
  const starRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [boardHeaderBackgound, setBoardViewBackgound] = useState()
  useEffect(() => {
    
    if (board.boardStyle && board.boardStyle.boardColor) {
      console.log("board.boardStyle.boardColor", board.boardStyle.boardColor)
      const adjustedHeadercolor = darkenHexColor(
        board.boardStyle.boardColor,
        20
      )
      console.log("adjustedHeadercolor", adjustedHeadercolor)
      setBoardViewBackgound({ backgroundColor: adjustedHeadercolor })
    }
   
  }, [board])

  function darkenHexColor(hex, percent) {
    // Remove "#" if present
    hex = hex.replace(/^#/, "")

    // Parse hex into RGB
    let r = parseInt(hex.slice(0, 2), 16)
    let g = parseInt(hex.slice(2, 4), 16)
    let b = parseInt(hex.slice(4, 6), 16)

    // Decrease each component by percentage
    r = Math.max(0, Math.floor(r * (1 - percent / 100)))
    g = Math.max(0, Math.floor(g * (1 - percent / 100)))
    b = Math.max(0, Math.floor(b * (1 - percent / 100)))

    // Convert back to hex and pad with zeroes if needed
    const toHex = (c) => c.toString(16).padStart(2, "0")
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const handleBlur = () => {
    setIsEditing(false)
    // console.log("dispatch(updateboardTitle(title))",title)
    const id = board._id
    // dispatch(updateboardTitle({ title, id }))
  }

  function togglePressed(element, elementName) {
    console.log("pressed", element)

    element.classList.toggle("pressed")
  }
  function onClickStar() {
    try{if(board && (board.isStarred === false || board.isStarred === true)) {
    dispatch(updateStarStatus(!board.isStarred))
    dispatch(
        syncBoardAsync({
          method: TaskOps.UPDATE,
          args: {
            taskId: board._id,
            body: {
              method: TaskOps.UPDATE,
              workId: "board",
              isStarred: !board.isStarred,
            },
          },
          workId: "board",
        })
      )
      //toggleStar in userBoards
      const boardId = board._id
      const newState = !board.isStarred
      toggleStar(boardId, newState)
    
    }else{
      console.log("onClickStar failed", board)
    }}catch(err) {
      console.error("onClickStar error", err)
    }
  }

  function onChangeTextInput(value) {
    console.log("onChangeTextInput(value)", value)
    dispatch(updateboardTitle(value))
    if (board._id) {
      dispatch(updateBoardNameInWorkSpace({ _id: board._id, name: value }))
      dispatch(
        syncBoardAsync({
          method: TaskOps.UPDATE,
          args: {
            taskId: board._id,
            body: {
              method: TaskOps.UPDATE,
              workId: "board",
              boardTitle: value,
            },
          },
          workId: "board",
        })
      )
    } else {
      console.log("board._id not found", board._id)
    }
  }

  const filterButton = {
    id: "filters",
    label: "filters",
    // icon: <LabelsSvg />,
    content: (props) => (
      <BoardHeaderFilter
        {...props}
        title="Labels"
        allLabels={["red", "blue", "green", "yellow"]}
        activeLabels={["red", "blue"]}
        options={[
          {
            label: "Create Label",
            onClick: () => console.log("New label"),
          },
          {
            label: "Edit Labels",
            onClick: () => console.log("Manage labels"),
          },
        ]}
      />
    ),
  }
  const filterActive =
    board.filter.title !== "" ||
    board.filter.members.length > 0 ||
    board.filter.labels.length > 0
  const filterButtonCount = filterActive ? board.filter?.taskCount : ""
  const title = board ? board.boardTitle : "Loading..."
  return (
    <div className="board-header-container">
      <span className="board-header" style={boardHeaderBackgound}>
        <span className="board-header-left">
          <div className="board-name-container header-clickable">
            <TextEditInput
              isEditing={isEditing}
              value={board.boardTitle}
              itemType={"board"}
              onChangeTextInput={onChangeTextInput}
            ></TextEditInput>
          </div>
          <div
            className="header-button header-clickable"
            onClick={() => {
              console.log("onClickStar")
              onClickStar()
            }}
            ref={starRef}
          >
            {board.isStarred === false || board.isStarred === null ? (
              <IconButton iconSize={"16px"} centerd={true}>
                <path
                  fillRule="nonzero"
                  clipRule="evenodd"
                  d="M7.49495 20.995L11.9999 18.6266L16.5049 20.995C16.8059 21.1533 17.1507 21.2079 17.4859 21.1504C18.3276 21.006 18.893 20.2066 18.7486 19.3649L17.8882 14.3485L21.5328 10.7959C21.7763 10.5585 21.9348 10.2475 21.9837 9.91094C22.1065 9.06576 21.5209 8.28106 20.6758 8.15825L15.6391 7.42637L13.3866 2.86236C13.2361 2.55739 12.9892 2.31054 12.6843 2.16003C11.9184 1.78206 10.9912 2.0965 10.6132 2.86236L8.36072 7.42637L3.32403 8.15825C2.98747 8.20715 2.67643 8.36564 2.43904 8.60917C1.84291 9.22074 1.85542 10.1998 2.46699 10.7959L6.11158 14.3485L5.25121 19.3649C5.19372 19.7 5.24833 20.0448 5.40658 20.3459C5.80401 21.1018 6.739 21.3924 7.49495 20.995ZM19.3457 10.0485L15.6728 13.6287L16.5398 18.684L11.9999 16.2972L7.45995 18.684L8.327 13.6287L4.65411 10.0485L9.72993 9.31093L11.9999 4.71146L14.2699 9.31093L19.3457 10.0485Z"
                  fill="currentColor"
                ></path>
              </IconButton>
            ) : (
              <IconButton iconSize={"16px"} centerd={true}>
                <path
                  d="M11.9999 18.6266L7.49495 20.995C6.739 21.3924 5.80401 21.1018 5.40658 20.3459C5.24833 20.0448 5.19372 19.7 5.25121 19.3649L6.11158 14.3485L2.46699 10.7959C1.85542 10.1998 1.84291 9.22074 2.43904 8.60917C2.67643 8.36564 2.98747 8.20715 3.32403 8.15825L8.36072 7.42637L10.6132 2.86236C10.9912 2.0965 11.9184 1.78206 12.6843 2.16003C12.9892 2.31054 13.2361 2.55739 13.3866 2.86236L15.6391 7.42637L20.6758 8.15825C21.5209 8.28106 22.1065 9.06576 21.9837 9.91094C21.9348 10.2475 21.7763 10.5585 21.5328 10.7959L17.8882 14.3485L18.7486 19.3649C18.893 20.2066 18.3276 21.006 17.4859 21.1504C17.1507 21.2079 16.8059 21.1533 16.5049 20.995L11.9999 18.6266Z"
                  fill="currentColor"
                ></path>
              </IconButton>
            )}
          </div>
          <div
            className="visible-container header-button header-clickable"
            onClick={(e) => togglePressed(e.currentTarget, "visible")}
          >
            <IconButton label="WorkSpace visible" iconSize={"16px"}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 12.5048 5.67168 C 11.9099 5.32669 11.2374 5.10082 10.5198 5.0267 C 11.2076 3.81639 12.5085 3 14 3 C 16.2092 3 18 4.79086 18 7 C 18 7.99184 17.639 8.89936 17.0413 9.59835 C 19.9512 10.7953 22 13.6584 22 17 C 22 17.5523 21.5523 18 21 18 H 18.777 C 18.6179 17.2987 18.3768 16.6285 18.0645 16 H 19.917 C 19.4892 13.4497 17.4525 11.445 14.8863 11.065 C 14.9608 10.7218 15 10.3655 15 10 C 15 9.58908 14.9504 9.18974 14.857 8.80763 C 15.5328 8.48668 16 7.79791 16 7 C 16 5.89543 15.1046 5 14 5 C 13.4053 5 12.8711 5.25961 12.5048 5.67168 Z M 10 12 C 11.1046 12 12 11.1046 12 10 C 12 8.89543 11.1046 8 10 8 C 8.89543 8 8 8.89543 8 10 C 8 11.1046 8.89543 12 10 12 Z M 14 10 C 14 10.9918 13.639 11.8994 13.0412 12.5984 C 15.9512 13.7953 18 16.6584 18 20 C 18 20.5523 17.5523 21 17 21 H 3 C 2.44772 21 2 20.5523 2 20 C 2 16.6584 4.04879 13.7953 6.95875 12.5984 C 6.36099 11.8994 6 10.9918 6 10 C 6 7.79086 7.79086 6 10 6 C 12.2091 6 14 7.79086 14 10 Z M 9.99999 14 C 12.973 14 15.441 16.1623 15.917 19 H 4.08295 C 4.55902 16.1623 7.02699 14 9.99999 14 Z"
                fill="currentColor"
              ></path>
            </IconButton>
            {/* <span>WorkSpace visible</span> */}
          </div>
          <ViewTypeChooser togglePressed={togglePressed}></ViewTypeChooser>
        </span>
        <span className="board-header-right">
          <div
            className={`filter-btn-container header-button header-clickable ${filterActive ? " pressed" : ""}`}
            onClick={(e) => togglePressed(e.currentTarget, "filter")}
          >
            {/* <IconButton label="Filters" iconSize={"16px"}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 4.61799 6 C 3.87461 6 3.39111 6.78231 3.72356 7.44721 L 3.99996 8 H 20 L 20.2763 7.44721 C 20.6088 6.78231 20.1253 6 19.3819 6 H 4.61799 Z M 10.8618 17.7236 C 10.9465 17.893 11.1196 18 11.309 18 H 12.6909 C 12.8803 18 13.0535 17.893 13.1382 17.7236 L 14 16 H 9.99996 L 10.8618 17.7236 Z M 17 13 H 6.99996 L 5.99996 11 H 18 L 17 13 Z"
                fill="currentColor"
              ></path>
            </IconButton> */}
            <DropdownUi
              trigger={
                <IconButton
                  label={`Filters ${filterButtonCount}`}
                  iconSize={"16px"}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M 4.61799 6 C 3.87461 6 3.39111 6.78231 3.72356 7.44721 L 3.99996 8 H 20 L 20.2763 7.44721 C 20.6088 6.78231 20.1253 6 19.3819 6 H 4.61799 Z M 10.8618 17.7236 C 10.9465 17.893 11.1196 18 11.309 18 H 12.6909 C 12.8803 18 13.0535 17.893 13.1382 17.7236 L 14 16 H 9.99996 L 10.8618 17.7236 Z M 17 13 H 6.99996 L 5.99996 11 H 18 L 17 13 Z"
                    fill="currentColor"
                  ></path>
                </IconButton>
              }
            >
              {(controlProps) =>
                filterButton.content?.({
                  title: filterButton.label,
                  ...controlProps,
                })
              }
            </DropdownUi>
          </div>
          <span className="header-divider"></span>
          <div
            className="task-preview-info-users"
            style={{
              marginBottom: "0px",
              paddingRight: "2px",
              paddingLeft: "2px",
            }}
          >
            {board.boardMembers &&
              board.boardMembers
                .filter(
                  (member) =>
                    member && typeof member === "object" && member.avatar
                )
                .map((member) => (
                  <button
                    key={member._id || member.id}
                    className="td-section-members-button"
                    style={{ marginRight: "-6px" }}
                  >
                    <img
                      src={member.avatar}
                      alt={`Member ${member._id || member.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "100%",
                      }}
                    />
                  </button>
                ))}
            {/* <TaskDetailsMembers style={{}} /> */}
          </div>
          <div
            className="header-button header-clickable pressed"
            onClick={(e) => {
              dispatch(toggleShareModal(true))
              // togglePressed(e.currentTarget, "visible")
            }}
            style={{ marginLeft: "8px" }}
          >
            <IconButton label={`Share`} iconSize={"16px"}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                fill="currentColor"
              ></path>
              <path
                d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z"
                fill="currentColor"
              ></path>
            </IconButton>
          </div>

          {!board.rightMenuOpen && (
            <div
              className="header-button header-clickable"
              // toggle menu
              onClick={() => dispatch(toggleRightMenuOpen(true))}
            >
              <IconButton centerd={true}>
                <path
                  fillRule="nonzero"
                  clipRule="evenodd"
                  d="M 5 14 C 6.10457 14 7 13.1046 7 12 C 7 10.8954 6.10457 10 5 10 C 3.89543 10 3 10.8954 3 12 C 3 13.1046 3.89543 14 5 14 Z M 12 14 C 13.1046 14 14 13.1046 14 12 C 14 10.8954 13.1046 10 12 10 C 10.8954 10 10 10.8954 10 12 C 10 13.1046 10.8954 14 12 14 Z M 21 12 C 21 13.1046 20.1046 14 19 14 C 17.8954 14 17 13.1046 17 12 C 17 10.8954 17.8954 10 19 10 C 20.1046 10 21 10.8954 21 12 Z"
                  fill="currentColor"
                ></path>
              </IconButton>
            </div>
          )}
          {/* {board.users &&
            board.users.map((user) => (
              <span onClick={(user) => toggleUserCmp(user)}>{user.name}</span>
            ))}
          <button className="toggleable" onClick={() => shareBoard(board)}>
            Share
          </button> */}
        </span>
      </span>
    </div>
  )
}
