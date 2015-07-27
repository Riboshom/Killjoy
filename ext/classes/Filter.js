class Filter {
  constructor (filterPattern, timeAllowedPolicy, timeUpPolicy, expirationPolicy) {
    this.filterPattern = filterPattern;
    this.timeAllowedPolicy = timeAllowedPolicy;
    this.timeUpPolicy = timeUpPolicy;
    this.expirationPolicy = expirationPolicy;
  }

  matches (url) {
    // Might be a good idea to concat it with "\/?" or "\/.*",
    // though we still need to normalize URLs
    var regexString = this.filterPattern.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&')
    regexString = regexString.replace(/\*/g, '\.\*')
    var regex = new RegExp(regexString, 'i')
    return regex.test(url)
  }
}
