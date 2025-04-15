import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DropdownMembers from './main/sidebar/dropdownHardcoded/DropdownMembers';
import SvgAddMember from '../../../assets/svgDesgin/SvgAddMember';
import DropdownUi from './main/sidebar/dropdownHardcoded/DropdownUi';
const TaskDetailsMembers = () => {
  const boardUsers = useSelector((state) => state.boardReducer?.boardMembers) || [];
  const member = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const taskMembers =  Array.isArray(member?.taskMembers) ? member.taskMembers : [];
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const hardMembers = taskMembers
    console.log(hardMembers)

    setMembers(hardMembers);
  }, []);

  return (
    <section className="td-section-top-section">
      {<h3 className="td-section-top-h3">Members</h3>}
      <div
        className="td-section-members"
        style={{
          paddingLeft: '0px',
        }}>
        <div className="members-icon" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {members.map((member) => {
            return (
              <button key={member.id} className="td-section-members-button">
                <img
                  src={member.icon}
                  alt={`Members ${member.id}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '100%',
                  }}
                />
              </button>
            );
          })}
          <DropdownUi
            trigger={
              <button className="td-section-members-addd">
                <SvgAddMember />
              </button>
            }>
            {(props) => <DropdownMembers {...props} taskMembers={taskMembers}/>}
          </DropdownUi>
        </div>
      </div>
    </section>
  );
};

export default TaskDetailsMembers;
