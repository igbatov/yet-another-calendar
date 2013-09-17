MYAPP = MYAPP || {};

MYAPP.view = {
  fillCalendar: function(year, month, events){
    var i, time,
      dateObj = new Date(),
      currentYear = dateObj.getFullYear(),
      currentMonth = dateObj.getMonth(),
      currentDay= dateObj.getDate(),
      firstDate = MYAPP.calendarHelper.getFirstCalendarDate(year, month),
      lastDate = MYAPP.calendarHelper.getLastCalendarDate(year, month),
      dayInMs = 24*60*60*1000;

    $('#calendar').html('');

    //append day divs
    for(time = firstDate.getTime(); time<=lastDate.getTime(); time=time+dayInMs){
      dateObj.setTime(time);
      var dateStr = MYAPP.calendarHelper.normalizeStrDate(dateObj.getFullYear()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getDate());

      //determine day of week
      var dayOfWeekName = MYAPP.calendarHelper.getDayOfWeekName(MYAPP.calendarHelper.getDayOfWeek(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
      //show it only for the first 7 days
      dayOfWeekName = time < firstDate.getTime() + 7*24*60*60*1000 ? dayOfWeekName+', ' : '';

      //determine if this day is today
      var isToday = (dateObj.getFullYear() == currentYear && dateObj.getMonth() == currentMonth && dateObj.getDate() == currentDay);

      //stringify all events of the day
      var text = '';
      if(typeof(events[dateStr]) != "undefined"){
        for(i in events[dateStr]){
          text += events[dateStr][i].title+'<br>'+events[dateStr][i].participants+'<br>'+events[dateStr][i].text;
        }
      }

      $('#calendar').append(this._createDayDiv(dayOfWeekName+dateObj.getDate(), text, dateStr, isToday));
    }
  },

  selectDay: function(id){
    $('.day').removeClass('selected');
    $('#'+id).addClass('selected');
  },

  _createDayDiv: function(title, text, id, isToday){
    var div = '<li class="day'+(isToday ? ' today' : '')+(text != '' ? ' withEvent' : '')+'" id="'+id+'">'+
      '<div class="date">'+title+'</div>'+
      '<div class="event">'+text+'</div>'+
      '</li>';
    return div;
  }
};
