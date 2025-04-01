export function IconButton({ label, children, backgColor ,textColor, iconSize, offset }) {
  if(textColor){
    // console.log("label textColor",label,textColor)
  }
  // const listClass = addListClass ? "add-a-card-button-list" : "";
  const size = iconSize ? iconSize : "14px";
  const numericIconSize = parseInt(iconSize, 10) || 14;
  const viewBoxSize = numericIconSize + 8;
  const vievboxOffset = offset? offset : 0;
  // const viewBox = `${-viewBoxSize / 2} ${-viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`;
  const viewBox = `${vievboxOffset} ${vievboxOffset+2} ${viewBoxSize} ${viewBoxSize}`;
  const backgroundColor = backgColor ? backgColor : "currentColor";
  
  return (
    <button className="icon-container-button" style={{backgroundColor: backgColor}}>
      <span className="icon-grid">
        <svg className="icon-svg" width={size}
            height={size}
            viewBox={viewBox}
            fill={backgroundColor}
            style={{ justifyContent: "center", display: "flex", alignItems: "center" }}>
          {children} 
        </svg>
        {label && <span className="icon-label" style={{color: textColor}}>{label}</span>}
      </span>
      
    </button>
  )
}