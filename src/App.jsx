


import './App.css';
import './styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login} from './pages/Login';
import {Home} from './pages/Home';
import Workspace from './pages/WorkSpace';


function App() {
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
