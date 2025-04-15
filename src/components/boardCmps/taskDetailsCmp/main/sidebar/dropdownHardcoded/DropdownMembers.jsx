import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../../../redux/taskDetailsSlice';

const DropdownMembers = ({ trigger, onClose }) => {
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

  const boardMembers = useSelector((state) => state.boardReducer.boardMembers) || [];
  const member = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const taskMembers = Array.isArray(member?.taskMembers) ? member.taskMembers : [];
  const [members, setMembers] = useState([]);
  const [boardNembers, setBoardMembers] = useState([]);
  const dispatch = useDispatch();


  const memberList = [
    ...boardMembers,
    ...taskMembers.filter(
        (mem) =>
            !boardMembers.some((lbl) => lbl._id.toLowerCase() === mem._id.toLowerCase())
    )
    .map((label) => ({
        icon : label.icon,
        title: label.title,
        _id : label._id

    }))
  ];
  useEffect(() => {
    const hardMembers = taskMembers;
    const HardboardMembers = boardMembers;
    console.log(boardMembers);
    setBoardMembers(HardboardMembers);

    setMembers(hardMembers);
  }, []);

  const handleDeleteMember = (member) => {
    if (!task) return;

    const updateMember = members.filter(
      (mem) => mem._id.toLowerCase() !== member._id.toLowerCase()
    );

    dispatch(
      liveUpdateTask({
        ...task,
        taskMembers: updateMember,
      })
    );
  };

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
        {members.map((member) => {
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
        {boardNembers.map((member) => {
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
