import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SvgClose from '../../../../../../assets/svgDesgin/SvgClose';
import SvgDateLeft from '../../../../../../assets/svgDesgin/SvgDate/SvgDateLeft';
import SvgDateLeftsmall from '../../../../../../assets/svgDesgin/SvgDate/SvgDateLeftsmall';
import SvgDateRight from '../../../../../../assets/svgDesgin/SvgDate/SvgDateRight';
import SvgDateRightsmall from '../../../../../../assets/svgDesgin/SvgDate/SvgDateRightSmall';
import { createHandleNextMonth, createHandleNextYear, createHandlePrevMonth, createHandlePrevYear, DayName, generateCalendarDays, isSelect } from '../../../../../../utils/CalendarDays';

import SvgDropdown from '../../../../../../assets/svgDesgin/SvgDate/SvgDropdown';

const DropdownDate = ({ onClose }) => {
  const [isStartDateActive, setIsStartDateActive] = useState(false);
  const [isDueDateActive, setIsDueDateActive] = useState(false);
  const [startDateValue, setStartDateValue] = useState('');
  const [dueDateValue, setDueDateValue] = useState('');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);
  const taskDate = task?.taskDueDate;
  const isSelected = isSelect(selectedCalendarDay,calendarDate,day)
  const formattedDate = taskDate
    ? new Date(taskDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'no Date';

  const day = DayName();
  const Today = new Date();
  const [calendarDate, setCalenderDate] = useState({
    year: Today.getFullYear(),
    month: Today.getMonth(),
    day: Today.getDay(),
    hour: Today.getHours(),
    min: Today.getMinutes(),
  });

  const formattedHour = String(calendarDate.hour).padStart(2, '0');
  const formattedMin = String(calendarDate.min).padStart(2, '0');

  const [dueTimeValue, setDueTimeValue] = useState(`${formattedHour}:${formattedMin}`);
  const calenderDays = generateCalendarDays(calendarDate.year, calendarDate.month);

  const handlePrevMonth = createHandlePrevMonth(setCalenderDate);
  const handleNextMonth = createHandleNextMonth(setCalenderDate);
  const handleNextYear = createHandleNextYear(setCalenderDate);
  const handlePrevYear = createHandlePrevYear(setCalenderDate);
const handleSave = () => {

}


  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 style={{ marginLeft: '25px' }} className="DropdownHeaderH2">
          Dates
        </h2>
        <button className="DropdownClose" onClick={onClose}>
          <SvgClose />
        </button>
      </div>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="DateBoard">
            <div className="DateBoardDiv">
              <div className="DateDates">
                <div className="DateDatesleft">
                  <button onClick={handlePrevYear} className="DateDatesButton">
                    <SvgDateLeft />
                  </button>
                  <button
                    onClick={handlePrevMonth}
                    style={{ marginLeft: '6px' }}
                    className="DateDatesButton">
                    <SvgDateLeftsmall />
                  </button>
                </div>

                <div className="">
                  <h2 className="DataDisplay">
                    {new Date(calendarDate.year, calendarDate.month).toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h2>
                </div>
                <div className="DateDatesright">
                  <button onClick={handleNextMonth} className="DateDatesButton">
                    <SvgDateRightsmall />
                  </button>
                  <button
                    onClick={handleNextYear}
                    style={{ marginLeft: '6px' }}
                    className="DateDatesButton">
                    <SvgDateRight />
                  </button>
                </div>
              </div>
              <div className="BoardDisplay">
                {day.map((day) => {
                  return (
                    <div className="BoardDisplayDate">
                      <span className="BoardDisplayDate5">{day}</span>
                    </div>
                  );
                })}
                {calenderDays.map((day, idx) => {
                    
                    return(
                  <button
                  
                    key={idx}
                    onClick={() => {
                        const selectedDate = {
                            day: day.day,
                            month: calendarDate.month,
                            year: calendarDate.year,
                        }
                        setSelectedCalendarDay(selectedDate);
                        setIsDueDateActive((prev) => !prev);

                        const formatted = `${String(day.day).padStart(2,0)}/
                        ${String(calendarDate.month + 1).padStart(2,0)}${calendarDate.year}`;
                        setDueDateValue(formatted)
                    }}
                    className={`CalendarDay ${day.CurrentMonth ? 'current-month' : 'other-month'}
                    ${isSelected ? 'selected-day' : ''}`}>
                    {day.day}
                  </button>
                )})}
              </div>
            </div>
            <div className="BoardDInput">
              <div className="BoardDInputDate">
                <label className="BoardinputDateLabel">Start Date</label>
                <label className="BoardinputDateinput">
                  <input
                    checked={isStartDateActive}
                    onChange={() => setIsStartDateActive((prev) => !prev)}
                    style={{ height: '16px', width: '16px', alignItems: 'center' }}
                    type="checkbox"></input>
                </label>



                <div style={{ marginRight: '8px' }}>
                  <input
                    placeholder={isStartDateActive ? '' : 'D/M/YYYY'}
                    className={
                      isStartDateActive
                        ? 'BoardinputDateinputDate'
                        : 'BoardinputDateinputDate-disable'
                    }
                    disabled={!isStartDateActive}
                    value={startDateValue}
                    onChange={(e) => setStartDateValue(e.target.value)}></input>
                </div>
              </div>

              <div className="BoardDInputDate">
                <label className="BoardinputDateLabel">Due Date</label>
                <label className="BoardinputDateinput">
                  <input
                    checked={isDueDateActive}
                    onChange={() => {
                      setIsDueDateActive((prev) => !prev);
                    }}
                    style={{ height: '16px', width: '16px', alignItems: 'center' }}
                    type="checkbox"></input>



                </label>
                <div style={{ marginRight: '8px' }}>
                  <input
                  value={dueDateValue}
                  onChange={(e) => setDueDateValue(e.target.value)}
                    placeholder={isDueDateActive ? '' : 'D/M/YYYY'}
                    className={
                      isDueDateActive
                        ? 'BoardinputDateinputDate'
                        : 'BoardinputDateinputDate-disable'
                    }
                    disabled={!isDueDateActive}></input>
                </div>





                <div style={{ marginRight: '8px' }}>
                  <input
                    value={dueTimeValue ? dueTimeValue : 'H:mm'}
                    placeholder="H:mm"
                    className={
                      isDueDateActive
                        ? 'BoardinputDateinputDate'
                        : 'BoardinputDateinputDate-disable'
                    }
                    readOnly={!isDueDateActive}
                    onChange={(e) => {
                      if (isDueDateActive) {
                        setDueTimeValue(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <label className="BoardReminder">
              Set due date reminder
              <div className="BoardReminderDiv">
                <div className="BoardReminderDivText">
                  <div className="BoardReminderDivText2">At time of due date</div>
                </div>
                <div className="BoardReminderDivSVG">
                  <span className="BoardReminderDivSVG2">
                    <SvgDropdown />
                  </span>
                </div>
              </div>
            </label>
            <div className="BoardText">
              Reminders will be sent to all members and watchers of this card.
            </div>
            <div className="BoardButtonsArea">
              <button className="BoardButtonsAreaSave">Save</button>
              <button className="BoardButtonsAreaRemove">Remove</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DropdownDate;
