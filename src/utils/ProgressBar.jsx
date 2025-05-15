


import React from "react"

const ProgressBar = ({completionPercentage}) => {
    return(
        <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginTop: "6px" ,width:'545px',marginBottom:'3px' }}>
            <div style={{ marginRight: "15px",marginLeft:'1px', fontSize: "11px" }}>{completionPercentage.toFixed(0)}%</div>
            <div style={{ width: "100%", height: "5px", backgroundColor: "#e0e0e0", borderRadius: "4px", maxWidth: "100%" }}>
              <div style={{ width: `${completionPercentage}%`, height: "7px", backgroundColor: "#44546F", borderRadius: "4px",
               transition: "width 0.3s ease-in-out" }} />
            </div>
          </div>
        </>
    )
}

export default ProgressBar ;