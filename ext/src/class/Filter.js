"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = function Filter(filterPattern, timeAllowed, timeUpPolicy, expirationPolicy) {
    _classCallCheck(this, Filter);

    this.filterPattern = filterPattern;
    this.timeAllowed = timeAllowed;
    this.timeUpPolicy = timeUpPolicy;
    this.expirationPolicy = expirationPolicy;
};