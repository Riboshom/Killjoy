class ActiveFilter {
    constructor (filter) {
        this.filter = filter;
        this.timeOfActivation = new Date();
        this.timeSpent = 0; //In milliseconds
    }

    engage() {
      console.log("AF : " + JSON.stringify(this))
      if(this.filter.timeAllowedPolicy.timeLeftAfter(this.timeSpent) > 0) {
        return this.filter.timeAllowedPolicy.declareAlarm(this.filter.filterPattern, this.timeSpent)
      } else {
        //Manually fire the timeup policy
        //TODO : Merge logic for this and background script alarmCallback()
        this.filter.timeUpPolicy.run()
        return Promise.resolve(0)
      }
    }

    disengage() {
      var policy = this.filter.timeAllowedPolicy
      return policy.withdrawAlarm(this.filter.filterPattern).then((function(timeLeft){
        //Undefined would mean that there's no such alarm
        if (timeLeft !== undefined) this.timeSpent = policy.timeSpentIfRemains(timeLeft);
      }).bind(this))
    }
    
}
