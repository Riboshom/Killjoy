"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blacklist = (function () {
  function Blacklist() {
    var filterList = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var activeFilters = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    _classCallCheck(this, Blacklist);

    this.refFilterList = filterList;
    this.activeFilterList = activeFilters;
    // There was a Proxy here once, but it only served
    // to make things more complicated on both ends.
  }

  _createClass(Blacklist, [{
    key: "add",
    value: function add(filter) {
      this.refFilterList.push(filter);
    }
  }, {
    key: "remove",
    value: function remove(soughtFilter) {
      var refIdx = this.refFilterList.findIndex(function (filter) {
        return filter === soughtFilter;
      });
      var activeIdx = this.activeFilterList.findIndex(function (activeFilter) {
        return activeFilter.filter === soughtFilter;
      });
      if (refIdx > -1) this.refFilterList.splice(refIdx, 1);
      if (activeIdx > -1) this.activeFilterList.splice(activeIdx, 1);
    }
  }, {
    key: "hasMatchesFor",
    value: function hasMatchesFor(url) {
      return this.refFilterList.filter(function (filter) {
        return filter.matches(url);
      });
    }
  }, {
    key: "activateFilter",
    value: function activateFilter(filter) {
      var afListIdx = this.activeFilterList.findIndex(function (activeFilter) {
        return activeFilter.filter === filter;
      });
      if (afListIdx == -1) {
        //Append the filter if it isn't there and update the target index to match
        afListIdx = this.activeFilterList.push(new ActiveFilter(filter)) - 1;
        filter.expirationPolicy.declareAlarm("¤" + filter.filterPattern);
      }
      return this.activeFilterList[afListIdx].engage();
    }
  }, {
    key: "deactivateFilter",
    value: function deactivateFilter(filter) {
      var activeIdx = this.activeFilterList.findIndex(function (activeFilter) {
        return activeFilter.filter === soughtFilter;
      });
      var activeFilter = this.activeFilterList[activeIdx];
      activeFilter.disengage().then(function () {
        this.activeFilterList.splice(activeIdx, 1);
      });
    }
  }, {
    key: "getFilterByPattern",
    value: function getFilterByPattern(filterPattern) {
      var filterIdx = this.refFilterList.findIndex(function (filter) {
        return filter.filterPattern === filterPattern;
      });
      return this.refFilterList[filterIdx];
    }
  }, {
    key: "disengageActiveFilters",
    value: function disengageActiveFilters() {
      var promises = [];
      this.activeFilterList.forEach(function (activeFilter) {
        promises.push(activeFilter.disengage());
      });
      return Promise.all(promises);
    }
  }, {
    key: "restorePrototypes",
    value: function restorePrototypes() {
      this.activeFilterList.forEach(function (activeFilter) {
        activeFilter.__proto__ = ActiveFilter.prototype;
      });
      this.refFilterList.forEach(function (filter) {
        filter.__proto__ = Filter.prototype;
        filter.timeAllowedPolicy.__proto__ = TimePolicy.prototype;
        filter.expirationPolicy.__proto__ = TimePolicy.prototype;
        filter.timeUpPolicy.__proto__ = BlockingAction.prototype;
      });
    }
  }]);

  return Blacklist;
})();