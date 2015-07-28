"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimePolicy = (function () {
  function TimePolicy(type, minTime) {
    _classCallCheck(this, TimePolicy);

    //TODO : Refactor this ugly hack into subclasses
    if (type === "AT") {
      this.mark = new Date(minTime * 60000);
    } else if (type === "AFTER") {
      this.delay = minTime * 60000 //In ms
      ;
    } else {
      console.error("Check those constructors, \"" + type + "\" isn't valid.");
    }
  }

  _createClass(TimePolicy, [{
    key: "declareAlarm",
    value: function declareAlarm(name) {
      var timeOffset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      //timeOffset is in milliseconds
      return new Promise((function (resolve, reject) {
        var minutesLeft = this.minutesLeftAfter(timeOffset);
        chrome.alarms.create(name, { delayInMinutes: minutesLeft });
        console.log("Alarm online : " + minutesLeft + " minutes left.");
        resolve(minutesLeft);
      }).bind(this));
    }
  }, {
    key: "withdrawAlarm",
    value: function withdrawAlarm(name) {
      return new Promise((function (resolve, reject) {
        chrome.alarms.get(name, (function (alarm) {
          if (alarm !== undefined) {
            chrome.alarms.clear(name);
            var timeLeft = alarm.scheduledTime - Date.now();
            console.log("Alarm offline : " + timeLeft / 60000 + " minutes left.");
            resolve(timeLeft);
          } else {
            resolve();
          }
        }).bind(this));
      }).bind(this));
    }
  }, {
    key: "timeLeftAfter",
    value: function timeLeftAfter(elapsedMilli) {
      if (this.hasOwnProperty("delay")) {
        return this.delay - elapsedMilli;
      } else if (this.hasOwnProperty("mark")) {
        return this.mark - Date.now();
      } else {
        return undefined;
      }
    }
  }, {
    key: "minutesLeftAfter",
    value: function minutesLeftAfter(elapsedMilli) {
      return this.timeLeftAfter(elapsedMilli) / 60000;
    }
  }, {
    key: "timeSpentIfRemains",
    value: function timeSpentIfRemains(remainingMilli) {
      return this.delay - remainingMilli;
    }
  }, {
    key: "minutesSpentIfRemains",
    value: function minutesSpentIfRemains(remainingMilli) {
      return (this.delay - remainingMilli) / 60000;
    }
  }]);

  return TimePolicy;
})();