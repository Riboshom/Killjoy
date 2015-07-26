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
      var refIdx = this.refFilterList.find(filter => filter === soughtFilter);
      var activeIdx = this.activeFilterList.find(activeFilter => activeFilter.filter === soughtFilter);
      if (refIdx > -1) this.refFilterList.splice(refIdx, 1);
      if (activeIdx > -1) this.activeFilterList.splice(activeIdx, 1);
    }

    hasMatchesFor(url) {
      return this.refFilterList.filter(function(filter) {
        return filter.matches(url);
      });
    }

    activateFilter(filter) {
      var afListIdx = this.activeFilterList.find(activeFilter => activeFilter.filter === filter)
      if (afListIdx > -1) afListIdx = this.activeFilterList.push(new ActiveFilter(filter)) - 1;
      this.activeFilterList[afListIdx].engage();
    }

    getFilterByPattern(filterPattern) {
      var filterIdx = this.refFilterList.find(filter => filter.filterPattern === filterPattern)
      return refFilterList[filterIdx]
    }

    disengageActiveFilters() {
      for (activeFilter of this.activeFilterList) activeFilter.disengage()
    }
}
