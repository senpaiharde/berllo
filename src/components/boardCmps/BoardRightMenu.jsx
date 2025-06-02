import {
  toggleRightMenuOpen,
  updateBoardStyle,
  syncBoardAsync,
} from "../../redux/BoardSlice"
import { SvgServices } from "../../services/svgServices"
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "../IconButton"
import { useState, useRef, useEffect } from "react"
import { color } from "framer-motion"
import { TaskOps } from "../../services/backendHandler"
export function BoardRightMenu() {
  const dispatch = useDispatch()
  const board = useSelector((state) => state.boardReducer)
  const displayMenu = board.rightMenuOpen ? "board-right-menu-show-menu" : ""
  function exitMenu() {
    dispatch(toggleRightMenuOpen(false))
  }
  const [isChoosingStyleType, setIsChoosingStyleType] = useState(false)
  const [isChoosingColor, setIsChoosingColor] = useState(false)
  const [isChoosingImg, setIsChoosingImg] = useState(false)
  const [headerTitle, setHeaderTitle] = useState("Menu")

  useEffect(() => {
    console.log("setIsChoosingStyleType", isChoosingStyleType)
    if (isChoosingStyleType) {
      setHeaderTitle("Change background")
    } else {
      setHeaderTitle("Menu")
    }
  }, [isChoosingStyleType])

  useEffect(() => {
    console.log("isChoosingColor", isChoosingColor)
    if (isChoosingColor) {
      setHeaderTitle("Colors")
    }
  }, [isChoosingColor])

  useEffect(() => {
    console.log("isChoosingImg", isChoosingImg)
    if (isChoosingImg) {
      setHeaderTitle("Photos from Unsplash")
    }
  }, [isChoosingImg])

  function onChooseColor(color) {
    console.log("onChooseColor", color)
    const newBoardStyle = {
      boardType: "color",
      boardColor: color,
      boardImg: "",
    }
    dispatch(updateBoardStyle(newBoardStyle))

    updateBoardInBackend(newBoardStyle)
  }

  function onChooseImg(img, color) {
    console.log("onChooseImg", img)
    dispatch(
        syncBoardAsync({
          method: TaskOps.UPDATE,
          args: {
            taskId: board._id,
            body: {
              method: TaskOps.UPDATE,
              workId: "board",
              boardStyle: newBoardStyle,
            },
          },
          workId: "board",
        })
      )
    dispatch(updateBoardStyle(newBoardStyle))

    updateBoardInBackend(newBoardStyle)
  }

  function updateBoardInBackend(newBoardStyle) {
    if (board._id) {
      dispatch(
        syncBoardAsync({
          method: TaskOps.UPDATE,
          args: {
            taskId: board._id,
            body: {
              method: TaskOps.UPDATE,
              workId: "board",
              boardStyle: newBoardStyle,
            },
          },
          workId: "board",
        })
      )
    } else {
      console.log("no board._id when updateBoardInBackend", board._id)
    }
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
                    setIsChoosingStyleType(false)
                  }
                  if (isChoosingColor) {
                    setIsChoosingColor(false)
                    setIsChoosingStyleType(true)
                  }
                  if (isChoosingImg) {
                    setIsChoosingImg(false)
                    setIsChoosingStyleType(true)
                  }
                }}
              >
                <IconButton iconSize={"16px"} centerd={true}>
                  <path
                    d="M7.29289 11.2929L14.364 4.22185C14.7545 3.83132 15.3876 3.83132 15.7782 4.22185C16.1687 4.61237 16.1687 5.24554 15.7782 5.63606L9.41421 12L15.7782 18.364C16.1687 18.7545 16.1687 19.3877 15.7782 19.7782C15.3877 20.1687 14.7545 20.1687 14.364 19.7782L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929Z"
                    fill="currentColor"
                  ></path>
                </IconButton>
              </div>
            )}
            <h3 className="board-right-menu-header-title">{headerTitle}</h3>
            <div
              className="share-page-close-button"
              //   style={{width:"32px", height:"32px"}}
              onClick={() => exitMenu()}
            >
              <IconButton iconSize={"16px"} centerd={true}>
                <path
                  fiilRule="evenodd"
                  clipRule="evenodd"
                  d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                  fill="currentColor"
                ></path>
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
                  console.log("Change background clicked")
                  setIsChoosingStyleType(true)
                  setIsChoosingColor(false)
                  setIsChoosingImg(false)
                }}
              >
                <span
                  className="board-right-menu-button-style"
                  style={{ backgroundColor: primaryColor }}
                ></span>

                <div className="board-right-menu-button-label">
                  Change background
                </div>
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
                      backgroundImage:
                        "url(https://trello.com/assets/8f9c1323c9c16601a9a4.jpg)",
                    }}
                    onClick={() => {
                      console.log("Change background clicked")
                      setIsChoosingStyleType(false)
                      setIsChoosingColor(false)
                      setIsChoosingImg(true)
                    }}
                  ></div>
                  <span>Photos</span>
                </button>
                <button className="board-right-menu-choose-style-button">
                  <div
                    className="board-right-menu-choose-style-button-preview"
                    style={{
                      backgroundImage:
                        "url(https://trello.com/assets/97db30fe74a58b7b7a18.png)",
                    }}
                    onClick={() => {
                      console.log("Change background clicked")
                      setIsChoosingStyleType(false)
                      setIsChoosingColor(true)
                      setIsChoosingImg(false)
                    }}
                  ></div>
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
                  style={{ backgroundColor: "#0079BF" }}
                  onClick={() => {
                    onChooseColor("#0079BF")
                  }}
                ></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: "#0079BF" }}
                  onClick={() => {
                    onChooseColor("#D29034")
                  }}
                ></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: "#519839" }}
                  onClick={() => {
                    onChooseColor("#519839")
                  }}
                ></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: "#B04632" }}
                  onClick={() => {
                    onChooseColor("#B04632")
                  }}
                ></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: "#89609E" }}
                  onClick={() => {
                    onChooseColor("#89609E")
                  }}
                ></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: "#CD5A91" }}
                  onClick={() => {
                    onChooseColor("#CD5A91")
                  }}
                ></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: "#4BBF6B" }}
                  onClick={() => {
                    onChooseColor("#4BBF6B")
                  }}
                ></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: "#00AECC" }}
                  onClick={() => {
                    onChooseColor("#00AECC")
                  }}
                ></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: "#f0f011" }}
                  onClick={() => {
                    onChooseColor("#f0f011")
                  }}
                ></button>
                <button
                  className="board-right-menu-choose-color-button"
                  style={{ backgroundColor: "#b8b809" }}
                  onClick={() => {
                    onChooseColor("#b8b809")
                  }}
                ></button>
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
                        "url(https://images.unsplash.com/photo-1748372928120-6543f1c68da0?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1748372928120-6543f1c68da0?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#966726"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#87CEEB"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1748632799967-63f8c53d69c1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1748632799967-63f8c53d69c1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#87CEEB"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1748719151811-60692f7f439c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1748719151811-60692f7f439c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#cca064"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1748632800124-dc5874469774?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1748632800124-dc5874469774?q=80&w=2151&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#20a7db"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1748632799979-76e04dde23a8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1748632799979-76e04dde23a8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#ec6ef5"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1748534515437-d8077c27311d?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1748534515437-d8077c27311d?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#3f3f3f"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#87CEEB"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1743024282286-5bfecf55a834?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1743024282286-5bfecf55a834?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#131862"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1748818328832-73aa4d129903?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://images.unsplash.com/photo-1748818328832-73aa4d129903?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#7f7f7f"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://plus.unsplash.com/premium_photo-1746420145979-f53c38fa829c?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://plus.unsplash.com/premium_photo-1746420145979-f53c38fa829c?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#f5ca6e"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://plus.unsplash.com/premium_photo-1748729621135-57a3168c9fbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://plus.unsplash.com/premium_photo-1748729621135-57a3168c9fbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#73c4e6"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://plus.unsplash.com/premium_photo-1748729621256-d7612f6d1550?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://plus.unsplash.com/premium_photo-1748729621256-d7612f6d1550?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#D29034"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://plus.unsplash.com/premium_photo-1748729874878-7f56dce2cddb?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://plus.unsplash.com/premium_photo-1748729874878-7f56dce2cddb?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#cf9d59"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://plus.unsplash.com/premium_photo-1748729883233-390c46f9e669?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://plus.unsplash.com/premium_photo-1748729883233-390c46f9e669?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#cf9d59"
                      )
                    }}
                  ></button>
                </div>
                <div className="board-right-menu-choose-img-container">
                  <button
                    className="board-right-menu-choose-img-button"
                    style={{
                      backgroundImage:
                        "url(https://plus.unsplash.com/premium_photo-1748729621110-2a54d1167ba7?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    }}
                    onClick={() => {
                      onChooseImg(
                        "https://plus.unsplash.com/premium_photo-1748729621110-2a54d1167ba7?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        "#73c4e6"
                      )
                    }}
                  ></button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
