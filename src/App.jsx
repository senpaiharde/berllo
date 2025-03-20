


import './App.css';
import { Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div></div>


        <Routes>
        <Route path='' element={<Login/>} />
        </Routes>
    </Router>

  )
}

export default App
