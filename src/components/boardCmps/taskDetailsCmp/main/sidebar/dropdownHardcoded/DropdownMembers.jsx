import React, { useState } from 'react';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../../../redux/taskDetailsSlice';

const DropdownMembers = ({ onClose }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const boardMembers = useSelector((state) => state.boardReducer.boardMembers) || [];
  const taskMembers = Array.isArray(task?.members) ? task.members : [];

  const availableBoardMembers = boardMembers.filter(
    (bm) => !taskMembers.some((tm) => tm?._id?.toLowerCase() === bm?._id?.toLowerCase())
  );

  const filterTaskMembers = taskMembers.filter((member) =>
    member?.title?.toLowerCase().includes(searchTerm)
  );
  const filterBoardMembers = availableBoardMembers.filter((member) =>
    member?.title?.toLowerCase().includes(searchTerm)
  );

  const hasMatches = filterTaskMembers.length > 0 || filterBoardMembers.length > 0;

  const handleAddMember = (memberToAdd) => {
    if (!task) return;
    const updatedMembers = [...taskMembers.map((m) => m._id), memberToAdd._id];

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        members: updatedMembers,
      })
    );
  };

  const handleDeleteMember = (memberToDelete) => {
    if (!task) return;
    const updatedMembers = taskMembers
      .map((m) => m._id)
      .filter((id) => id.toLowerCase() !== memberToDelete._id.toLowerCase());

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        members: updatedMembers,
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
      <div className="DropdownOptions">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          placeholder="Search Members"
          style={{ padding: '13px' }}
        />

        {!hasMatches ? (
          <p className="noResult">No results</p>
        ) : (
          <>
            {filterTaskMembers.length > 0 && (
              <>
                <div className="DropdownMembers">
                  <h3 className="DropdownMembersh3">Card members</h3>
                </div>
                {filterTaskMembers.map((member) => (
                  <button
                    onClick={() => handleDeleteMember(member)}
                    key={member._id}
                    className="DropdownButton">
                    <img className="memberIcon" alt={`Member ${member._id}`} src={member.icon} />
                    <div className="memberTitle">{member.title}</div>
                    <span>
                      <SvgClose />
                    </span>
                  </button>
                ))}
              </>
            )}

            {filterBoardMembers.length > 0 && (
              <>
                <div className="DropdownMembers">
                  <h3 className="DropdownMembersh3">Board members</h3>
                </div>
                {filterBoardMembers.map((member) => (
                  <button
                    onClick={() => handleAddMember(member)}
                    key={member._id}
                    className="DropdownButton">
                    <img className="memberIcon" alt={`Member ${member._id}`} src={member.icon} />
                    <div style={{ width: '220px' }} className="memberTitle">
                      {member.title}
                    </div>
                  </button>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DropdownMembers;
