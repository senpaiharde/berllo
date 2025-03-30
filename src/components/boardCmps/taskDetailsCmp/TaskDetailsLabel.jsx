


import React from "react";

const TaskDetailsLabel = () => {
    const labels = [
        { title: "dsgsg", color: "orange" },
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
                        position: 'relative',
                        boxSizing: 'border-box',
                        height: '28px',
                        minWidth: '48px',
                        maxWidth: '100%',
                        marginBottom: 0,
                        padding: '0 8px',
                        overflow: 'hidden',
                        borderRadius: '3px',
                        fontSize: '13px',
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
                        <div style={{ marginLeft: '8px' }}>{template.title}</div>
                    </div>
                ))}
                <button className="td-section-members-add"
                
                
                >
                    <img alt="add Label" style={{ width: '24px', height: '24px' }}/>
                </button>
            </div>
        </section>
    );
};

export default TaskDetailsLabel;