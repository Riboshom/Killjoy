class Filter {
  constructor (filterPattern, timeAllowed, timeUpPolicy, expirationPolicy) {
    this.filterPattern = filterPattern;
    this.timeAllowed = timeAllowed;
    this.timeUpPolicy = timeUpPolicy;
    this.expirationPolicy = expirationPolicy;
  }

  matches (url) {
    // Might be a good idea to concat it with "\/?" or "\/.*",
    // though we still need to normalize URLs
    var regexString = this.filterPattern.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&')
    regexString = regexString.replace(/\*/g, '\.\*')
    var regex = new RegExp(regexString, 'i')
    console.log("Regex : "+ regex.source)
    console.log("String : "+ url)
    console.log("Passes? : "+ regex.test(url))
    return regex.test(url)
  }
}
