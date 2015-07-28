// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

	
//  We won't be using fancy settings to handle the blacklist
//  var settings = new Store("Filtres", {
//   "sample_setting": "This is how you use Store.js to remember values"
//  });

/* TODO :
    Expiration alarms
    What to do on browser close or sleep
*/

var expirationPrefix = "¤"

var defaultFilters = [
  new Filter("*github.com*",
    new TimePolicy("AFTER", 1),
    BlockingAction.library.popUp,
    new TimePolicy("AFTER", 1.5)),
];

//var defaultFilters = [];

var refreshBlacklist = function () {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get('blacklist', (function(item){
      if(item.blacklist === undefined || Object.keys(item.blacklist).length === 0){
        this.blacklist = new Blacklist(defaultFilters)
        chrome.storage.local.set({'blacklist': this.blacklist});
        console.log('Blacklist created');
        resolve(this.blacklist)
      } else {
        this.blacklist = item.blacklist;
        this.blacklist.__proto__ = Blacklist.prototype;
        this.blacklist.restorePrototypes();
        console.log('Blacklist loaded');
        resolve(this.blacklist)
      }
    }).bind(this));
  }.bind(this));
}

chrome.storage.local.remove('blacklist', function() {
refreshBlacklist();
});

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    sendResponse({obj : blacklist});
  });

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
      handleTab(tab.url);
  });
});

chrome.webNavigation.onCommitted.addListener(function(eventDetails){
  handleTab(eventDetails.url);
});

/*
chrome.tabs.onActivated.addListener(function(activeTab) {
  chrome.tabs.get(activeTab.tabId, function(tabObject){
    handleTab(tabObject.url);
  });
});
*/

chrome.alarms.onAlarm.addListener(function(alarm){
  if(alarm.name.indexOf(expirationPrefix) === 0) {
    var filter = blacklist.getFilterByPattern(alarm.name.substring(expirationPrefix.length))
    blacklist.deactivate(filter)
  } else {
    alarmCallback(alarm)
  }
})

function alarmCallback(alarm) {
  refreshBlacklist().then(function(blacklist){
    var filter = blacklist.getFilterByPattern(alarm.name)
    console.log(JSON.stringify(filter))
    filter.timeUpPolicy.run()
  }.bind())
}

function handleTab(newUrl) {
  blacklist.disengageActiveFilters().then(function() {
    var matchingFilters = this.blacklist.hasMatchesFor(newUrl);
    if (matchingFilters.length == 0) console.log("\""+ newUrl +"\": No matches in the Blacklist");

    matchingFilters.forEach(function(filter){
      this.blacklist.activateFilter(filter)
    });
  })
}
