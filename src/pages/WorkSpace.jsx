import { useParams } from "react-router-dom"
import { getBoardById } from "../utils/boardUtils"
import { BoardView } from "../components/BoardView"
import { BoardHeader } from "../components/BoardHeader"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit"
import { useEffect } from "react"
import { fetchBoardById } from "../redux/BoardSlice.js"
import GlobalHeader from "../components/GlobalHeader"
import { Route, Routes } from "react-router-dom"
import TaskDetails from "../components/TaskDetails"
import { Outlet } from "react-router-dom"

const Workspace = () => {
  const { boardId } = useParams()
  console.log("🌐 Workspace loaded with boardId:", boardId)

  const dispatch = useDispatch()
  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoardById(boardId))
    }
  }, [dispatch, boardId])

  //   const boardid = getBoardById(boardId)
  const selectFirstBoard = createSelector(
    (state) => state.workSpaceReducer.boards,
    (boards) => boards?.[0] || null
  )

  const board = useSelector((state) => state.boardReducer)
  const firstBoard = useSelector(selectFirstBoard)

  // console.log(" board from selector:", board);
  if (!board || !board._id) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <GlobalHeader />
        <div className="popover-boundary">
          <div className="content-wrapper">
            <div
              style={{
                position: "relative",
                flexGrow: "1",
                overflowY: "auto",
                outline: "none",
              }}
            >
              <div style={{display: "block"}}>
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
      </>
    )
  }
}

export default Workspace
