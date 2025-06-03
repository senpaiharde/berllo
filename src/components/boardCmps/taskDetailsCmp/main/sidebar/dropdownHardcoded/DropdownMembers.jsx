import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../../../redux/TaskDetailsSlice';
import { SvgServices } from '../../../../../../services/svgServices';

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
    member?.fullname?.toLowerCase().includes(searchTerm)
  );
  const filterBoardMembers = availableBoardMembers.filter((member) =>
    member?.fullname?.toLowerCase().includes(searchTerm)
  );

  const hasMatches = filterTaskMembers.length > 0 || filterBoardMembers.length > 0;


  useEffect(() => {
   

   
      

       
     console.log(boardMembers)
  }, [dispatch]);

  const handleAddMember = (memberToAdd) => {
    if (!task) return;

    const updatedMembers = [
      ...taskMembers
        .filter((m) => m && typeof m === 'object' && m._id)
        .map((m) => ({
          _id: m._id,
          fullname: m.fullname,
          avatar: m.avatar,
        })),
      {
        _id: memberToAdd._id,
        fullname: memberToAdd.fullname,
        avatar: memberToAdd.avatar,
      },
    ];

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
      .filter(
        (m) =>
          m && typeof m === 'object' && m._id?.toLowerCase() !== memberToDelete._id?.toLowerCase()
      )
      .map((m) => ({
        _id: m._id,
        fullname: m.fullname,
        avatar: m.avatar,
      }));

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
            <SvgServices name='SvgClose'/>
          
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
                    <img className="memberIcon" alt={`Member ${member._id}`} src={member.avatar} />
                    <div className="memberTitle">{member.fullname}</div>
                    <span>
                        <SvgServices name='SvgClose'/>
                     
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
                    <img className="memberIcon" alt={`Member ${member._id}`} src={member.avatar} />
                    <div style={{ width: '220px' }} className="memberTitle">
                      {member.fullname}
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
