// src/components/boardCmps/taskDetailsCmp/main/TaskDescription.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../../../../redux/TaskDetailsSlice';
import DescriptionEditor from './DescriptionEditor';
import { SvgServices } from '../../../../services/svgServices';


export default function AttachmentUi() {
  const dispatch = useDispatch();
  const task = useSelector(s => s.taskDetailsReducer.selectedTask);
  

  const handleSave = html => {
    dispatch(
      liveUpdateTask({
        method: 'UPDATE',
        workId: 'tasks',
        attachments: html ,
      })
    );
   
  };

  return (
    <section className="td-section-description-main">
      <div className="td-section-description-container">
        <div className="SvgLeft" > <SvgServices name="taskDetailsSvgLeft" /></div>
        <div className="td-section-header-description">Attachments</div>
      </div>

    
       
      
        <div
       
          className="attackMentsUi"
         > 
         <h3 className='attackMentsUiH3'>Files</h3>
       </div>
        <ul className='attackMentsUiContainer'>
           {task.attachments.map((template, index) => (
        
          <li key={index} className="attackMentsUiContainerInside">
            <div className="attackMentsUiContainerDiv">

                 <div className="attackMentsUiContainerDivInside">

                    <a href={template.url} className="attackMentsUiContainerDivInsideA" />
                 </div>
            </div>
           
          </li> 
      
        
        ))}
        </ul>
    </section>
  );
}
