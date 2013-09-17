var MYAPP = MYAPP || {};

MYAPP.calendarHelper = {
  /**
   *
   * @param year - YYYY
   * @param month - 0-11
   * @returns {number}
   */
  getDaysInMonth: function(year, month){
    return (new Date(year, month + 1, 0)).getDate();
  },
  /**
   *
   * @param year - YYYY
   * @param month - 0-11
   * @returns {number} - from 0 (monday) to 6 (saturday)
   */
  getDayOfWeek: function(year, month, day){
    var dayOfWeek = (new Date(year, month, day)).getDay() - 1;
    if(dayOfWeek == -1) dayOfWeek = 6;
    return dayOfWeek;
  },
  /**
   *
   * @param year - YYYY
   * @param month - 0-11
   * @returns Date
   */
  getFirstCalendarDate: function(year, month){
    return (new Date((new Date(year, month, 1)).getTime() - this.getDayOfWeek(year, month, 1)*24*60*60*1000));
  },
  /**
   *
   * @param year - YYYY
   * @param month - 0-11
   * @returns Date
   */
  getLastCalendarDate: function(year, month){
    var lastMonthDay = this.getDaysInMonth(year, month);
    return (new Date((new Date(year, month, lastMonthDay)).getTime() + (6 - this.getDayOfWeek(year, month, lastMonthDay))*24*60*60*1000));
  },
  /**
   *
   * @param day - from 0 (monday) to 6 (saturday)
   */
  getDayOfWeekName: function(day){
    var names = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    return names[day];
  },
  /**
   *
   * @param month - from 0 to 11
   */
  getMonthName: function(month){
    var names = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
    return names[month];
  },
  /**
   *
   * @param date {String} - any date string that is correct for Date.parse
   * @returns {String} - date in a yyyy-mm-dd format
   */
  normalizeStrDate: function(date){
    var d = new Date(date.replace(/-/g, '/')), //replace - with / for IE correct work
      yyyy = d.getFullYear().toString(),
      mm = (d.getMonth()+1).toString(), // getMonth() is zero-based
      dd  = d.getDate().toString();
    console.log(d);
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
  }
};
