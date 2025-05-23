



import './styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {fetchWorkSpaces} from './redux/WorkSpaceSlice.js';
import {Login} from './pages/Login';
import {Home} from './pages/Home';
import Workspace from './pages/WorkSpace';
import TaskDetails from './components/boardCmps/taskDetailsCmp/TaskDetails.jsx';
import {getLocalData} from './services/storageService.js';
import {fetchBoardById} from './redux/BoardSlice.js';


function App() {
  const dispatch = useDispatch();
  
  
  
// useEffect(() => {
//     const loadInitialBoard = async () => {
//       const data = await getLocalData();
//       const firstBoard = data?.boards?.[0];
  
//       if (firstBoard) {
       
//         // dispatch(fetchBoardById(firstBoard._id)); 
//       }
//     };
  
//     loadInitialBoard();
//   }, [dispatch]);
  // using *  telling that Workspace is responsible for all nested routes under /b/:boardId/:boardName/
  return (
    <BrowserRouter>
      <div 
      style={{ height: "100%",}}
      >
        
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         
        <Route path="/b/:boardId/:boardName/*" element={<Workspace />}>
        <Route path=":taskId" element={<TaskDetails />} />
        </Route>

        </Routes>
      </div>
    </BrowserRouter>
  


  )
}

export default App
