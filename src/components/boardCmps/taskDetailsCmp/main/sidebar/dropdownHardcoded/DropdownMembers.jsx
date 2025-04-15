import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../../../redux/taskDetailsSlice';

const DropdownMembers = ({ trigger, onClose }) => {
    const dispatch = useDispatch();

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const boardMembers = useSelector((state) => state.boardReducer.boardMembers) || [];
  const taskMembers = Array.isArray(task?.taskMembers) ? task.taskMembers : [];
  
  const mergedMembers = [
    ...boardMembers,
    ...taskMembers.filter(
        (mem) => !boardMembers.some((bm) => bm._id.toLowerCase() === mem._id.toLowerCase())
    )
  ];

 const handleDeleteMember = (memberToDelete) => {
    if(!task) return;
    const updatedMembers = taskMembers.filter(
        (mem) => mem._id.toLowerCase() !== memberToDelete._id.toLowerCase()
    );
    dispatch(
        liveUpdateTask({
            ...task,
            taskMembers: updatedMembers,
        })
    );
 } ;

  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 className="DropdownHeaderH2">Members</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgClose />
        </button>
      </div>

      {/* Options */}
      <div className="DropdownOptions" style={{}}>
        <input placeholder="Search Members" style={{ padding: '13px' }} />
        <div className="DropdownMembers">
          <h3 className="DropdownMembersh3">Card members</h3>
        </div>
        {taskMembers.map((member) => {
          return (
            <button onClick={() => {handleDeleteMember(member)}} key={member.title} className="DropdownButton">
              <img className="memberIcon" alt={`Members ${member.id}`} src={member.icon} />
              <div className="memberTitle"> {member.title}</div>
              <span>
                <SvgClose />
              </span>
            </button>
          );
        })}

        <div className="DropdownMembers">
          <h3 className="DropdownMembersh3">board members</h3>
        </div>
        {boardMembers.map((member) => {
          return (
            <button key={member.title} className="DropdownButton">
              <img className="memberIcon" alt={`Members ${member.id}`} src={member.icon} />
              <div className="memberTitle"> {member.title}</div>
              
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownMembers;
