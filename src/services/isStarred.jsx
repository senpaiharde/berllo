import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toggleStar } from '../services/userService'; 


export default function StarButton({ boardId, initialIsStarred, onToggle }) {
  const [isStarred, setIsStarred] = useState(initialIsStarred);
  const [loading, setLoading]   = useState(false);

  const handleClick = async () => {
    if (loading) return;
    const newState = !isStarred;
    setIsStarred(newState);          
    setLoading(true);
    try {
      await toggleStar(boardId, newState);
      onToggle?.(newState);
    } catch (err) {
      console.error('Failed to toggle star:', err);
      setIsStarred(!newState);       
    } finally {
      setLoading(false);
    }
  };

  return (
    <span
      className={`star-button ${isStarred ? 'starred' : 'unstarred'}${loading ? ' loading' : ''}`}
      onClick={handleClick}
      role="button"
      aria-pressed={isStarred}
      aria-label={isStarred ? 'Unstar board' : 'Star board'}
    >
      {isStarred ? '★' : '☆'}
    </span>
  );
}

