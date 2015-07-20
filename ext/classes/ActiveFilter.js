class ActiveFilter {
    constructor (filter) {
        this.filter = filter;
        this.timeOfActivation = new Date();
        this.timeSpent = 0;
    }

    engage() {
      var timeLeft = filter.timeAllowed - timeSpent
      chrome.alarms.create(filter.filterPattern, {delayInMinutes: timeLeft})
    }

    disengage() {
      chrome.alarms.get(filter.filterPattern)
      chrome.alarms.clear(filter.filterPattern)
      timeSpent = (new Date.now() - alarm.scheduledTime)/(60 * 1000)
    }
    
}
