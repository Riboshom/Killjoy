class ActiveFilter {
    constructor (filter) {
        this.filter = filter;
        this.timeOfActivation = new Date();
        this.timeSpent = 0;
    }

    engage() {
      var timeLeft = this.filter.timeAllowed - this.timeSpent
      chrome.alarms.create(this.filter.filterPattern, {delayInMinutes: this.timeLeft})
    }

    disengage() {
      chrome.alarms.get(this.filter.filterPattern)
      chrome.alarms.clear(this.filter.filterPattern)
      timeSpent = (new Date.now() - alarm.scheduledTime)/(60 * 1000)
    }
    
}
