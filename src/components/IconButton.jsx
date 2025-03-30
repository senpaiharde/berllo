export function IconButton({ label, children, backgColor,textColor }) {
  if(textColor){
    console.log("label textColor",label,textColor)
  }
  return (
    <button className="icon-container-button" style={{backgroundColor: backgColor}}>
      <span className="icon-grid">
        <svg className="icon-svg" width="24" height="24">
          {children} 
        </svg>
        {label && <span className="icon-label" style={{color: textColor}}>{label}</span>}
      </span>
      
    </button>
  )
}