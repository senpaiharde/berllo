import React from "react";

const TaskDetailsDate = () => {
    return (
        <section className="td-section-top-section">
                <h3 className="td-section-top-h3">Due date</h3>
                <div>
                <button className="notification-button"
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
            }}
          >
                        <span>2 Apr, 13:15</span>
                        <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "-5px",
                }}
              >
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  style={{
                    overflow: "hidden",
                    pointerEvents: "none",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    color: "var(--icon-primary-color)",
                    fill: "var(--icon-secondary-color)",
                    verticalAlign: "middle", // Center vertically
                  }}
                >
                  <path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" />
                </svg>
              </span>
            </span>
                    </button>
                </div>
            </section>
    )

}
export default TaskDetailsDate;