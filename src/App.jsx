





import './styles/main.scss';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {fetchWorkSpaces} from './redux/WorkSpaceSlice.js';
import {Login} from './pages/Login';
import {Home} from './pages/Home';
import Workspace from './pages/WorkSpace';
import TaskDetails from './components/boardCmps/taskDetailsCmp/TaskDetails.jsx';
import { Boards } from './pages/Boards.jsx';


function App() {
  const dispatch = useDispatch();
  
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <div style={{ height: "100%" }}>
        <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         <Route path={`/u/user/boards`} element={<Boards />} />
        <Route path="/b/:boardId/:boardName/*" element={<Workspace />}>
        <Route path=":taskId" element={<TaskDetails />} />
        </Route>


          <Route path="/b/:boardId/:boardName/*" element={<Workspace />}>
            <Route path=":taskId" element={<TaskDetails />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
