class ActiveFilter {
    constructor (filter) {
        this.filter = filter;
        this.timeOfActivation = new Date();
        this.timeSpent = 0;
    }

    engage() {
      var timeLeft = this.filter.timeAllowed - this.timeSpent
      chrome.alarms.create(this.filter.filterPattern, { delayInMinutes: timeLeft })
      console.log("Alarm online : " + timeLeft + " minutes remaining.")
    }

    disengage() {
      chrome.alarms.get(this.filter.filterPattern, (function(alarm){
        if (alarm !== undefined) {
          chrome.alarms.clear(this.filter.filterPattern)
          this.timeSpent = (Date.now() - alarm.scheduledTime)/(60 * 1000)
          console.log("Alarm offline : Planned activation at " + alarm.scheduledTime + "; "
              + this.timeSpent + " minutes have passed.")
        }
      }).bind(this))
    }
    
}
