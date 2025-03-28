export function IconButton({ label, children }) {
  return (
    <button className="icon-container-button">
      <span className="icon-grid">
        <svg className="icon-svg" width="24" height="24">
          {children} 
        </svg>
        {label && <span className="icon-label">{label}</span>}
      </span>
      
    </button>
  )
}