MYAPP = MYAPP || {};

$( document ).ready(function() {
  var dateObj = new Date(),
    currentYear = dateObj.getFullYear(),
    currentMonth = dateObj.getMonth(),
    model = new MYAPP.Model();

  model.addEvent({
    date: '2013-09-06',
    title: 'Митинг на болотной',
    participants: 'Володя Пу, Дима Мищечкин',
    text: ''
  });

  $('#calendar').on('click', '.day', function(){
    model.setSelectedDate(new Date($(this).attr('id')));
    MYAPP.view.selectDay($(this).attr('id'));
  });

  //set month name
  $('#monthTitle').text(MYAPP.calendarHelper.getMonthName(currentMonth)+' '+currentYear);

  // fill the list of calendar days
  MYAPP.view.fillCalendar(currentYear, currentMonth, model.getAllEvents());

  //month navigation buttons
  $('#prevMonthButton, #nextMonthButton, #todayButton').click(function(){
    var id = $(this).attr('id');
    if(id == 'prevMonthButton'){
      model.decrementMonth();
    }else if(id == 'nextMonthButton'){
      model.incrementMonth();
    }else if(id == 'todayButton'){
      model.resetMonth();
    }
    var currentMonth = model.getCurrentMonth().month,
      currentYear = model.getCurrentMonth().year;
    $('#monthTitle').text(MYAPP.calendarHelper.getMonthName(currentMonth)+' '+currentYear);
    MYAPP.view.fillCalendar(currentYear, currentMonth, model.getAllEvents());
  });
});