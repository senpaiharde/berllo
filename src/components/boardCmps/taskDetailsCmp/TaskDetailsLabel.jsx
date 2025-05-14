import React from 'react';
import '../../../styles/taskDetailsFolder/TaskDetailsLabel.scss';
import SvgPlus from '../../../assets/svgDesgin/SvgPlus';
import { useSelector } from 'react-redux';
import DropdownUi from './main/sidebar/dropdownHardcoded/DropdownUi';
import DropdownLabel from './main/sidebar/dropdownHardcoded/DropdownLabel';

const TaskDetailsLabel = () => {
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const taskLabels = Array.isArray(task?.labels) ? task.labels : [];
  console.log('color', task);
  

  return (
    <section className="td-section-top-section">
      <h3 className="td-section-top-h3">labels</h3>
      <div className="td-section-label" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {taskLabels.map((template, index) => (
          <DropdownUi
          trigger={<div key={index} className="td-section-label-color">
            <span 
              style={{
                backgroundColor: template.color,
                position: 'absolute', 
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '3px',
              }}></span>
            <div style={{ textAlign: 'center', zIndex: 1 }}>{template.title}</div>
          </div> }>
          {(props) => <DropdownLabel {...props} />}
        </DropdownUi>
        ))}
        <DropdownUi
          trigger={
            <button className="td-section-members-add">
              <SvgPlus />
            </button>
          }>
          {(props) => <DropdownLabel {...props} />}
        </DropdownUi>
      </div>
    </section>
  );
};

export default TaskDetailsLabel;
