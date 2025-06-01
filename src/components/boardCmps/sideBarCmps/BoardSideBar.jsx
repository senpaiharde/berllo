import { IconButton } from "../../IconButton"
import { addnewBoard, syncWorkSpaceAsync } from "../../../redux/WorkSpaceSlice"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate, Outlet } from "react-router-dom"
import { useState,useEffect } from "react"
import { TaskOps } from "../../../services/backendHandler"
export function BoardSideBar({   }) {
  // console.log("board in BoardSideBar", board)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const workSpace = useSelector((state) => state.workSpaceReducer)
  const chosenBoard = useSelector((state) => state.boardReducer)
  
//   console.log("workSpace", workSpaceredux)
//   console.log("workSpace.boards[0]", workSpaceredux.boards[0])
    useEffect(() => {
      // dispatch(fetchWorkSpaces()) 
      dispatch(syncWorkSpaceAsync({
        method: TaskOps.FETCH,
        args: {
          body: { method: TaskOps.FETCH, workId: "board"},
        },
        workId: "board",
      }))
  }, [])
  const [isCollapsed, setIsCollapsed] = useState(true)
  const sidebarWidth = isCollapsed ? "16px" : "260px"
  const currentWorkSpace = workSpace
    ? workSpace
    : {
        id: "w101",
        title: "workSpace 1",
        icon: "T",
        boards: [
          {
            _id: "dgsgs1",
            title: "Work Flow",
            primaryColor: "#912c5d",
            starred: true,
          },
          {
            _id: "l102",
            title: "Basic Board",
            primaryColor: "#61bd33",
            starred: false,
          },
        ],
      }
      // console.log("currentWorkSpace.boards",currentWorkSpace.boards)
  function createNewboard() {
    // dispatch(addnewBoard(`new board ${currentWorkSpace.boards?.length}`))
    dispatch(syncWorkSpaceAsync({
        method: TaskOps.ADD,
        args: {
          body: { method: TaskOps.ADD, workId: "board", boardTitle: `new board ${currentWorkSpace.boards?.length}` },
        },
        workId: "board",
      }))
  }
  // console.log("Sidebar chosenBoard", chosenBoard)
  function SidebarChooseBoard({ board }) {
    // console.log("SidebarChooseBoard board", board)
    const chosenBoardClassName = board._id === chosenBoard._id ? "chosen-board-link" : ""
    const primaryColor ="#912c5d"
    return (
      <div className="">
        <a
          href=""
          className={`sidebar-link sidebar-body-link ${chosenBoardClassName}`}
          style={{ paddingLeft: "12px" }}
          onClick={() => {
            console.log("🧠 Navigating to board:", board._id)
            // "/b/:boardId/:boardName/*"
            navigate(`/b/${board._id}/${encodeURIComponent(board.boardTitle)}/*`)
          }}
        >
          <div
            className="board-background-img"
            style={{ backgroundColor: primaryColor }}
          ></div>
          {/* <p className="sidebar-link-text">{board.boardTitle.length > 24 ? board.boardTitle.slice(0, 24) + "..." : board.boardTitle}</p> */}
          <p className="sidebar-link-text">{board.boardTitle}</p>
          <div className="sidebar-link-button-container">
            <div className="header-button header-clickable">
              <IconButton center={true}>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                  fill="currentColor"
                ></path>
              </IconButton>
            </div>
            <div
              className="header-button header-clickable"
              onClick={() => {
                // dispatch(updateStarStatus(!board.isStarred))
              }}
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
          </div>
        </a>
      </div>
    )
  }

  return (
    <nav className="board-sidebar-navigation" style={{ width: sidebarWidth }}>
      {isCollapsed && (
        <div className="board-sidebar-collapsed-container">
          <div
            className="board-sidebar-collapsed"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <div className="arrow-button-container">
              <IconButton centerd={true}>
                <path
                  d="M10.294 9.69805C10.2008 9.60614 10.1268 9.49661 10.0763 9.37584C10.0258 9.25507 9.99976 9.12546 9.99976 8.99455C9.99976 8.86364 10.0258 8.73403 10.0763 8.61327C10.1268 8.4925 10.2008 8.38297 10.294 8.29105C10.4831 8.10449 10.738 7.99988 11.0035 7.99988C11.2691 7.99988 11.524 8.10449 11.713 8.29105L14.678 11.2311C14.7802 11.3324 14.8614 11.453 14.9167 11.5858C14.9721 11.7186 15.0006 11.8611 15.0006 12.0051C15.0006 12.149 14.9721 12.2915 14.9167 12.4243C14.8614 12.5572 14.7802 12.6777 14.678 12.7791L11.723 15.7091C11.534 15.8959 11.2789 16.0007 11.013 16.0007C10.7472 16.0007 10.4921 15.8959 10.303 15.7091C10.2098 15.6171 10.1358 15.5076 10.0853 15.3868C10.0348 15.2661 10.0088 15.1365 10.0088 15.0056C10.0088 14.8746 10.0348 14.745 10.0853 14.6243C10.1358 14.5035 10.2098 14.394 10.303 14.3021L12.621 12.0051L10.294 9.69805V9.69805Z"
                  fill="#f1f2f4"
                ></path>
              </IconButton>
            </div>
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div className="board-sidebar-open-container">
          <div className="board-sidebar-open">
            <div className="side-bar-header">
              <a href="" className="sidebar-link">
                <div className="workspace-logo">{"T"}</div>
                <p className="">Trello Workspace</p>
              </a>
              <div
                className="sidebar-collapse-button-container"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <div className="sidebar-collapse-button">
                  <IconButton centerd={true}>
                    <g transform="scale(-1,1) translate(-24,0)">
                      <path
                        d="M10.294 9.69805C10.2008 9.60614 10.1268 9.49661 10.0763 9.37584C10.0258 9.25507 9.99976 9.12546 9.99976 8.99455C9.99976 8.86364 10.0258 8.73403 10.0763 8.61327C10.1268 8.4925 10.2008 8.38297 10.294 8.29105C10.4831 8.10449 10.738 7.99988 11.0035 7.99988C11.2691 7.99988 11.524 8.10449 11.713 8.29105L14.678 11.2311C14.7802 11.3324 14.8614 11.453 14.9167 11.5858C14.9721 11.7186 15.0006 11.8611 15.0006 12.0051C15.0006 12.149 14.9721 12.2915 14.9167 12.4243C14.8614 12.5572 14.7802 12.6777 14.678 12.7791L11.723 15.7091C11.534 15.8959 11.2789 16.0007 11.013 16.0007C10.7472 16.0007 10.4921 15.8959 10.303 15.7091C10.2098 15.6171 10.1358 15.5076 10.0853 15.3868C10.0348 15.2661 10.0088 15.1365 10.0088 15.0056C10.0088 14.8746 10.0348 14.745 10.0853 14.6243C10.1358 14.5035 10.2098 14.394 10.303 14.3021L12.621 12.0051L10.294 9.69805V9.69805Z"
                        fill="#f1f2f4"
                      />
                    </g>
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="sidebar-body">
            <div className="">
              <a href="" className="sidebar-link sidebar-body-link">
                {/* <div className="workspace-logo">{workSpace}</div> */}
                <IconButton>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z"
                    fill="currentColor"
                  ></path>
                </IconButton>
                <p className="sidebar-link-text">Boards</p>
              </a>
            </div>
            <div className="">
              <a href="" className="sidebar-link sidebar-body-link">
                {/* <div className="workspace-logo">{workSpace}</div> */}
                <IconButton>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0254 3C9.25613 3 7.01123 5.23858 7.01123 8C7.01123 10.7614 9.25613 13 12.0254 13C14.7946 13 17.0395 10.7614 17.0395 8C17.0395 5.23858 14.7946 3 12.0254 3ZM9.01688 8C9.01688 9.65685 10.3638 11 12.0254 11C13.6869 11 15.0338 9.65685 15.0338 8C15.0338 6.34315 13.6869 5 12.0254 5C10.3638 5 9.01688 6.34315 9.01688 8Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0254 11C16.7803 11 20.6765 14.6667 21.0254 19.3194C20.8721 20.2721 20.0439 21 19.0452 21H18.9741C18.9741 21 18.9741 21 18.9741 21L5.0767 21C5.07671 21 5.0767 21 5.0767 21L5.00562 21C4.00691 21 3.1787 20.2721 3.02539 19.3193C3.37428 14.6667 7.27038 11 12.0254 11ZM5.0767 19H18.9741C18.4875 15.6077 15.5618 13 12.0254 13C8.48892 13 5.56331 15.6077 5.0767 19ZM19.0451 19.9769V20.0231C19.0452 20.0154 19.0452 20.0077 19.0452 20C19.0452 19.9923 19.0452 19.9846 19.0451 19.9769Z"
                    fill="currentColor"
                  ></path>
                </IconButton>
                <p className="sidebar-link-text">Members</p>
                <div className="sidebar-link-button-container">
                  <div className="header-button header-clickable">
                    <IconButton centerd={true}>
                      <path
                        d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                        fill="currentColor"
                      ></path>
                    </IconButton>
                  </div>
                </div>
              </a>
            </div>
            <div className="">
              <a href="" className="sidebar-link sidebar-body-link">
                {/* <div className="workspace-logo">{workSpace}</div> */}
                <IconButton>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0017 17.0009C9.23868 17.0009 6.99968 14.7609 6.99968 11.9989C6.99968 9.23586 9.23868 6.99686 12.0017 6.99686C14.7647 6.99686 17.0037 9.23586 17.0037 11.9989C17.0037 14.7609 14.7647 17.0009 12.0017 17.0009ZM20.3697 13.8839C19.5867 13.6119 19.0237 12.8749 19.0237 11.9989C19.0237 11.1229 19.5867 10.3859 20.3687 10.1139C20.6057 10.0319 20.7517 9.78086 20.6837 9.53986C20.4847 8.83586 20.2017 8.16886 19.8477 7.54686C19.7297 7.33886 19.4707 7.26186 19.2497 7.35186C18.8647 7.50986 18.4197 7.55086 17.9587 7.43286C17.2847 7.25886 16.7337 6.70986 16.5557 6.03686C16.4337 5.57386 16.4747 5.12686 16.6317 4.73986C16.7207 4.51986 16.6437 4.26086 16.4357 4.14286C15.8187 3.79386 15.1567 3.51386 14.4607 3.31686C14.2187 3.24886 13.9687 3.39386 13.8867 3.63086C13.6147 4.41386 12.8777 4.97686 12.0017 4.97686C11.1267 4.97686 10.3887 4.41386 10.1177 3.63186C10.0347 3.39486 9.78368 3.24886 9.54268 3.31686C8.83468 3.51686 8.16368 3.80186 7.53868 4.15886C7.33768 4.27386 7.25268 4.52586 7.34068 4.74086C7.48768 5.10186 7.53268 5.51386 7.43868 5.94386C7.28368 6.64986 6.72468 7.24086 6.02568 7.42786C5.56768 7.55086 5.12768 7.51186 4.74568 7.35986C4.52568 7.27186 4.26768 7.34986 4.15068 7.55586C3.79768 8.17786 3.51568 8.84586 3.31768 9.54986C3.24968 9.78886 3.39268 10.0369 3.62568 10.1219C4.39668 10.3999 4.94868 11.1319 4.94868 11.9989C4.94868 12.8659 4.39668 13.5979 3.62468 13.8759C3.39168 13.9599 3.24968 14.2079 3.31668 14.4469C3.49368 15.0739 3.73868 15.6729 4.03968 16.2369C4.15868 16.4589 4.43468 16.5349 4.66368 16.4299C5.25868 16.1569 6.00668 16.1659 6.76768 16.6679C6.88468 16.7449 6.99268 16.8529 7.06968 16.9689C7.59668 17.7679 7.58168 18.5489 7.26768 19.1559C7.15268 19.3789 7.21968 19.6569 7.43568 19.7839C8.08968 20.1679 8.79768 20.4709 9.54468 20.6809C9.78568 20.7489 10.0337 20.6049 10.1147 20.3679C10.3837 19.5819 11.1237 19.0149 12.0017 19.0149C12.8797 19.0149 13.6197 19.5819 13.8887 20.3679C13.9697 20.6039 14.2177 20.7489 14.4587 20.6809C15.1957 20.4739 15.8947 20.1749 16.5427 19.7979C16.7607 19.6709 16.8267 19.3899 16.7097 19.1669C16.3917 18.5589 16.3727 17.7739 16.9007 16.9719C16.9777 16.8559 17.0857 16.7469 17.2027 16.6699C17.9747 16.1589 18.7297 16.1569 19.3277 16.4399C19.5567 16.5479 19.8357 16.4729 19.9557 16.2499C20.2597 15.6859 20.5047 15.0859 20.6837 14.4569C20.7517 14.2159 20.6067 13.9659 20.3697 13.8839Z"
                    fill="currentColor"
                  ></path>
                </IconButton>

                <p className="sidebar-link-text">Workspace Settings</p>
              </a>
            </div>

            <h2 className="sidebar-collection-title">Workspace views</h2>
            <div className="">
              <a href="" className="sidebar-link sidebar-body-link">
                <IconButton>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z"
                    fill="currentColor"
                  ></path>
                </IconButton>
                <p className="">Table</p>
              </a>
            </div>
            <div className="sidebar-link ">
              <h2 className="sidebar-collection-title sidebar-link-text">
                Your Boards
              </h2>
              <div className="sidebar-link-button-container">
                <div
                  className="header-button header-clickable"
                  onClick={() => createNewboard()}
                >
                  <IconButton centerd={true}>
                    <path
                      d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                      fill="currentColor"
                    ></path>
                  </IconButton>
                </div>
              </div>
            </div>

            {currentWorkSpace.boards?.length > 0 ? ( //
                        currentWorkSpace.boards.map((board) => (
                            <SidebarChooseBoard
                            key={board._id}
                            board={board}
                          ></SidebarChooseBoard>
                        ))
                      ) : (
                        <div />
                      )}
            {/* <SidebarChooseBoard
              board={currentWorkSpace.boards[0]}
            ></SidebarChooseBoard> */}

            {/* <div className="">
              <a href="" className="sidebar-link sidebar-body-link">
                <div className="board-background-img"></div>
                
                <p className="">Basic Board</p>
              </a>
            </div> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
