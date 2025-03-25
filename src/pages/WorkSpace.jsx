import { useParams } from "react-router-dom"
import { getBoardById } from "../utils/boardUtils"
import { BoardView } from "../components/BoardView"
import { BoardHeader } from "../components/BoardHeader"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react"
import {fetchBoardById} from '../redux/BoardSlice.js';
import GlobalHeader from "../components/GlobalHeader"

const Workspace = () => {
  const { boardId } = useParams()
  
  const dispatch = useDispatch();
  useEffect(() => {
    const id = "dgsgs1"
      dispatch(fetchBoardById(id));
    }, [dispatch]);

//   const boardid = getBoardById(boardId)
  const selectFirstBoard = createSelector(
    (state) => state.WorkSpaceReducer.boards,
    (boards) => boards?.[0] || null
  )

  const board = useSelector((state) => state.BoardReducer)
  const firstBoard = useSelector(selectFirstBoard)

  if (!firstBoard) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <div className="workspace">
          {/* <BoardHeader board={firstBoard ? { board: firstBoard.boardTitle } : { name: "Loading..." }}/> */}
          <BoardHeader board={board} />
          <BoardView board={board} />
        </div>
      </>
    )
  }
}

export default Workspace
