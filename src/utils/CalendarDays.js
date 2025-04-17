


export function generateCalendarDays(year,month) {
    const days = [
    ]

    const firstDayOfMonth = new Date(year,month,1)
    const startDay = firstDayOfMonth.getDay()
    const prevMonthLastDate = new Date(year,month, 0).getDate()
    const currectMonthLastDate = new Date(year,month +1,0).getDate()

    const offset = startDay === 0 ? 6 :startDay - 1

    for(let i = offset - 1; i >= 0; i--){
        const date = prevMonthLastDate - i
        days.push({day: date, CurrentMonth: false})
    }

    for(let i = 1; i <= currectMonthLastDate; i++){
        days.push({day:i,CurrentMonth:true})
    }

    const nextMonthDays = 42 - days.length
    for(let i = 1 ; i <=nextMonthDays ; i++){
        days.push({day: i, CurrentMonth:false})

    }
    return days

}

export function DayName() {
     const day = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
      ]
      return day;
}
export function isSelect(selectedCalendarDay,calendarDate,day) {
    const isSelected = 
                    selectedCalendarDay &&
                    selectedCalendarDay.year === calendarDate.year &&
                    selectedCalendarDay.month === calendarDate.month &&
                    selectedCalendarDay.day == day.day;
    return isSelected;
}

export function createHandlePrevMonth(setCalenderDate) {
    return () => {
    setCalenderDate((prev) => {
        const newMonth = prev.month - 1;
        return newMonth < 0
          ? { year: prev.year - 1, month: 11 }
          : { year: prev.year, month: newMonth };
      }); }
}
export function createHandleNextMonth(setCalenderDate) {
    return () => {
        setCalenderDate((prev) => {
            const newMonth = prev.month + 1;
            return newMonth < 0
              ? { year: prev.year + 1, month: 0 }
              : { year: prev.year, month: newMonth };
          }); 
        }
}

export function createHandleNextYear(setCalenderDate) {
    return () => {
        setCalenderDate((prev) => ({
            year: prev.year + 1,
            month: prev.month,
          }));
        }
}

export function createHandlePrevYear(setCalenderDate) {
    return () => {
        setCalenderDate((prev) => ({
            year: prev.year - 1,
            month: prev.month,
          }));
        }
}

export function IsTodayDay(calendarDate,day,Today) {
    const isToday = 
                    day.day === Today.getDate() &&
                    calendarDate.month === Today.getMonth() &&
                    calendarDate.year === Today.getFullYear() &&
                    day.CurrentMonth;
    return isToday;
}

