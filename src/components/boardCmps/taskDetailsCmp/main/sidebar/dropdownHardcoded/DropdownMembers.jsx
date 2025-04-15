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
  
 
   
  const availableBoardMembers = boardMembers.filter(
    (bm) => !taskMembers.some((tm) => tm._id.toLowerCase() === bm._id.toLowerCase())
  );

    const handleAddMember = (memberToAdd) => {
        if(!task) return;
        const updatedMembers = [...taskMembers,memberToAdd]
        dispatch(liveUpdateTask({
            ...task,
            taskMembers:updatedMembers
        }))

    }


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
        {availableBoardMembers.map((member) => {
          return (
            <button  onClick={() => {handleAddMember(member)}} key={member.title} className="DropdownButton">
              <img className="memberIcon" alt={`Members ${member.id}`} src={member.icon} />
              <div style={{width:'220px'}} className="memberTitle"> {member.title}</div>
              
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownMembers;
