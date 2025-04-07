import { useParams, useNavigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { fetchBoardById } from "../redux/BoardSlice.js"
import { getLocalData } from "../services/storageService.js"
import GlobalHeader from "../components/GlobalHeader"
import { BoardHeader } from "../components/boardCmps/boardHeaderCmps/BoardHeader.jsx"
import { BoardView } from "../components/boardCmps/BoardView.jsx"
import { BoardSideBar } from "../components/boardCmps/sideBarCmps/BoardSideBar.jsx"

const Workspace = () => {
  const { boardId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const board = useSelector((state) => state.boardReducer)

  //  Load the board if ID exists
  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoardById(boardId))
    }
  }, [dispatch, boardId])

  //  Auto-load default board if no ID in URL
  useEffect(() => {
    const loadDefaultBoard = async () => {
      const localData = await getLocalData()
      const boards = localData?.boards

      if (boards?.length > 0 && !boardId) {
        const firstBoard = boards[0]
        const slug =
          firstBoard.slug ||
          firstBoard.boardTitle?.toLowerCase().replace(/\s+/g, "-")
        console.log(" Redirecting to:", `/b/${firstBoard._id}/${slug}`)
        navigate(`/b/${firstBoard._id}/${slug}`)
      }
    }
    loadDefaultBoard()
  }, [boardId, navigate])

  if (!board || !board._id) {
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
                  <div className="board-wrapper">
                    <div className="board-main-content">
                      <BoardHeader board={board} />
                      <BoardView board={board} />
                    </div>
                  </div>
                </div>
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Workspace
