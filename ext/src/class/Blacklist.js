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
      refFilterList.push(filter);
    }
  }, {
    key: "remove",
    value: function remove(soughtFilter) {
      var refIdx = this.refFilterList.find(function (filter) {
        return filter === soughtFilter;
      });
      var activeIdx = this.activeFilterList.find(function (activeFilter) {
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
      var afListIdx = this.activeFilterList.find(function (activeFilter) {
        return activeFilter.filter === filter;
      });
      if (afListIdx > -1) afListIdx = this.activeFilterList.push(new ActiveFilter(filter)) - 1;
      this.activeFilterList[afListIdx].engage();
    }
  }, {
    key: "getFilterByPattern",
    value: function getFilterByPattern(filterPattern) {
      var filterIdx = this.refFilterList.find(function (filter) {
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
        for (var _iterator = this.activeFilterList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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