import React from "react";
import { SvgServices } from "../../../../services/svgServices";

const TaskDetailsActivity = () => {
    return(
    <div style={{ padding: "16px", paddingTop: "-34px" }}>
      <section>
        <div style={{ position: "relative", marginLeft: "-32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                  marginRight: "8px",
                  marginTop: "-8px",
                }}><SvgServices name='SvgActivity'/></div>
              
              <div style={{ fontWeight: "bold", fontSize: "14px", color: "#172b4d", marginBottom: "12px" }}>
                Activity
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              
                
             
              <button
                className="notification-button"
                style={{
                  display: "inline-flex",
                  boxSizing: "border-box",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px 12px",
                  borderRadius: "3px",
                  textDecoration: "none",
                  whiteSpace: "normal",
                  border: "none",
                  boxShadow: "none",
                  color: "#172b4d",
                  fontWeight: 500,
                  transitionProperty: "background-color, border-color, box-shadow",
                  transitionDuration: "85ms",
                  transitionTimingFunction: "ease",
                  gap: "8px",
                  marginTop: "-3px", 
                  marginRight: '-15px'
                }}
                
                
              >
                Delete
              </button>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginTop: "8px" }}>
  
            
          </div>
        </div>


        
      </section>
    </div>
  );
};
export default TaskDetailsActivity;