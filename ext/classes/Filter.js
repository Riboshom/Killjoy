class Filter {
    constructor (filterPattern, timeAllowed, timeUpPolicy, expirationPolicy) {
        this.filterPattern = filterPattern;
        this.timeAllowed = timeAllowed;
        this.timeUpPolicy = timeUpPolicy;
        this.expirationPolicy = expirationPolicy;
    }
}

class ActiveFilter {
    constructor (filter) {
        this.filter = filter;
        this.timeOfActivation = new Date();
        this.timeSpent = 0;
    }

    function engage() {

    }

    function disengage() {

    }
    
}


// If you remove a filter, it should rebuild the mask by checking the index of the Active Filter's filter


class Blacklist {
    constructor (editingParameters, filterList, activeFilters) {
        if(typeof filterList !== "undefined") {
            this.refFilterList = filterList;
        } else {
            this.refFilterList = [];
        }

        if(typeof activeFilters !== "undefined") {
            // Not quite sure how it's gonna work from there on
            // I guess we would have to assume that the filter pointers are still accurate? Hmm...
        } else {
            activeFilters = [];
        }
        
        //Something about the parameter edition, I haven't decided about how that'd work.

        //this.filterMask
        //this.filterList
    }

    function add(filter) {

    }

    function remove(filter) {

    }

    function hasMatchesFor(url) {

    }

    function activateFilter(filter) {

    }

    function getFilterByPattern(filterPattern) {

    }

    function disengageActiveFilters() {

    }
}
