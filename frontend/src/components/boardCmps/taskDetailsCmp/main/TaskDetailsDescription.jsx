import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { liveUpdateTask } from "../../../../redux/TaskDetailsSlice";

const TaskDescription = () => {
  const dispatch = useDispatch();
  const taskDescription = useSelector((state) => state.taskDetailsReducer?.selectedTask?.taskDescription || "");
  
  const handleDescriptionChange = (e) => {
    dispatch(liveUpdateTask({ taskDescription: e.target.value }));

  };
  const isEmpty = taskDescription.trim() === '';
  const textareaClassName = isEmpty ? "td-description-null" : "td-description";
  return (
    <section className="td-section">
      <div style={{ display: "flex", alignItems: "center",marginTop:'-27px',marginLeft:'2px',marginBottom:'15px'}}>
        <svg
          width="22px"
          height="22px"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ marginRight: "12px", marginLeft: "-32px"
            , marginTop:'-14px'
           }} 
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H20C20.5523 11 21 10.5523 21 10C21 9.44772 20.5523 9 20 9H4ZM3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14ZM4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H4Z"
          />
        </svg>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: '100%' }}>
          <div className="td-section-header" style={{fontSize:'16px'}}>Description</div>


          {!isEmpty && (
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
            Edit
          </button>
          )}
        </div>
      </div>
      {handleDescriptionChange}
      <textarea
        className={textareaClassName}
        placeholder={isEmpty ? 'Add a more detailed description...' : ''}
        value={taskDescription}
        onChange={handleDescriptionChange}
        style={{
            marginLeft:'5px',
            backgroundColor: isEmpty ? "#eaecf0" : "#F7F8F9", // Light gray vs white
            border: "none",
            resize: "none",
            padding: "1px 1px",
            marginTop: "-2px",
            minHeight: "42px",
            borderRadius: "6px",
            width: "100%", 
            fontSize: "14px",
            color: "#172b4d",
            
            
        }}
      />
    </section>
  );
};

export default TaskDescription;