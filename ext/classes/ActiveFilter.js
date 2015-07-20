class ActiveFilter {
    constructor (filter) {
        this.filter = filter;
        this.timeOfActivation = new Date();
        this.timeSpent = 0;
    }

    engage() {
      var timeLeft = filter.timeAllowed - timeSpent
      //alarm create(filter.filterPattern, {delayInMinutes: timeLeft})
    }

    disengage() {
      //alarm get(filter.filterPattern)
      //alarm clear(filter.filterPattern)
      //timeSpent = (new Date.now() - alarm.scheduledTime)/(60 * 1000)
    }
    
}
