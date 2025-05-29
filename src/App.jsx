



import './styles/main.scss';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {fetchWorkSpaces} from './redux/WorkSpaceSlice.js';
import {Login} from './pages/Login';
import {Home} from './pages/Home';
import Workspace from './pages/WorkSpace';
import TaskDetails from './components/boardCmps/taskDetailsCmp/TaskDetails.jsx';
import {getLocalData} from './services/storageService.js';
import {fetchBoardById} from './redux/BoardSlice.js';
import fetchCurrentUser from './services/backendCallsUsers.js';
import { Boards } from './pages/Boards.jsx';


function App() {
  const dispatch = useDispatch();
  
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    async function load() {
      try {
        const me = await fetchCurrentUser();
        setUser(me);
      } catch (err) {
        console.log('there is error on loading users', err);
        return err;
      }
    }

    load();})
  
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
         <Route path={`/u/${user?.fullname}/boards`} element={<Boards />} />
        <Route path="/b/:boardId/:boardName/*" element={<Workspace />}>
        <Route path=":taskId" element={<TaskDetails />} />
        </Route>

        </Routes>
      </div>
    </BrowserRouter>
  


  )
}

export default App
