export function IconButton({ path }) {


if(path) {
  // console.log("board",board)
  // console.log("board",board.boardTitle)
  // console.log("board",board.boardLists)
}
  return (
    
    <button className="star-container-button">
      <span className="star-container-starred-icon-container">
        <svg
          className="icon-svg"
          width="24"
          height="24"
          src="src/assets/TerlloIcons/asset-14.svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={path}
            fill="currentColor"
          ></path>
        </svg>
      </span>
    </button>
  )
}