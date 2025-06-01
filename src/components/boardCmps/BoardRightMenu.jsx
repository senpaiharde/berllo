import { toggleRightMenuOpen } from "../../redux/BoardSlice"
import { SvgServices } from "../../services/svgServices"
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "../IconButton"
export function BoardRightMenu() {
    const dispatch = useDispatch()
    const board = useSelector((state) => state.boardReducer)
    const displayMenu = board.rightMenuOpen ? "board-right-menu-show-menu":"" 
    function exitMenu(){
        dispatch(toggleRightMenuOpen(false))
    }
  return (
    <div className={`board-right-menu-wrapper ${displayMenu}`}>
      <div className="board-right-menu-container">
        <header className="board-right-menu-header-wrapper">
          <div className="board-right-menu-header-container">
            <h3 className="board-right-menu-header-title">Menu</h3>
            <button
              className="share-page-close-button"
            //   style={{width:"32px", height:"32px"}}
              onClick={() => exitMenu()}
            >
                <IconButton iconSize={"16px"} centerd={true}>
                    <path fiilRule="evenodd" clipRule="evenodd" d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z" fill="currentColor"></path>
                </IconButton>
              {/* <SvgServices size={2} name="SvgcloseTop" /> */}
            </button>
          </div>
          <hr class="header-hr"></hr>
        </header>
        <section className="board-right-menu-content-wrapper"></section>
      </div>
    </div>
  )
}
