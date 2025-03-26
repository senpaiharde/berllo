import { IconButton } from "./IconButton"

export function ViewTypeChooser({togglePressed}) {
  return (
    <div className="chooser-container header-clickable" onClick={(e) => togglePressed(e.currentTarget)}>
      <div style={{ display: "flex", gap:"4px"}}>
        <div className="header-clickable" onClick={(e) => togglePressed(e.currentTarget,"board")}>
          <IconButton></IconButton>
          <span>Board</span>
        </div>
        <div className="header-clickable" onClick={(e) => togglePressed(e.currentTarget,"choose")}>
          <IconButton path="M 11.2929 16.7071 L 4.22185 9.63606 C 3.83132 9.24554 3.83132 8.61237 4.22185 8.22185 C 4.61237 7.83133 5.24554 7.83133 5.63606 8.22185 L 12 14.5858 L 18.364 8.22185 C 18.7545 7.83132 19.3877 7.83132 19.7782 8.22185 C 20.1687 8.61237 20.1687 9.24554 19.7782 9.63606 L 12.7071 16.7071 C 12.3166 17.0977 11.6834 17.0977 11.2929 16.7071 Z"></IconButton>
        </div>
      </div>
    </div>
  )
}
