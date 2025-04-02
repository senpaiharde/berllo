import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { liveUpdateTask } from "../../../../redux/TaskDetailsSlice";

const generateId = () => Math.random().toString(36).substr(2, 9);

const TaskChecklist = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const [hideChecked, setHideChecked] = useState(false);

  if (!selectedTask) return null;

  const checklistItems = selectedTask.taskCheckList || [];

  const completedItems = checklistItems.filter((item) => item.isDone).length;
  const totalItems = checklistItems.length;
  const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const visibleItems = hideChecked ? checklistItems.filter((item) => !item.isDone) : checklistItems;

  const handleToggleCheck = (id) => {
    dispatch(
      liveUpdateTask({
        taskCheckList: checklistItems.map((item) =>
          item.id === id ? { ...item, isDone: !item.isDone } : item
        ),
      })
    );
  };

  const handleEditText = (id, text) => {
    dispatch(
      liveUpdateTask({
        taskCheckList: checklistItems.map((item) =>
          item.id === id ? { ...item, text } : item
        ),
      })
    );
  };

  const handleDeleteItem = (id) => {
    dispatch(
      liveUpdateTask({
        taskCheckList: checklistItems.filter((item) => item.id !== id),
      })
    );
  };

  const handleAddItem = () => {
    const newItem = {
      id: generateId(),
      text: "New Item",
      isDone: false,
    };
    dispatch(
      liveUpdateTask({
        taskCheckList: [...checklistItems, newItem],
      })
    );
  };

  return (
    <div style={{ padding: "16px", paddingTop: "-34px" }}>
      <section>
        <div style={{ position: "relative", marginLeft: "-30px" }}>
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
                  marginLeft:'-2px',
                  marginRight: "14px",
                  marginTop: "-8px",
                  marginBottom:'10px'
                }}
              >
                <path d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13V18H6V6L16 6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H6ZM8.73534 10.3223C8.36105 9.91618 7.72841 9.89038 7.3223 10.2647C6.91619 10.639 6.89039 11.2716 7.26467 11.6777L10.8768 15.597C11.4143 16.1231 12.2145 16.1231 12.7111 15.6264L13.0754 15.2683C13.3699 14.9785 13.6981 14.6556 14.0516 14.3075C15.0614 13.313 16.0713 12.3169 17.014 11.3848L17.0543 11.3449C18.7291 9.68869 20.0004 8.42365 20.712 7.70223C21.0998 7.30904 21.0954 6.67589 20.7022 6.28805C20.309 5.90022 19.6759 5.90457 19.2881 6.29777C18.5843 7.01131 17.3169 8.27244 15.648 9.92281L15.6077 9.96263C14.6662 10.8937 13.6572 11.8889 12.6483 12.8825L11.8329 13.6851L8.73534 10.3223Z" />
              </svg>
              <div style={{ fontWeight: "500", fontSize: "14px", color: "#172b4d", marginBottom: "12px" ,}}>
                Checklist
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                className="notification-button"
                style={{ marginRight: "8px" }}
                onClick={() => setHideChecked(!hideChecked)}
              >
                {hideChecked ? "Show Checked items" : "Hide Checked items"}
              </button>
              <button
                className="notification-button"
                onClick={() => dispatch(liveUpdateTask({ taskCheckList: [] }))}
              >
                Delete
              </button>
            </div>
          </div>


          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginTop: "8px" ,width:'495px',paddingLeft:'' }}>
            <div style={{ marginRight: "12px",marginLeft:'2px', fontSize: "10px" }}>{completionPercentage.toFixed(0)}%</div>
            <div style={{ width: "100%", height: "5px", backgroundColor: "#e0e0e0", borderRadius: "4px", maxWidth: "100%" }}>
              <div style={{ width: `${completionPercentage}%`, height: "5px", backgroundColor: "#44546F", borderRadius: "4px",
               transition: "width 0.3s ease-in-out" }} />
            </div>
          </div>
        </div>

        {visibleItems.map((item) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", marginTop: "8px", marginLeft: "-28px" }}>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={() => handleToggleCheck(item.id)}
              style={{ marginRight: "18px" ,cursor:'pointer',}}
            />
            <div style={{ position: "relative", flex: 1 }}>
              <input
                type="text"
                value={item.text || ""}
                onChange={(e) => handleEditText(item.id, e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  textDecoration: item.isDone ? "line-through" : "none",
                  filter: '',
                  width: "100%",
                  cursor:'pointer',
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid #388bff";
                  e.target.style.boxShadow = "0 0 0 2px #388bff33";
                }}
                onBlur={(e) => {
                  e.target.style.border = "none";
                  e.target.style.boxShadow = "none";
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "rgba(0, 0, 0, 0.05)")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              />
              <button
                style={{ position: "absolute",  fontSize: "10px" }}
                onClick={() => handleDeleteItem(item.id)}
              >x</button>
            </div>
          </div>
        ))}



        <button
          className="notification-button"
          style={{ marginTop: "20px" }}
          onClick={handleAddItem}
        >
          Add an item
        </button>
      </section>
    </div>
  );
};



export default TaskChecklist;