"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blacklist = (function () {
  function Blacklist(editingParameters, filterList, activeFilters) {
    _classCallCheck(this, Blacklist);

    if (typeof filterList !== "undefined") {
      this.refFilterList = filterList;
    } else {
      this.refFilterList = [];
    }

    if (typeof activeFilters !== "undefined") {
      this.activeFilterList = activeFilters;
    } else {
      this.activeFilterList = [];
    }
    // There was a Proxy here once, but it only served
    // to make things more complicated on both ends.
  }

  _createClass(Blacklist, [{
    key: "add",
    value: function add(filter) {
      refFilterList.push(filter);
    }
  }, {
    key: "remove",
    value: function remove(soughtFilter) {
      var refIdx = refFilterList.find(function (filter) {
        return filter === soughtFilter;
      });
      var activeIdx = activeFilterList.find(function (activeFilter) {
        return activeFilter.filter === soughtFilter;
      });
      if (refIdx > -1) refFilterList.splice(refIdx, 1);
      if (activeIdx > -1) activeFilterList.splice(activeIdx, 1);
    }
  }, {
    key: "hasMatchesFor",
    value: function hasMatchesFor(url) {
      return refFilterList.filter(function (filter) {
        var regexString = filter.filterPattern.replace(/\*/g, ".*");
        regexString = regexString.replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&");
        var regex = new RegExp(regexString, "i");
        return regex.test(url);
      });
    }
  }, {
    key: "activateFilter",
    value: function activateFilter(filter) {
      var afListIdx = activeFilterList.find(function (activeFilter) {
        return activeFilter.filter === filter;
      });
      if (afListIdx > -1) afListIdx = activeFilterList.push(new ActiveFilter(filter)) - 1;
      activeFilterList[afListIdx].engage();
    }
  }, {
    key: "getFilterByPattern",
    value: function getFilterByPattern(filterPattern) {
      var filterIdx = refFilterList.find(function (filter) {
        return filter.filterPattern === filterPattern;
      });
      return refFilterList[filterIdx];
    }
  }, {
    key: "disengageActiveFilters",
    value: function disengageActiveFilters() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = activeFilterList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          activeFilter = _step.value;
          activeFilter.disengage();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return Blacklist;
})();