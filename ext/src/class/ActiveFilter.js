"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActiveFilter = (function () {
  function ActiveFilter(filter) {
    _classCallCheck(this, ActiveFilter);

    this.filter = filter;
    this.timeOfActivation = new Date();
    this.timeSpent = 0; //In milliseconds
  }

  _createClass(ActiveFilter, [{
    key: "engage",
    value: function engage() {
      if (this.filter.timeAllowedPolicy.timeLeftAfter(this.timeSpent) > 0) {
        return this.filter.timeAllowedPolicy.declareAlarm(this.filter.filterPattern, this.timeSpent);
      } else {
        //Manually fire the timeup policy
        //TODO : Merge logic for this and background script alarmCallback()
        this.filter.timeUpPolicy.run();
        return Promise.resolve(0);
      }
    }
  }, {
    key: "disengage",
    value: function disengage() {
      var policy = this.filter.timeAllowedPolicy;
      return policy.withdrawAlarm(this.filter.filterPattern).then((function (timeLeft) {
        //Undefined would mean that there's no such alarm
        if (timeLeft !== undefined) this.timeSpent = policy.timeSpentIfRemains(timeLeft);
      }).bind(this));
    }
  }]);

  return ActiveFilter;
})();