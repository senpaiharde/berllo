import { useParams } from "react-router-dom";
import { getBoardById } from "../utils/boardUtils";
import GlobalHeader from "../components/GlobalHeader";





const Workspace = () => {

    const {boardId} = useParams();
    const board = getBoardById(boardId);

    if(!board) return <div>Board not found</div>

    return (
        <>
        <GlobalHeader/>
        <div className='workspace'>
            <h1>{board.boardTitle}</h1>
        </div>
        </>
    );

};


export default Workspace;