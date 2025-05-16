import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SvgDateLeft from '../../../../../../assets/svgDesgin/SvgDate/SvgDateLeft';
import SvgDateLeftsmall from '../../../../../../assets/svgDesgin/SvgDate/SvgDateLeftsmall';
import SvgDateRight from '../../../../../../assets/svgDesgin/SvgDate/SvgDateRight';
import SvgDateRightsmall from '../../../../../../assets/svgDesgin/SvgDate/SvgDateRightSmall';
import {
  createHandleNextMonth,
  createHandleNextYear,
  createHandlePrevMonth,
  createHandlePrevYear,
  DayName,
  generateCalendarDays,
  isSelect,
  IsTodayDay,
} from '../../../../../../utils/CalendarDays';

import SvgDropdown from '../../../../../../assets/svgDesgin/SvgDate/SvgDropdown';
import { liveUpdateTask } from '../../../../../../redux/taskDetailsSlice';
import { SvgServices } from '../../../../../../services/svgServices';

const DropdownDate = ({ onClose }) => {
  const dispatch = useDispatch();

  const [isStartDateActive, setIsStartDateActive] = useState(false);
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const [isDueDateActive, setIsDueDateActive] = useState(false);
  const [startDateValue, setStartDateValue] = useState('');
  const [dueDateValue, setDueDateValue] = useState('');
  const [dropdownTitle, setDropdownTitle] = useState('none');
  const day = DayName();
  const Today = new Date();
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const task = useSelector((state) => state.taskDetailsReducer?.selectedTask);

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
  if (!isDueDateActive || !dueDateValue || !dueTimeValue) return;

  const [day, month, year] = dueDateValue.split('/');
  const [hour, minute] = dueTimeValue.split(':');
  const dueDate = new Date(+year, +month - 1, +day, +hour, +minute);

  // Map label → offset
  const reminderOffset = {
    'At Time Due Date': 0,
    '5 minutes before': 5,
    '10 minutes before': 10,
    '30 minutes before': 30,
    '1 hour before': 60,
    '1 day before': 1440,
    '2 day before': 2880,
  }[dropdownTitle] ?? null;

  const reminder = reminderOffset !== null
    ? new Date(dueDate.getTime() - reminderOffset * 60000).toISOString()
    : null;

  dispatch(
    liveUpdateTask({
      method: 'update',
      workId: 'tasks',
      taskDueDate: dueDate.toISOString(),
      reminder: reminder,
      isDueComplete: false,
      ...(isStartDateActive && startDateValue
        ? { startDate: new Date(startDateValue).toISOString() }
        : {})
    })
  );

  onClose();
};

  const handleRemove = () => {
    console.log('Saving task due date:', dueDateValue, dueTimeValue);

    dispatch(
      liveUpdateTask({
        method: 'update',
        workId: 'tasks',
        taskDueDate: null,
        reminder: 'None',
        isDueComplete: false,
        taskStartDate: null,
      })
    );
    
    onClose();
  };

  return (
    <div className="DropdownUi">
      {/* Header */}
      <div className="DropdownUiHeader">
        <h2 style={{ marginLeft: '25px' }} className="DropdownHeaderH2">
          Dates
        </h2>
        <button className="DropdownClose" onClick={onClose}>
            <SvgServices name='SvgClose'/>
          
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
                  const isSelected = isSelect(selectedCalendarDay, calendarDate, day);
                  const isToday = IsTodayDay(day);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedCalendarDay({
                          day: day.fullDate.getDate(),
                          month: day.fullDate.getMonth(),
                          year: day.fullDate.getFullYear(),
                        });

                        setIsDueDateActive(true);

                        const formatted = `${String(day.day).padStart(2, '0')}/${String(
                          calendarDate.month + 1
                        ).padStart(2, '0')}/${calendarDate.year}`;

                        setDueDateValue(formatted);
                      }}
                      className={`CalendarDay 
                        ${day.CurrentMonth ? 'current-month' : 'other-month'}
                        ${isToday ? 'today' : ''}
                    ${isSelected ? 'selected-day' : ''}
                    `}>
                      {day.day}
                    </button>
                  );
                })}
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
                    onChange={(e) => {
                      setDueDateValue(e.target.value);
                    }}
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
            <div className="BoardReminderWrapper">
              <label
                className="BoardReminder"
                onClick={() => setShowReminderOptions((prev) => !prev)}>
                Set due date reminder
                <div className="BoardReminderDiv">
                  <div className="BoardReminderDivText">
                    <div className="BoardReminderDivText2">{dropdownTitle}</div>
                  </div>
                  <div className="BoardReminderDivSVG">
                    <span className="BoardReminderDivSVG2">
                      <SvgDropdown />
                    </span>
                  </div>
                </div>
              </label>
              {showReminderOptions && (
                <div className="ReminderDropdown">
                  <ul>
                    {[
                      'None',
                      'At Time Due Date',
                      '5 minutes before',
                      '10 minutes before',
                      '30 minutes before',
                      '1 hour before',
                      '1 day before',
                      '2 day before',
                    ].map((li) => {
                      return (
                        <li
                          key={li}
                          className={li === dropdownTitle ? 'selected' : ''}
                          onClick={() => {
                            setDropdownTitle(li);
                            setShowReminderOptions(false);
                          }}>
                          {li}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className="BoardText">
              Reminders will be sent to all members and watchers of this card.
            </div>
            <div className="BoardButtonsArea">
              <button onClick={handleSave} className="BoardButtonsAreaSave">
                Save
              </button>
              <button onClick={handleRemove} className="BoardButtonsAreaRemove">
                Remove
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DropdownDate;
