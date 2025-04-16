


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


