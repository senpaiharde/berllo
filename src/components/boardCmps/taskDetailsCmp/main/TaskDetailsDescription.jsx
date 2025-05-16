import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { liveUpdateTask } from "../../../../redux/TaskDetailsSlice";
import { SvgServices } from "../../../../services/svgServices";

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
         <div className="SvgLeft"
         style={{ marginRight: "12px", marginLeft: "-32px"
            , marginTop:'-14px'
           }} >
            <SvgServices 
         name="taskDetailsSvgLeft"/>
         </div>
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