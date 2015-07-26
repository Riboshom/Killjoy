'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Filter = (function () {
  function Filter(filterPattern, timeAllowed, timeUpPolicy, expirationPolicy) {
    _classCallCheck(this, Filter);

    this.filterPattern = filterPattern;
    this.timeAllowed = timeAllowed;
    this.timeUpPolicy = timeUpPolicy;
    this.expirationPolicy = expirationPolicy;
  }

  _createClass(Filter, [{
    key: 'matches',
    value: function matches(url) {
      // Might be a good idea to concat it with "\/?" or "\/.*",
      // though we still need to normalize URLs
      var regexString = this.filterPattern.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&');
      regexString = regexString.replace(/\*/g, '.*');
      var regex = new RegExp(regexString, 'i');
      console.log('Regex : ' + regex.source);
      console.log('String : ' + url);
      console.log('Passes? : ' + regex.test(url));
      return regex.test(url);
    }
  }]);

  return Filter;
})();