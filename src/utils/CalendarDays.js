import { useDispatch, useSelector } from 'react-redux';
import { liveUpdateTask } from '../redux/taskDetailsSlice';

export function generateCalendarDays(year, month) {
  const days = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  const currectMonthLastDate = new Date(year, month + 1, 0).getDate();

  const offset = startDay === 0 ? 6 : startDay - 1;

  for (let i = offset - 1; i >= 0; i--) {
    const date = prevMonthLastDate - i;
    const fullDate = new Date(year, month - 1, date);
    days.push({ day: date, CurrentMonth: false, fullDate });
  }

  for (let i = 1; i <= currectMonthLastDate; i++) {
    const fullDate = new Date(year, month, i);
    days.push({ day: i, CurrentMonth: true, fullDate });
  }

  const nextMonthDays = 42 - days.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    const fullDate = new Date(year, month + 1, i);
    days.push({ day: i, CurrentMonth: false, fullDate });
  }
  return days;
}

export function DayName() {
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return day;
}
export function isSelect(selectedCalendarDay, calendarDate, day) {
  if (!selectedCalendarDay || !day.fullDate) return false;

  const selected = new Date(
    selectedCalendarDay.year,
    selectedCalendarDay.month,
    selectedCalendarDay.day
  );
  return selected.toDateString() === day.fullDate.toDateString();
}

export function createHandlePrevMonth(setCalenderDate) {
  return () => {
    setCalenderDate((prev) => {
      const newMonth = prev.month - 1;
      return newMonth < 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: newMonth };
    });
  };
}
export function createHandleNextMonth(setCalenderDate) {
  return () => {
    setCalenderDate((prev) => {
      const newMonth = prev.month + 1;
      return newMonth < 0
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: newMonth };
    });
  };
}

export function createHandleNextYear(setCalenderDate) {
  return () => {
    setCalenderDate((prev) => ({
      year: prev.year + 1,
      month: prev.month,
    }));
  };
}

export function createHandlePrevYear(setCalenderDate) {
  return () => {
    setCalenderDate((prev) => ({
      year: prev.year - 1,
      month: prev.month,
    }));
  };
}

export function IsTodayDay(day) {
  if (!day.fullDate) return false;
  return day.fullDate.toDateString() === new Date().toDateString();
}
export function getTaskDueStatus(task) {
  if (!task?.taskDueDate) return 'no-date';

  const now = Date.now();
  const due = new Date(task.taskDueDate).getTime();
  const reminder = task.reminder ? new Date(task.reminder).getTime() : null;
  const isCompleted = task.isDueComplete;

  if (isCompleted) return 'complete';
  if (now >= due + 24 * 60 * 60 * 1000) return 'overdue-late';
  if (now >= due) return 'overdue';
  if (reminder && now >= reminder) return 'due-soon';

  return '';
}
