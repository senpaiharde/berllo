import React, { useState } from 'react';

import { toggleStar } from './backendHandler';

export default function StarButton({ boardId, initialIsStarred, onToggle }) {
  const [isStarred, setIsStarred] = useState(initialIsStarred);

  const handleClick = async () => {
    const newState = !isStarred;
    setIsStarred(newState);
    try {
      await toggleStar(boardId, newState);
      onToggle?.(newState);
    } catch (err) {
      console.error('Failed to toggle star:', err);
      setIsStarred(!newState); 
    }
  };

  return (
    <div className="IstarredCover">
    <div className="Istarred">
      <button
        className="IstarredButton"
        onClick={handleClick}
        aria-pressed={isStarred}
        aria-label={isStarred ? 'Unstar board' : 'Star board'}
      >
        {isStarred ? (
          <span className="IstarredInside">
            <span
            className="IstarredTrue"
              
              style={{
               color: '#E2B203',
                fill:'inherit', 
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="IstarredInsideSvg">
               <path
                  d="M11.9999 18.6266L7.49495 20.995C6.739 21.3924 5.80401 21.1018 5.40658 20.3459C5.24833 20.0448 5.19372 19.7 5.25121 19.3649L6.11158 14.3485L2.46699 10.7959C1.85542 10.1998 1.84291 9.22074 2.43904 8.60917C2.67643 8.36564 2.98747 8.20715 3.32403 8.15825L8.36072 7.42637L10.6132 2.86236C10.9912 2.0965 11.9184 1.78206 12.6843 2.16003C12.9892 2.31054 13.2361 2.55739 13.3866 2.86236L15.6391 7.42637L20.6758 8.15825C21.5209 8.28106 22.1065 9.06576 21.9837 9.91094C21.9348 10.2475 21.7763 10.5585 21.5328 10.7959L17.8882 14.3485L18.7486 19.3649C18.893 20.2066 18.3276 21.006 17.4859 21.1504C17.1507 21.2079 16.8059 21.1533 16.5049 20.995L11.9999 18.6266Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </span>
        ) : (
          <span className="IstarredInside">
            <span
              
              className="IstarredFalse"
              style={{
                color: '#44546F',
                fill:'inherit'
              }}
            >
              <svg  width="24" height="24" viewBox="0 0 24 24" className="IstarredInsideSvg">
                <path
                  fillRule="nonzero"
                  clipRule="evenodd"
                
                  d="M7.49495 20.995L11.9999 18.6266L16.5049 20.995C16.8059 21.1533 17.1507 21.2079 17.4859 21.1504C18.3276 21.006 18.893 20.2066 18.7486 19.3649L17.8882 14.3485L21.5328 10.7959C21.7763 10.5585 21.9348 10.2475 21.9837 9.91094C22.1065 9.06576 21.5209 8.28106 20.6758 8.15825L15.6391 7.42637L13.3866 2.86236C13.2361 2.55739 12.9892 2.31054 12.6843 2.16003C11.9184 1.78206 10.9912 2.0965 10.6132 2.86236L8.36072 7.42637L3.32403 8.15825C2.98747 8.20715 2.67643 8.36564 2.43904 8.60917C1.84291 9.22074 1.85542 10.1998 2.46699 10.7959L6.11158 14.3485L5.25121 19.3649C5.19372 19.7 5.24833 20.0448 5.40658 20.3459C5.80401 21.1018 6.739 21.3924 7.49495 20.995ZM19.3457 10.0485L15.6728 13.6287L16.5398 18.684L11.9999 16.2972L7.45995 18.684L8.327 13.6287L4.65411 10.0485L9.72993 9.31093L11.9999 4.71146L14.2699 9.31093L19.3457 10.0485Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </span>
        )}
      </button>
    </div>
    </div>
  );
}

