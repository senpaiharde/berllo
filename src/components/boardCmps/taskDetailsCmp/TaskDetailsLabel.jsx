


import React from "react";
import '../../../styles/taskDetailsFolder/TaskDetailsLabel.scss';
const TaskDetailsLabel = () => {
    const labels = [
        { title: "dsgsg", color: "#42d23a" },
        { title: "", color: "orange" },
        { title: "", color: "red" },
        { title: "", color: "mediumpurple" },
        { title: "", color: "royalblue" },
    ];

    return(
        <section className="td-section-top-section">
            <h3 className="td-section-top-h3">labels</h3>
            <div className="td-section-label" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {labels.map((template, index) => (
                    <div key={index} 
                    className="td-section-label-color"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent:'center',
                        position: 'relative',
                        boxSizing: 'border-box',
                        height: '32px',
                        minWidth: '48px',
                        maxWidth: '100%',
                        marginBottom: 0,
                        paddingLeft:'1px',
                        padding: '15px 8px',
                        overflow: 'hidden',
                        borderRadius: '3px',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '28px',
                        textAlign: 'left',
                        backgroundColor: '#e0e0e0',
                        color: 'black',
                      }}>
                        <span 
                        style={{
                            backgroundColor: template.color,
                            position: 'absolute', // Use absolute positioning
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '3px',
                          }}>

              </span>
              <div style={{ marginLeft: '8px', zIndex: 1 }}>{template.title}</div>
                    </div>
                ))}
                <button
          className="td-section-members-add"
          style={{
            marginRight: '8px',
            padding: '3px 4px',
            border: 'none',
            justifyContent: 'center',
            display: 'inline-flex',
            height: '30px',
            width: '30px',
            lineHeight: '14px',
            fontSize: '10px',
            alignItems: 'center',
            borderRadius: '3px'
          }}
        >
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <path d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z" />
          </svg>
        </button>
            </div>
        </section>
    );
};

export default TaskDetailsLabel;