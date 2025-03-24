



import './styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchWorkSpaces} from './redux/WorkSpaceSlice.js';
import {Login} from './pages/Login';
import {Home} from './pages/Home';
import Workspace from './pages/WorkSpace';


function App() {
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(fetchWorkSpaces());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <div>
        
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/b/:boardId/:boardSlug" element={<Workspace />} />
        </Routes>
      </div>
    </BrowserRouter>
  


  )
}

export default App
