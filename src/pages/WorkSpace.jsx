import { useParams, useNavigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { TaskOps } from "../services/backendHandler.js"
import { syncBoardAsync } from "../redux/BoardSlice.js"
import { addnewBoard } from "../redux/WorkSpaceSlice.js"
import { getLocalData } from "../services/storageService.js"
import GlobalHeader from "../components/GlobalHeader"
import { BoardHeader } from "../components/boardCmps/boardHeaderCmps/BoardHeader.jsx"
import { BoardView } from "../components/boardCmps/BoardView.jsx"
import { BoardSideBar } from "../components/boardCmps/sideBarCmps/BoardSideBar.jsx"
import { body } from "framer-motion/client"
import { BoardSharePage } from "../components/boardCmps/BoardSharePage.jsx"
import { BoardRightMenu } from "../components/boardCmps/BoardRightMenu.jsx"

const Workspace = () => {
  const { boardId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const filter = "f"
  const board = useSelector((state) => state.boardReducer)

  const rightMenuOpen = useSelector((state) => state.boardReducer.rightMenuOpen)
  const [boardViewBackgound, setBoardViewBackgound] = useState()

  useEffect(() => {
    console.log("board.boardStyle", board.boardStyle)
    // {board.boardStyle && board.boardStyle.backgroundColor ? "board.boardStyle.backgroundColor" : ""}
    if (
      board.boardStyle &&
      board.boardStyle.boardColor &&
      board.boardStyle.boardType === "color"
    ) {
      console.log("board.boardStyle.boardColor", board.boardStyle.boardColor)
      setBoardViewBackgound({ backgroundColor: board.boardStyle.boardColor })
    }
    if (
      board.boardStyle &&
      board.boardStyle.boardImg &&
      board.boardStyle.boardType === "image"
    ) {
      // console.log("board.boardStyle.boardImg", board.boardStyle.boardImg)
      const img = new Image()
      
      img.onload = () => {
      // ✅ At this point, naturalWidth is valid
      if (img.naturalWidth === 0) {
        console.warn("Image appears broken:", board.boardStyle.boardImg);
        setBoardViewBackgound({ backgroundColor: board.boardStyle.boardColor  }); // fallback
      } else {
        setBoardViewBackgound({
          backgroundImage: `url(${board.boardStyle.boardImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        });
      }
    };
      console.log("board.boardStyle.boardImg", board.boardStyle.boardImg)
      console.log("img.naturalWidth", img.naturalWidth)
      img.onerror = () => {
        console.warn("Failed to load image:", board.boardStyle.boardImg)
        // Optional: fallback background
        setBoardViewBackgound({ backgroundColor: board.boardStyle.boardColor }) // or any fallback
      }
      img.src = board.boardStyle.boardImg;
    
    }
  }, [board])

  useEffect(() => {
    if (boardId) {
      dispatch(
        syncBoardAsync({
          method: TaskOps.FETCH,
          args: {
            taskId: boardId,
            body: { method: TaskOps.FETCH, workId: "board" },
          },
          workId: "board",
        })
      )
    } else {
      // dispatch(addnewBoard("test board"))
    }
  }, [dispatch, boardId])

  //  Auto-load default board if no ID in URL
  // useEffect(() => {
  //   const loadDefaultBoard = async () => {
  //     const localData = await getLocalData()
  //     const boards = localData?.boards

  //     if (boards?.length > 0 && !boardId) {
  //       const firstBoard = boards[0]
  //       const slug =
  //         firstBoard.slug ||
  //         firstBoard.boardTitle?.toLowerCase().replace(/\s+/g, "-")
  //       console.log(" Redirecting to:", `/b/${firstBoard._id}/${slug}`)
  //       navigate(`/b/${firstBoard._id}/${slug}`)
  //     }
  //   }
  //   loadDefaultBoard()
  // }, [boardId, navigate])

  // if (!board || !board._id)

  if (!board) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="work-space">
        <GlobalHeader />
        <div className="popover-boundary">
          <div className="board-main-components-container">
            <BoardSideBar></BoardSideBar>
            {/* <nav className="board-sidebar-navigation">
              <div className="board-sidebar-collapsed-container">
                <div className="board-sidebar-collapsed">
                  <button className="board-sidebar-collapsed-btn">x</button>
                </div>
              </div>
            </nav> */}
            <div className="content-wrapper">
              <div style={{ height: "100%" }}>
                <div style={{ height: "100%" }}>
                  <div className="board-wrapper" style={boardViewBackgound}>
                    <div
                      className="board-main-content"
                      style={
                        rightMenuOpen ? { marginRight: "339px" } : undefined
                      }
                    >
                      <BoardHeader />
                      <BoardView />
                    </div>
                    <BoardRightMenu></BoardRightMenu>
                  </div>
                </div>
              </div>

              <Outlet />
            </div>
          </div>
        </div>

        <BoardSharePage />
      </div>
    )
  }
}

export default Workspace
