MYAPP = MYAPP || {};

MYAPP.Model = function(){
  this.events = {};
  this.freeEventId = 0;
  this.currentYear = 0;
  this.currentMonth = 0;
  this.resetMonth();
};

MYAPP.Model.prototype = {
  incrementMonth: function(){
    var dateObj = new Date(this.currentYear, this.currentMonth+1, 1);
    this.currentYear = dateObj.getFullYear();
    this.currentMonth = dateObj.getMonth();
  },

  decrementMonth: function(){
    var dateObj = new Date(this.currentYear, this.currentMonth-1, 1);
    this.currentYear = dateObj.getFullYear();
    this.currentMonth = dateObj.getMonth();
  },

  resetMonth: function(){
    var dateObj = new Date(),
      currentYear = dateObj.getFullYear(),
      currentMonth = dateObj.getMonth();

    this.currentYear = currentYear;
    this.currentMonth = currentMonth;
  },

  getCurrentMonth: function(){
    return {year: this.currentYear, month: this.currentMonth};
  },

  /**
   *
   * @param date {Date}
   */
  setSelectedDate: function(date){
    this.selectedDate = date;
  },
  /**
   *
   * @returns {Date}
   */
  getSelectedDate: function(){
    return this.selectedDate;
  },
  /**
   *
   * @param event - {date:'2013-08-06', title:'', participants:'', text:''}
   * @returns {Number} - id of newly created event
   */
  addEvent: function(event){
    event.id = this.freeEventId;
    this.freeEventId++;
    var hash = MYAPP.calendarHelper.normalizeStrDate(event.date);
    if(typeof(this.events[hash]) == 'undefined') this.events[hash] = [];
    this.events[hash].push(event);
    return event.id;
  },
  /**
   *
   * @param date {String}
   * @returns {*}
   */
  getEventsByDate: function(date){
    return this.events[MYAPP.calendarHelper.normalizeStrDate(date)];
  },
  getAllEvents: function(){
    return this.events;
  }
};