import React from 'react';
import { useSelector } from 'react-redux';
import DropdownMembers from './main/sidebar/dropdownHardcoded/DropdownMembers';

import DropdownUi from './main/sidebar/dropdownHardcoded/DropdownUi';
import { SvgServices } from '../../../services/svgServices';
const TaskDetailsMembers = () => {
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const taskMembers = Array.isArray(task?.members) ? task.members : [];
  return (
    <section className="td-section-top-section">
      {<h3 className="td-section-top-h3">Members</h3>}
      <div
        className="td-section-members"
        style={{
          paddingLeft: '0px',
        }}>
        <div className="members-icon" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {taskMembers
            .filter((member) => member && typeof member === 'object' && member.avatar)
            .map((member) => (
              <button key={member._id || member.id} className="td-section-members-button">
                <img
                  src={member.icon}
                  alt={`Member ${member._id || member.id}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '100%',
                  }}
                />
              </button>
            ))}
          <DropdownUi
            trigger={
              <button className="td-section-members-addd">
                <SvgServices name='SvgAddMember'/>
                
              </button>
            }>
            {(props) => <DropdownMembers {...props} taskMembers={taskMembers} />}
          </DropdownUi>
        </div>
      </div>
    </section>
  );
};

export default TaskDetailsMembers;
