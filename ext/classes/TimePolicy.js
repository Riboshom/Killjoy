class TimePolicy {
  constructor (type, minTime){ 
    //TODO : Refactor this ugly hack into subclasses
    if (type === "AT") {
      this.mark = new Date(msTime)
    } else if (type === "AFTER") {
      this.delay = minTime * 60000 //In ms
    } else {
      console.error("Check those constructors, \"" + type + "\" isn't valid.")
    }
  }
  
  declareAlarm(name, timeOffset = 0) {
    console.log("Alarm declaration...")
    //timeOffset is in milliseconds
    return new Promise(function (resolve, reject) {
      var minutesLeft = this.minutesLeftAfter(timeOffset)
      chrome.alarms.create(name, { delayInMinutes: minutesLeft })
      console.log("Alarm online : " + minutesLeft + " minutes left.")
      resolve()
    }.bind(this));
  }
  
  withdrawAlarm(name) {
    return new Promise((function (resolve, reject) {
      chrome.alarms.get(name, (function(alarm){
        if (alarm !== undefined) {
          chrome.alarms.clear(name)
          var timeLeft = alarm.scheduledTime - Date.now()
          console.log("Alarm offline : " + (timeLeft/60000) + " minutes left.")
          resolve(timeLeft)
        } else {
          resolve()
        }
      }).bind(this))
    }).bind(this));
  }
  
  timeLeftAfter(elapsedMilli) {
    if (this.hasOwnProperty("delay")) {
      return this.delay - elapsedMilli
    } else if (this.hasOwnProperty("mark")) {
      return this.mark - Date.now()
    } else {
      return undefined
    }
  }
  
  minutesLeftAfter(elapsedMilli) {
    return this.timeLeftAfter(elapsedMilli) / 60000
  }
  
  timeSpentIfRemains(remainingMilli) {
    return this.delay - remainingMilli
  }
  
  minutesSpentIfRemains(remainingMilli) {
    return (this.delay - remainingMilli) / 60000
  }
}
