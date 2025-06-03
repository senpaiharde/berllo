import {
  toggleRightMenuOpen,
  updateBoardStyle,
  syncBoardAsync,
} from "../../redux/BoardSlice"
import { SvgServices } from "../../services/svgServices"
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "../IconButton"
import { useState, useRef, useEffect } from "react"

import { TaskOps } from "../../services/backendHandler"
import { removeBoard } from "../../redux/WorkSpaceSlice"
import { useNavigate } from "react-router-dom"
export function BoardRightMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const board = useSelector((state) => state.boardReducer)
  const workSpace = useSelector((state) => state.workSpaceReducer)
  const displayMenu = board.rightMenuOpen ? "board-right-menu-show-menu" : ""
  function exitMenu() {
    dispatch(toggleRightMenuOpen(false));
  }
  const [isChoosingStyleType, setIsChoosingStyleType] = useState(false);
  const [isChoosingColor, setIsChoosingColor] = useState(false);
  const [isChoosingImg, setIsChoosingImg] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Menu');
  const [copied, setCopied] = useState(false);
  const copiedIndecation = copied ? 'Copied!' : 'Copy link to board';
  useEffect(() => {
    // console.log("setIsChoosingStyleType", isChoosingStyleType)
    if (isChoosingStyleType) {
      setHeaderTitle('Change background');
    } else {
      setHeaderTitle('Menu');
    }
  }, [isChoosingStyleType]);

  useEffect(() => {
    // console.log("isChoosingColor", isChoosingColor)
    if (isChoosingColor) {
      setHeaderTitle('Colors');
    }
  }, [isChoosingColor]);

  useEffect(() => {
    // console.log("isChoosingImg", isChoosingImg)
    if (isChoosingImg) {
      setHeaderTitle('Photos from Unsplash');
    }
  }, [isChoosingImg]);

  function onChooseColor(color) {
    // console.log("onChooseColor", color)
    const newBoardStyle = {
      boardType: 'color',
      boardColor: color,
      boardImg: '',
    };
    dispatch(updateBoardStyle(newBoardStyle));

    updateBoardInBackend(newBoardStyle);
  }

  function onChooseImg(img, color) {
    // console.log("onChooseImg", img)
    const newBoardStyle = {
      boardType: "image",
      boardColor: color,
      boardImg: img,
    }
    dispatch(
      syncBoardAsync({
        method: TaskOps.UPDATE,
        args: {
          taskId: board._id,
          body: {
            method: TaskOps.UPDATE,
            workId: 'board',
            boardStyle: newBoardStyle,
          },
        },
        workId: 'board',
      })
    );
    dispatch(updateBoardStyle(newBoardStyle));

    updateBoardInBackend(newBoardStyle);
  }
  BoardRightMenu;

  function updateBoardInBackend(newBoardStyle) {
    if (board._id) {
      dispatch(
        syncBoardAsync({
          method: TaskOps.UPDATE,
          args: {
            taskId: board._id,
            body: {
              method: TaskOps.UPDATE,
              workId: 'board',
              boardStyle: newBoardStyle,
            },
          },
          workId: 'board',
        })
      );
    } else {
      // console.log("no board._id when updateBoardInBackend", board._id)
    }
  }

  const copyToClipboard = async () => {
    try {
      const currentUrl = window.location.href
      // console.log("currentUrl", currentUrl)
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 sec
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  function onDeleteBoard() {
    console.log("Permanently delete board clicked")
    dispatch(
      syncBoardAsync({
        method: TaskOps.DELETE,
        args: {
          taskId: board._id,
          body: { method: TaskOps.DELETE, workId: "board" },
        },
        workId: "board",
      })
    )
    dispatch(removeBoard(board._id))
    exitMenu()
    const firstBoard = workSpace.boards[0]
    navigate(`/b/${firstBoard._id}/${encodeURIComponent(firstBoard.boardTitle)}/*`)
  }
  const primaryColor = "#912c5d"
  return (
    <div className={`board-right-menu-wrapper ${displayMenu}`}>
      <div className="board-right-menu-container">
        <header className="board-right-menu-header-wrapper">
          <div className="board-right-menu-header-container">
            {(isChoosingStyleType || isChoosingColor || isChoosingImg) && (
              <div
                className="share-page-close-button"
                //   style={{width:"32px", height:"32px"}}
                onClick={() => {
                  if (isChoosingStyleType) {
                    setIsChoosingStyleType(false);
                  }
                  if (isChoosingColor) {
                    setIsChoosingColor(false);
                    setIsChoosingStyleType(true);
                  }
                  if (isChoosingImg) {
                    setIsChoosingImg(false);
                    setIsChoosingStyleType(true);
                  }
                }}>
                <IconButton iconSize={'16px'} centerd={true}>
                  <path
                    d="M7.29289 11.2929L14.364 4.22185C14.7545 3.83132 15.3876 3.83132 15.7782 4.22185C16.1687 4.61237 16.1687 5.24554 15.7782 5.63606L9.41421 12L15.7782 18.364C16.1687 18.7545 16.1687 19.3877 15.7782 19.7782C15.3877 20.1687 14.7545 20.1687 14.364 19.7782L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929Z"
                    fill="currentColor"></path>
                </IconButton>
              </div>
            )}
            <h3 className="board-right-menu-header-title">{headerTitle}</h3>
            <div
              className="share-page-close-button"
              //   style={{width:"32px", height:"32px"}}
              onClick={() => exitMenu()}>
              <IconButton iconSize={'16px'} centerd={true}>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                  fill="currentColor"></path>
              </IconButton>
            </div>
          </div>
          <hr className="header-hr"></hr>
        </header>

        <section className="board-right-menu-content-wrapper">
          {!isChoosingStyleType && !isChoosingColor && !isChoosingImg && (
            <div className="board-right-menu-content-container">
              <button
                className="board-right-menu-button"
                onClick={() => {
                  console.log('Settings clicked');
                }}>
                <span
                  className="board-right-menu-button-style"
                  // style={{ color: "#C9372C" }}
                >
                  <svg
                    width="20"
                    height="20"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0017 17.0009C9.23868 17.0009 6.99968 14.7609 6.99968 11.9989C6.99968 9.23586 9.23868 6.99686 12.0017 6.99686C14.7647 6.99686 17.0037 9.23586 17.0037 11.9989C17.0037 14.7609 14.7647 17.0009 12.0017 17.0009ZM20.3697 13.8839C19.5867 13.6119 19.0237 12.8749 19.0237 11.9989C19.0237 11.1229 19.5867 10.3859 20.3687 10.1139C20.6057 10.0319 20.7517 9.78086 20.6837 9.53986C20.4847 8.83586 20.2017 8.16886 19.8477 7.54686C19.7297 7.33886 19.4707 7.26186 19.2497 7.35186C18.8647 7.50986 18.4197 7.55086 17.9587 7.43286C17.2847 7.25886 16.7337 6.70986 16.5557 6.03686C16.4337 5.57386 16.4747 5.12686 16.6317 4.73986C16.7207 4.51986 16.6437 4.26086 16.4357 4.14286C15.8187 3.79386 15.1567 3.51386 14.4607 3.31686C14.2187 3.24886 13.9687 3.39386 13.8867 3.63086C13.6147 4.41386 12.8777 4.97686 12.0017 4.97686C11.1267 4.97686 10.3887 4.41386 10.1177 3.63186C10.0347 3.39486 9.78368 3.24886 9.54268 3.31686C8.83468 3.51686 8.16368 3.80186 7.53868 4.15886C7.33768 4.27386 7.25268 4.52586 7.34068 4.74086C7.48768 5.10186 7.53268 5.51386 7.43868 5.94386C7.28368 6.64986 6.72468 7.24086 6.02568 7.42786C5.56768 7.55086 5.12768 7.51186 4.74568 7.35986C4.52568 7.27186 4.26768 7.34986 4.15068 7.55586C3.79768 8.17786 3.51568 8.84586 3.31768 9.54986C3.24968 9.78886 3.39268 10.0369 3.62568 10.1219C4.39668 10.3999 4.94868 11.1319 4.94868 11.9989C4.94868 12.8659 4.39668 13.5979 3.62468 13.8759C3.39168 13.9599 3.24968 14.2079 3.31668 14.4469C3.49368 15.0739 3.73868 15.6729 4.03968 16.2369C4.15868 16.4589 4.43468 16.5349 4.66368 16.4299C5.25868 16.1569 6.00668 16.1659 6.76768 16.6679C6.88468 16.7449 6.99268 16.8529 7.06968 16.9689C7.59668 17.7679 7.58168 18.5489 7.26768 19.1559C7.15268 19.3789 7.21968 19.6569 7.43568 19.7839C8.08968 20.1679 8.79768 20.4709 9.54468 20.6809C9.78568 20.7489 10.0337 20.6049 10.1147 20.3679C10.3837 19.5819 11.1237 19.0149 12.0017 19.0149C12.8797 19.0149 13.6197 19.5819 13.8887 20.3679C13.9697 20.6039 14.2177 20.7489 14.4587 20.6809C15.1957 20.4739 15.8947 20.1749 16.5427 19.7979C16.7607 19.6709 16.8267 19.3899 16.7097 19.1669C16.3917 18.5589 16.3727 17.7739 16.9007 16.9719C16.9777 16.8559 17.0857 16.7469 17.2027 16.6699C17.9747 16.1589 18.7297 16.1569 19.3277 16.4399C19.5567 16.5479 19.8357 16.4729 19.9557 16.2499C20.2597 15.6859 20.5047 15.0859 20.6837 14.4569C20.7517 14.2159 20.6067 13.9659 20.3697 13.8839Z"
                      fill="currentColor"></path>
                  </svg>
                </span>
                <div className="board-right-menu-button-label">Settings</div>
              </button>

              <button
                className="board-right-menu-button"
                onClick={() => {
                  console.log('Share clicked');
                  copyToClipboard();
                }}>
                <span
                  className="board-right-menu-button-style"
                  // style={{ color: "#C9372C" }}
                >
                  <svg
                    width="20"
                    height="20"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 15C6.79565 15 7.55871 14.6839 8.12132 14.1213C8.68393 13.5587 9 12.7956 9 12C9 11.2043 8.68393 10.4413 8.12132 9.87867C7.55871 9.31606 6.79565 8.99999 6 8.99999C5.20435 8.99999 4.44129 9.31606 3.87868 9.87867C3.31607 10.4413 3 11.2043 3 12C3 12.7956 3.31607 13.5587 3.87868 14.1213C4.44129 14.6839 5.20435 15 6 15ZM6 13C5.73478 13 5.48043 12.8946 5.29289 12.7071C5.10536 12.5196 5 12.2652 5 12C5 11.7348 5.10536 11.4804 5.29289 11.2929C5.48043 11.1053 5.73478 11 6 11C6.26522 11 6.51957 11.1053 6.70711 11.2929C6.89464 11.4804 7 11.7348 7 12C7 12.2652 6.89464 12.5196 6.70711 12.7071C6.51957 12.8946 6.26522 13 6 13ZM18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2043 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2043 15 18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21ZM18 19C17.7348 19 17.4804 18.8946 17.2929 18.7071C17.1054 18.5196 17 18.2652 17 18C17 17.7348 17.1054 17.4804 17.2929 17.2929C17.4804 17.1053 17.7348 17 18 17C18.2652 17 18.5196 17.1053 18.7071 17.2929C18.8946 17.4804 19 17.7348 19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19Z"
                      fill="currentColor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 13.562L15.66 18.562L16.66 16.83L8 11.83L7 13.562Z"
                      fill="currentColor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 10.83L8 12.562L16.66 7.56199L15.66 5.82999L7 10.83Z"
                      fill="currentColor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7ZM18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z"
                      fill="currentColor"></path>
                  </svg>
                </span>
                <div className="board-right-menu-button-label">{copiedIndecation}</div>
              </button>

              <hr
                className="header-hr"
                style={{
                  paddingTop: '1px',
                  marginBottom: '3px',
                  marginTop: '3px',
                }}></hr>

              <button
                className="board-right-menu-button"
                // style={{ padding: "6px 10px" }}
                onClick={() => {
                  console.log('Labels clicked');
                }}>
                <span
                  className="board-right-menu-button-style"
                  // style={{ color: "#C9372C" }}
                >
                  <svg
                    width="20"
                    height="20"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.1213 2.80762C12.3403 2.02657 11.0739 2.02657 10.2929 2.80762L3.92891 9.17158C1.19524 11.9052 1.19524 16.3374 3.92891 19.0711C6.66258 21.8047 11.0947 21.8047 13.8284 19.0711L20.1924 12.7071C20.9734 11.9261 20.9734 10.6597 20.1924 9.87869L13.1213 2.80762ZM18.7782 11.2929L11.7071 4.22183L5.34313 10.5858C3.39051 12.5384 3.39051 15.7042 5.34313 17.6569C7.29575 19.6095 10.4616 19.6095 12.4142 17.6569L18.7782 11.2929ZM10 14C10 14.5523 9.55228 15 9 15C8.44772 15 8 14.5523 8 14C8 13.4477 8.44772 13 9 13C9.55228 13 10 13.4477 10 14ZM12 14C12 15.6569 10.6569 17 9 17C7.34315 17 6 15.6569 6 14C6 12.3431 7.34315 11 9 11C10.6569 11 12 12.3431 12 14Z"
                      fill="currentColor"></path>
                  </svg>
                </span>
                <div className="board-right-menu-button-label">Labels</div>
              </button>

              <button
                className="board-right-menu-button"
                onClick={() => {
                  console.log('Change background clicked');
                  setIsChoosingStyleType(true);
                  setIsChoosingColor(false);
                  setIsChoosingImg(false);
                }}>
                <span
                  className="board-right-menu-button-style"
                  style={{ backgroundColor: primaryColor }}></span>

                <div className="board-right-menu-button-label">Change background</div>
              </button>

              <button
                className="board-right-menu-button"
                // style={{ padding: "6px 10px" }}
                onClick={() => {
                  // console.log("Permanently delete board clicked")
                  onDeleteBoard()
                }}
              >
                <span
                  className="board-right-menu-button-style"
                  style={{ color: "#C9372C" }}
                >
                  <svg
                    width="20"
                    height="20"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4H19C19.552 4 20 4.448 20 5V6H4V5C4 4.448 4.448 4 5 4H9Z"
                      fill="currentColor"></path>
                    <path
                      d="M9 11C9 10.4477 9.44772 10 10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11Z"
                      fill="currentColor"></path>
                    <path
                      d="M13 11C13 10.4477 13.4477 10 14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11Z"
                      fill="currentColor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.85795 18.1534L5 7H19L18.142 18.1534C18.0619 19.1954 17.193 20 16.1479 20H7.85206C6.80699 20 5.93811 19.1954 5.85795 18.1534ZM7.85206 18L7.15975 9H16.8402L16.1479 18L7.85206 18Z"
                      fill="currentColor"></path>
                  </svg>
                  
                </span>

                <div className="board-right-menu-button-label">Permanently delete board</div>
              </button>
            </div>
          )}
          {isChoosingStyleType && (
            <div className="board-right-menu-content-container">
              <div className="board-right-menu-choose-style-container">
                <button className="board-right-menu-choose-style-button">
                  <div
                    className="board-right-menu-choose-style-button-preview"
                    style={{
                      backgroundImage: 'url(https://trello.com/assets/8f9c1323c9c16601a9a4.jpg)',
                    }}
                    onClick={() => {
                      console.log('Change background clicked');
                      setIsChoosingStyleType(false);
                      setIsChoosingColor(false);
                      setIsChoosingImg(true);
                    }}></div>
                  <span>Photos</span>
                </button>
                <button className="board-right-menu-choose-style-button">
                  <div
                    className="board-right-menu-choose-style-button-preview"
                    style={{
                      backgroundImage: 'url(https://trello.com/assets/97db30fe74a58b7b7a18.png)',
                    }}
                    onClick={() => {
                      console.log('Change background clicked');
                      setIsChoosingStyleType(false);
                      setIsChoosingColor(true);
                      setIsChoosingImg(false);
                    }}></div>
                  <span>colors</span>
                </button>
              </div>
            </div>
          )}
          {isChoosingColor && (
            <div className="board-right-menu-content-container">
              <div className="board-right-menu-choose-colors-container">
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#0079BF' }}
                  onClick={() => {
                    onChooseColor('#0079BF');
                  }}></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#0079BF' }}
                  onClick={() => {
                    onChooseColor('#D29034');
                  }}></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#519839' }}
                  onClick={() => {
                    onChooseColor('#519839');
                  }}></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#B04632' }}
                  onClick={() => {
                    onChooseColor('#B04632');
                  }}></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#89609E' }}
                  onClick={() => {
                    onChooseColor('#89609E');
                  }}></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#CD5A91' }}
                  onClick={() => {
                    onChooseColor('#CD5A91');
                  }}></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#4BBF6B' }}
                  onClick={() => {
                    onChooseColor('#4BBF6B');
                  }}></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#00AECC' }}
                  onClick={() => {
                    onChooseColor('#00AECC');
                  }}></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#f0f011' }}
                  onClick={() => {
                    onChooseColor('#f0f011');
                  }}></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: '#b8b809' }}
                  onClick={() => {
                    onChooseColor('#b8b809');
                  }}></button>
              </div>
            </div>
          )}
          {isChoosingImg && (
            <div className="board-right-menu-content-container">
              <div className="board-right-menu-choose-imgs-wrapper">
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1748372928120-6543f1c68da0?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1748372928120-6543f1c68da0?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#966726'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#87CEEB'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1748632799967-63f8c53d69c1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1748632799967-63f8c53d69c1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#87CEEB'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1748719151811-60692f7f439c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1748719151811-60692f7f439c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#cca064'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1748632800124-dc5874469774?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1748632800124-dc5874469774?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#20a7db'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1748632799979-76e04dde23a8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1748632799979-76e04dde23a8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#ec6ef5'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1748534515437-d8077c27311d?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1748534515437-d8077c27311d?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#3f3f3f'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#87CEEB'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1743024282286-5bfecf55a834?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1743024282286-5bfecf55a834?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#131862'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1748818328832-73aa4d129903?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://images.unsplash.com/photo-1748818328832-73aa4d129903?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#7f7f7f'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://plus.unsplash.com/premium_photo-1746420145979-f53c38fa829c?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://plus.unsplash.com/premium_photo-1746420145979-f53c38fa829c?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#f5ca6e'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://plus.unsplash.com/premium_photo-1748729621135-57a3168c9fbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://plus.unsplash.com/premium_photo-1748729621135-57a3168c9fbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#73c4e6'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://plus.unsplash.com/premium_photo-1748729621256-d7612f6d1550?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://plus.unsplash.com/premium_photo-1748729621256-d7612f6d1550?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#D29034'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://plus.unsplash.com/premium_photo-1748729874878-7f56dce2cddb?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://plus.unsplash.com/premium_photo-1748729874878-7f56dce2cddb?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#cf9d59'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://plus.unsplash.com/premium_photo-1748729883233-390c46f9e669?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://plus.unsplash.com/premium_photo-1748729883233-390c46f9e669?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#cf9d59'
                      );
                    }}></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        'url(https://plus.unsplash.com/premium_photo-1748729621110-2a54d1167ba7?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    }}
                    onClick={() => {
                      onChooseImg(
                        'https://plus.unsplash.com/premium_photo-1748729621110-2a54d1167ba7?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        '#73c4e6'
                      );
                    }}></button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
