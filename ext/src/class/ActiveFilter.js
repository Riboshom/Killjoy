"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActiveFilter = (function () {
  function ActiveFilter(filter) {
    _classCallCheck(this, ActiveFilter);

    this.filter = filter;
    this.timeOfActivation = new Date();
    this.timeSpent = 0;
  }

  _createClass(ActiveFilter, [{
    key: "engage",
    value: function engage() {
      var timeLeft = this.filter.timeAllowed - this.timeSpent;
      chrome.alarms.create(this.filter.filterPattern, { delayInMinutes: this.timeLeft });
    }
  }, {
    key: "disengage",
    value: function disengage() {
      chrome.alarms.get(this.filter.filterPattern);
      chrome.alarms.clear(this.filter.filterPattern);
      timeSpent = (new Date.now() - alarm.scheduledTime) / (60 * 1000);
    }
  }]);

  return ActiveFilter;
})();