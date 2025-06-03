import React, { use, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useRef } from 'react';
import { SvgServices } from '../services/svgServices';



import { useNavigate } from 'react-router-dom';

const BoardsCreateDropdown = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [workSpace, setWorkSpace] = useState();
  const [boardTitle, setBoardTitle] = useState(null);
  const [loading, setLoading] = useState(false);

  const [backGround, setBackGround] = useState('');
  const [color, setColor] = useState('');

  const newBoardStyle = {
    boardType: 'image',
    boardColor: color,
    boardImg: backGround,
  };
  async function createNewboard() {
    setLoading(true);

    const token = localStorage.getItem('token');
    try {
      const resp = await fetch('http://localhost:4000/board/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boardTitle: `${boardTitle}`,
          boardStyle: newBoardStyle,
        }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.error || 'Failed To create Board!.');
      }
      const board = await resp.json();
      console.log('board created', board);

      navigate(`/b/${board._id}/${board.boardTitle}`);
    } catch (err) {
      console.log('Error creating board:', err);
    }

    console.log('before load workSpace', workSpace);

    setLoading(false);

    console.log('workSpace', workSpace);
  }

  function functiondaddy(value, colors) {
    setColor(colors);
    setBackGround(value);
    console.log(backGround);
    console.log(color);
  }
  return (
    <div className="DropdownUi" onMouseDown={(e) => e.stopPropagation()}>
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Create board</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgServices name="SvgClose" />
        </button>
      </div>

      {/* Options */}
      <div style={{ grid: 'none' }} className="DropdownLabelOption">
        <div className="ImgDropdown">
          <div
            style={{ backgroundImage: `url(${backGround})` }}
            className="ImgDropdownInside"></div>
        </div>
        <h3 className="DropdownLabelH3">Background</h3>
        <div>
          <ul className="IMGBoardDropdown">
            <li className="IMGBoardDropdownInside">
              <button
                onClick={() => {
                  functiondaddy(
                    'https://images.unsplash.com/photo-1748372928120-6543f1c68da0?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    '#7a4203'
                  );
                }}
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1748372928120-6543f1c68da0?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                }}
                className="IMGBoardDropdownButton"></button>
            </li>
            <li className="IMGBoardDropdownInside">
              <button
                onClick={() => {
                  functiondaddy(
                    'https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    '#41586e'
                  );
                }}
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1748372928129-5d6cbc4729b9?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                }}
                className="IMGBoardDropdownButton"></button>
            </li>
            <li className="IMGBoardDropdownInside">
              <button
                onClick={() =>
                  functiondaddy(
                    'https://images.unsplash.com/photo-1748632799967-63f8c53d69c1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    '#41586e'
                  )
                }
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1748632799967-63f8c53d69c1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                }}
                className="IMGBoardDropdownButton"></button>
            </li>
            <li className="IMGBoardDropdownInside">
              <button
                onClick={() =>
                  functiondaddy(
                    'https://images.unsplash.com/photo-1748719151811-60692f7f439c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    '#74411d'
                  )
                }
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1748719151811-60692f7f439c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                }}
                className="IMGBoardDropdownButton"></button>
            </li>
          </ul>
          <ul className="IMGBoardDropdown">
            <li className="ColorBoardDropdownInside">
              <button
                onClick={() =>
                  functiondaddy('https://trello.com/assets/13425f9db06517de0f7f.svg', '#dceafe')
                }
                style={{
                  backgroundColor: '#dceafe',
                  backgroundImage: 'url(https://trello.com/assets/13425f9db06517de0f7f.svg)',
                }}
                className="IMGBoardDropdownButton"></button>
            </li>
            <li className="ColorBoardDropdownInside">
              <button
                onClick={() =>
                  functiondaddy('https://trello.com/assets/707f35bc691220846678.svg', '#228cd5')
                }
                style={{
                  backgroundColor: '#228cd5',
                  backgroundImage: 'url(https://trello.com/assets/707f35bc691220846678.svg)',
                }}
                className="IMGBoardDropdownButton"></button>
            </li>
            <li className="ColorBoardDropdownInside">
              <button
                onClick={() =>
                  functiondaddy('https://trello.com/assets/d106776cb297f000b1f4.svg', '#0b50af')
                }
                style={{
                  backgroundColor: '#0b50af',
                  backgroundImage: 'url(https://trello.com/assets/d106776cb297f000b1f4.svg)',
                }}
                className="IMGBoardDropdownButton"></button>
            </li>
            <li className="ColorBoardDropdownInside">
              <button
                onClick={() =>
                  functiondaddy('https://trello.com/assets/8ab3b35f3a786bb6cdac.svg', '#674284')
                }
                style={{
                  backgroundColor: '#674284',
                  backgroundImage: 'url(https://trello.com/assets/8ab3b35f3a786bb6cdac.svg)',
                }}
                className="IMGBoardDropdownButton"></button>
            </li>
            <li className="ColorBoardDropdownInside">
              <button
                onClick={() =>
                  functiondaddy('https://trello.com/assets/a7c521b94eb153008f2d.svg', '#a869c1')
                }
                style={{
                  backgroundColor: '#a869c1',
                  backgroundImage: 'url(https://trello.com/assets/a7c521b94eb153008f2d.svg)',
                }}
                className="IMGBoardDropdownButton"></button>
            </li>
            <li className="ColorBoardDropdownInside">
              <button
                style={{ color: 'black', fontSize: '16px' }}
                className="IMGBoardDropdownButton">
                +
              </button>
            </li>
          </ul>
        </div>
        <h3 className="DropdownLabelH3">Board title</h3>
        <input
          required
          onChange={(e) => setBoardTitle(e.target.value)}
          value={boardTitle}
          className="EditDropdownInputBoard"
          style={{}}
          placeholder="Search labels..."
        />
        <p className="TextBoardDropdown">
          <span style={{ marginRight: '4px' }}>👋</span> Board title is required
        </p>
        <h3 className="DropdownLabelH3">Workspace</h3>
        <label className="BoardReminder">
          <div className="BoardReminderDiv">
            <div className="BoardReminderDivText">
              <div className="BoardReminderDivText2">Berllo Workspace</div>
            </div>
            <div className="BoardReminderDivSVG">
              <span className="BoardReminderDivSVG2">
                <SvgServices name="SvgDropdown" />
              </span>
            </div>
          </div>
        </label>
        <h3 className="DropdownLabelH3">visibility</h3>
        <label className="BoardReminder">
          <div className="BoardReminderDiv">
            <div className="BoardReminderDivText">
              <div className="BoardReminderDivText2">Workspace</div>
            </div>
            <div className="BoardReminderDivSVG">
              <span className="BoardReminderDivSVG2">
                <SvgServices name="SvgDropdown" />
              </span>
            </div>
          </div>
        </label>
        <button
          disabled={loading}
          style={{ marginTop: '10px' }}
          onClick={() => createNewboard()}
          className="DropdownLabelButton">
          {loading ? 'Creating…' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default BoardsCreateDropdown;
