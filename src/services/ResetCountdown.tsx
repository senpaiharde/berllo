
import React, { useState, useEffect } from 'react';

const ResetCountdown = () => {

  const getNextWipe = () => {
  const now  = new Date();
  const next = new Date(now);

  if (now.getMinutes() < 30) {
    next.setMinutes(30, 0, 0);
  } else {
    next.setHours(now.getHours() + 1);
    next.setMinutes(0, 0, 0);
  }
  return next;
};

const fmt = (ms) => {
  const sec = Math.max(0, Math.floor(ms / 1000));
  const m   = String(Math.floor(sec / 60)).padStart(2, '0');
  const s   = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
};

const [timeLeft, setTimeLeft] = useState(
  fmt(getNextWipe().getTime() - Date.now())   // ← .getTime()
  
);
  const [hover,setHover]    = useState(false);

useEffect(() => {
  const id = setInterval(() => {
    const msLeft = getNextWipe().getTime() - Date.now();   // ← .getTime()
    setTimeLeft(fmt(msLeft));
  }, 1000);
  return () => clearInterval(id);
}, []);

 
  const wrapperStyle = {
    display:      'inline-flex',
    alignItems:   'center',
    fontSize:     14,
    color:        hover ? '#0052cc' : 'white',  // Trello blue on hover
    cursor:       'pointer',
    transition:   'color .2s ease',
  };

  const timeStyle = { fontWeight: 600 };

  
  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title="Hello dear user, this timer wipes any change that you make inside our site, so you can play—add/remove anything you like. Good luck!"
    >
      ⟳ reset in&nbsp;
      <span style={timeStyle}>{timeLeft}</span>
    </div>
  );
};

export default ResetCountdown;
