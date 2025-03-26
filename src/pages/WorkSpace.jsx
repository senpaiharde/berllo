import { useParams } from "react-router-dom"
import { getBoardById } from "../utils/boardUtils"
import { BoardView } from "../components/BoardView"
import { BoardHeader } from "../components/BoardHeader"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react"
import {fetchBoardById} from '../redux/BoardSlice.js';
import GlobalHeader from "../components/GlobalHeader"
import { Route, Routes } from "react-router-dom";
import TaskDetails from '../components/TaskDetails';



const Workspace = () => {
  const { boardId } = useParams()
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (boardId) {
        dispatch(fetchBoardById(boardId));
    }
    }, [dispatch, boardId]);

//   const boardid = getBoardById(boardId)
  const selectFirstBoard = createSelector(
    (state) => state.workSpaceReducer.boards,
    (boards) => boards?.[0] || null
  )

  const board = useSelector((state) => state.boardReducer)
  const firstBoard = useSelector(selectFirstBoard)

  
 // console.log(" board from selector:", board);
  if (!firstBoard) {
    return <div>Loading...</div>
  } else {
    return (
      <>
      <GlobalHeader/>
        <div className="workspace">
          {/* <BoardHeader board={firstBoard ? { board: firstBoard.boardTitle } : { name: "Loading..." }}/> */}
          <BoardHeader board={board} />        {/** */}
          <BoardView board={board} />

        <Routes>
        <Route path=":taskId" element={<TaskDetails />} />
        </Routes>
        </div>
      </>
    )
  }
}

export default Workspace
