class Filter {
    constructor (filterPattern, timeAllowed, timeUpPolicy, expirationPolicy) {
        this.filterPattern = filterPattern;
        this.timeAllowed = timeAllowed;
        this.timeUpPolicy = timeUpPolicy;
        this.expirationPolicy = expirationPolicy;
    }
}
