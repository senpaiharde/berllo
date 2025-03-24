import { useParams } from "react-router-dom"
import { getBoardById } from "../utils/boardUtils"
import { BoardView } from "../components/BoardView"
import { BoardHeader } from "../components/BoardHeader"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import GlobalHeader from "../components/GlobalHeader"

const Workspace = () => {
  const { boardId } = useParams()
  const board = getBoardById(boardId)
  const firstBoard = useSelector((state) => state.WorkSpaceReducer.boards?.[0])

  if (!firstBoard) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <div className="workspace">
          {/* <BoardHeader board={firstBoard ? { board: firstBoard.boardTitle } : { name: "Loading..." }}/> */}
          <BoardHeader board={firstBoard} />
          <BoardView board={firstBoard} />
        </div>
      </>
    )
  }
}

export default Workspace
