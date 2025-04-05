import React from "react";
import '../../../styles/taskDetailsFolder/TaskDetailsNotifications.scss';
const TaskDetailsNotifcations = () => {

    return (
        <section className="td-section-top-section">
        <h3 className="td-section-top-h3">Notifications</h3>
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
              height:'32px',
              width:'128px',
              border: "none",
              
              boxShadow: "none",
              color: "#172b4d",
              fontWeight: 500,
              transitionProperty: "background-color, border-color, box-shadow",
              transitionDuration: "85ms",
              transitionTimingFunction: "ease",
              gap: "8px", // Add gap between elements
            }}
          >
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
                  <path d="M12.0006 18C7.46367 18 4.00142 13.74 4.00142 12C4.00142 9.999 7.45967 6 12.0006 6C16.3775 6 19.9988 9.973 19.9988 12C19.9988 13.74 16.5366 18 12.0006 18ZM12.0006 4C6.48003 4 2.00012 8.841 2.00142 12C2.00012 15.086 6.5771 20 12.0006 20C17.4241 20 22.0001 15.086 22.0001 12C22.0001 8.841 17.5212 4 12.0006 4ZM11.9775 13.9844C10.8745 13.9844 9.97752 13.0874 9.97752 11.9844C9.97752 10.8814 10.8745 9.9844 11.9775 9.9844C13.0805 9.9844 13.9775 10.8814 13.9775 11.9844C13.9775 13.0874 13.0805 13.9844 11.9775 13.9844ZM11.9775 7.9844C9.77152 7.9844 7.97752 9.7784 7.97752 11.9844C7.97752 14.1904 9.77152 15.9844 11.9775 15.9844C14.1835 15.9844 15.9775 14.1904 15.9775 11.9844C15.9775 9.7784 14.1835 7.9844 11.9775 7.9844Z" />
                </svg>
              </span>
            </span>
            Watching
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "-5px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  <path d="M6.73534 12.3223C6.36105 11.9162 5.72841 11.8904 5.3223 12.2647C4.91619 12.639 4.89039 13.2716 5.26467 13.6777L8.87678 17.597C9.41431 18.1231 10.2145 18.1231 10.7111 17.6264C10.7724 17.5662 10.7724 17.5662 11.0754 17.2683C11.3699 16.9785 11.6981 16.6556 12.0516 16.3075C13.0614 15.313 14.0713 14.3169 15.014 13.3848L15.0543 13.3449C16.7291 11.6887 18.0004 10.4236 18.712 9.70223C19.0998 9.30904 19.0954 8.67589 18.7022 8.28805C18.309 7.90022 17.6759 7.90457 17.2881 8.29777C16.5843 9.01131 15.3169 10.2724 13.648 11.9228L13.6077 11.9626C12.6662 12.8937 11.6572 13.8889 10.6483 14.8825C10.3578 15.1685 10.0845 15.4375 9.83288 15.6851L6.73534 12.3223Z" />
                </svg>
              </span>
            </span>
          </button>
        </div>
      </section>
    );
  }
    

export default TaskDetailsNotifcations;