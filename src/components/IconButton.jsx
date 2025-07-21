export function IconButton({
  label,
  children,
  backgColor,
  textColor,
  iconSize,
  centerd,
  offset,
  alternativeViewBox,
  displayOnHover,
}) {
  const size = "16px"
  const iconGirdGap = label ? "2px" : "0px"
  const numericIconSize = parseInt(iconSize, 10) || 16
  const viewBox = alternativeViewBox ? alternativeViewBox : `0 0 24 24`
  const textcolor = textColor ? textColor : "currentColor"
  const buttonMargin = displayOnHover || centerd ? "" : "0px 4px 0 0"

  return (
    <button
      className={`icon-container-button ${displayOnHover ? "hidden-button" : ""}`}
      style={{ backgroundColor: backgColor, margin: buttonMargin }}
    >
      <span className="icon-grid" style={{ gridGap: iconGirdGap }}>
        <svg
          className="icon-svg"
          width={size}
          height={size}
          viewBox={viewBox}
          fill={textcolor}
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          {children}
        </svg>
        {label && (
          <span className="icon-label" style={{ color: textcolor }}>
            {label}
          </span>
        )}
      </span>
    </button>
  )
}
