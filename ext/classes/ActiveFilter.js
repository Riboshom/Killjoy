class ActiveFilter {
    constructor (filter) {
        this.filter = filter;
        this.timeOfActivation = new Date();
        this.timeSpent = 0; //In milliseconds
    }

    engage() {
      console.log("AF : " + JSON.stringify(this))
      return this.filter.timeAllowedPolicy.declareAlarm(this.filter.filterPattern, this.timeSpent)
    }

    disengage() {
      var policy = this.filter.timeAllowedPolicy
      return policy.withdrawAlarm(this.filter.filterPattern).then((function(timeLeft){
        //Undefined would mean that there's no such alarm
        if (timeLeft !== undefined) this.timeSpent = policy.timeSpentIfRemains(timeLeft);
      }).bind(this))
    }
    
}
