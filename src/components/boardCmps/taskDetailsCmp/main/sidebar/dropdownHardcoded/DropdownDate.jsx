import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import SvgDateLeft from '../../../../../../assets/svgDesgin/SvgDate/SvgDateLeft';
import SvgDateLeftsmall from '../../../../../../assets/svgDesgin/SvgDate/SvgDateLeftsmall';
import SvgDateRight from '../../../../../../assets/svgDesgin/SvgDate/SvgDateRight';
import SvgDateRightsmall from '../../../../../../assets/svgDesgin/SvgDate/SvgDateRightSmall';

const DropdownDate = ({onClose}) => {

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const days = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]
  
  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 style={{marginLeft:'25px'}} className="DropdownHeaderH2">Dates</h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgClose />
        </button>
      </div>
      <div>
      <form>
      <div className='DateBoard'>
      <div className='DateBoardDiv'>
        <div className='DateDates'>
            <div className='DateDatesleft'>
                <button className='DateDatesButton'><SvgDateLeft/></button>
                <button style={{marginLeft:'6px'}} className='DateDatesButton'><SvgDateLeftsmall/></button>
            </div>
           
            <div className=''><h2 className='DataDisplay'>May 2025</h2></div>
            <div className='DateDatesright'>
                
            <button  className='DateDatesButton'><SvgDateRightsmall/></button>
            <button style={{marginLeft:'6px'}} className='DateDatesButton'><SvgDateRight/></button>
            </div>
        </div >
        <div className='BoardDisplay'>
        {days.map((day) => {
            return(
                <div className='BoardDisplayDate'>
                    <span className='BoardDisplayDate5'>{day}</span></div>
            )
        })}
        </div>
      </div>
      </div>
      </form>
      </div>
      </div>
  );
};

export default DropdownDate;
