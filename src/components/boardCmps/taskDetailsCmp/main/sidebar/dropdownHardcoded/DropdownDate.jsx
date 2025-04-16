import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import SvgDateLeft from '../../../../../../assets/svgDesgin/SvgDate/SvgDateLeft';
import SvgDateLeftsmall from '../../../../../../assets/svgDesgin/SvgDate/SvgDateLeftsmall';
import SvgDateRight from '../../../../../../assets/svgDesgin/SvgDate/SvgDateRight';
import SvgDateRightsmall from '../../../../../../assets/svgDesgin/SvgDate/SvgDateRightSmall';
import { DayName, generateCalendarDays } from '../../../../../../utils/CalendarDays';
import { CalendarDays } from 'lucide-react';

const DropdownDate = ({onClose}) => {

  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const day = DayName()
  const Today = new Date()
  const [calendarDate, setCalenderDate] =useState({
    year: Today.getFullYear(),
    month: Today.getMonth()
  })

  const calenderDays = generateCalendarDays(calendarDate.year, calendarDate.month)

  const handlePrevMonth = () => {
    setCalenderDate(prev => {
        const newMonth = prev.month - 1;
        return newMonth < 0
        ? {year: prev.year - 1, month: 11}
        : {year: prev.year, month: newMonth};
    });
  }
  const handleNextMonth = () => {
    setCalenderDate(prev => {
        const newMonth = prev.month + 1;
        return newMonth < 0
        ? {year: prev.year + 1, month: 0}
        : {year: prev.year, month: newMonth};
    });
  }
  const handleNextYear = () => {
    setCalenderDate(prev => ({
        year:prev.year + 1,
        month: prev.month,
    }));
  }
  const handlePrevYear = () => {
    setCalenderDate(prev => ({
        year:prev.year - 1,
        month: prev.month
    }));
  }
  
  
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
      <form onSubmit={(e) => e.preventDefault()}>
      <div className='DateBoard'>
      <div className='DateBoardDiv'>
        <div className='DateDates'>
            <div className='DateDatesleft'>
                <button onClick={handlePrevYear} className='DateDatesButton'><SvgDateLeft/></button>
                <button onClick={handlePrevMonth}
                style={{marginLeft:'6px'}} className='DateDatesButton'><SvgDateLeftsmall/></button>
            </div>
           
            <div className=''>
                <h2 className='DataDisplay'>
                    {new Date(calendarDate.year, calendarDate.month).toLocaleString('default',
                {month:'long',
                    year:'numeric'
                }
            )}
            </h2>
            </div>
            <div className='DateDatesright'>
                
            <button  onClick={handleNextMonth}
            className='DateDatesButton'><SvgDateRightsmall/></button>
            <button onClick={handleNextYear} style={{marginLeft:'6px'}} 
            className='DateDatesButton'><SvgDateRight/></button>
            </div>
        </div >
        <div className='BoardDisplay'>
        {day.map((day) => {
            return(
                <div className='BoardDisplayDate'>
                    <span className='BoardDisplayDate5'>{day}</span></div>
            )
        })}
        {calenderDays.map((day,idx) => (
            <button key={idx} className={`CalendarDay ${day.CurrentMonth ? 'current-month' : 'other-month'}`}>
                {day.day}

            </button>
        ))}
        </div>
      </div>
      </div>
      </form>
      </div>
      </div>
  );
};

export default DropdownDate;
