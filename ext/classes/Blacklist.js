class Blacklist {
    constructor (filterList = [], activeFilters = []) {
      this.refFilterList = filterList;
      this.activeFilterList = activeFilters;
      // There was a Proxy here once, but it only served
      // to make things more complicated on both ends.
    }

    add(filter) {
      refFilterList.push(filter)
    }

    remove(soughtFilter) {
      var refIdx = this.refFilterList.findIndex(filter => filter === soughtFilter);
      var activeIdx = this.activeFilterList.findIndex(activeFilter => activeFilter.filter === soughtFilter);
      if (refIdx > -1) this.refFilterList.splice(refIdx, 1);
      if (activeIdx > -1) this.activeFilterList.splice(activeIdx, 1);
    }

    hasMatchesFor(url) {
      return this.refFilterList.filter(function(filter) {
        return filter.matches(url);
      });
    }

    activateFilter(filter) {
      var afListIdx = this.activeFilterList.findIndex(activeFilter => activeFilter.filter === filter)
      //Append the filter if it isn't there and update the target index to match
      if (afListIdx == -1) afListIdx = this.activeFilterList.push(new ActiveFilter(filter)) - 1;
      return this.activeFilterList[afListIdx].engage();
    }

    getFilterByPattern(filterPattern) {
      var filterIdx = this.refFilterList.findIndex(filter => filter.filterPattern === filterPattern)
      return refFilterList[filterIdx]
    }

    disengageActiveFilters() {
      console.log(JSON.stringify(this.activeFilterList))
      var promises = []
      this.activeFilterList.forEach(function (activeFilter){ promises.push(activeFilter.disengage()) })
      return Promise.all(promises)
    }

    restorePrototypes() {
      this.activeFilterList.forEach(function (activeFilter){ activeFilter.__proto__ = ActiveFilter.prototype })
      this.refFilterList.forEach(function (filter){
        filter.__proto__ = Filter.prototype
        filter.timeAllowedPolicy.__proto__ = TimePolicy.prototype
        filter.expirationPolicy.__proto__ = TimePolicy.prototype
      })
    }
}
