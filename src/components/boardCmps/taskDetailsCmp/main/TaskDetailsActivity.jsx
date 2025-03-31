import React from "react";

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
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                  marginRight: "8px",
                  marginTop: "-8px",
                }}
              >
                <path d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13V18H6V6L16 6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H6ZM8.73534 10.3223C8.36105 9.91618 7.72841 9.89038 7.3223 10.2647C6.91619 10.639 6.89039 11.2716 7.26467 11.6777L10.8768 15.597C11.4143 16.1231 12.2145 16.1231 12.7111 15.6264L13.0754 15.2683C13.3699 14.9785 13.6981 14.6556 14.0516 14.3075C15.0614 13.313 16.0713 12.3169 17.014 11.3848L17.0543 11.3449C18.7291 9.68869 20.0004 8.42365 20.712 7.70223C21.0998 7.30904 21.0954 6.67589 20.7022 6.28805C20.309 5.90022 19.6759 5.90457 19.2881 6.29777C18.5843 7.01131 17.3169 8.27244 15.648 9.92281L15.6077 9.96263C14.6662 10.8937 13.6572 11.8889 12.6483 12.8825L11.8329 13.6851L8.73534 10.3223Z" />
              </svg>
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