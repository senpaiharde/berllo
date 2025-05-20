import React from 'react';
import { SvgServices } from '../../../../services/svgServices';

const TaskDetailsActivity = () => {
  return (
    
      <section className="td-section-description-main">
        <div className="td-section-attachment-container">
          <div className="SvgLefSvg">
            {' '}
            <SvgServices name="ActivitySvg" />
          </div>
          <div className="td-section-attachment-containerDiv">
            <div className="td-section-header-attackment">Activity</div>

            <button className="ActivityButton">Show details</button>
          </div>
        </div>
        <div className='containerActivity'>
            <div className='containerActivityCommand'>
                <div className='containerMembers'>
                    
                    <button className='containerActivityADDCommand'>Write a comment...</button>
                </div>
                <div className='containerActivityADD'></div>
            </div>
        </div>
      </section>
    
  );
};
export default TaskDetailsActivity;
