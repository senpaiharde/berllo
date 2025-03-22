import { useParams } from "react-router-dom";
import { getBoardById } from "../utils/boardUtils";
import { BoardView } from "../components/BoardView";
import { BoardHeader } from "../components/BoardHeader";
import GlobalHeader from "../components/GlobalHeader";





const Workspace = () => {

    const {boardId} = useParams();
    const board = getBoardById(boardId);

    // if(!board) return <div>Board not found</div>

    return (
        <>
        <GlobalHeader/>
        <div className='workspace'>
            {/* <h1>{board.boardTitle}</h1> */}
            <BoardHeader board={{name: 'Board name'}}/>
            <BoardView board={board}/>
        </div>
        </>
    );

};


export default Workspace;