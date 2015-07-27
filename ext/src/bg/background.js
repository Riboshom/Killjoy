// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

	
//  We won't be using fancy settings to handle the blacklist
//  var settings = new Store("Filtres", {
//   "sample_setting": "This is how you use Store.js to remember values"
//  });

/* TODO :
    Injecting content scripts
    Reacting to alarms
    Expiration alarms
    What to do on browser close or sleep
*/

var defaultFilters = [
  new Filter("*github.com*",
    new TimePolicy("AFTER", 0),
    BlockingAction.popUp,
    new TimePolicy("AFTER", 600)),
];
//var defaultFilters = [];

var refreshBlacklist = function () {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get('blacklist', (function(item){
      if(item.blacklist === undefined || Object.keys(item.blacklist).length === 0){
        this.blacklist = new Blacklist(defaultFilters)
        chrome.storage.local.set({'blacklist': this.blacklist});
        console.log('Blacklist created');
        resolve()
      } else {
        this.blacklist = item.blacklist;
        this.blacklist.__proto__ = Blacklist.prototype;
        this.blacklist.restorePrototypes();
        console.log('Blacklist loaded');
        resolve(blacklist)
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

chrome.tabs.onActivated.addListener(function(activeTab) {
  chrome.tabs.get(activeTab.tabId, function(tabObject){
    handleTab(tabObject.url);
  });
});

chrome.alarms.onAlarm.addListener(function(alarm){
  var isExpirationTimer = false;
  if(isExpirationTimer) {
    //Placeholder for expiration alarms
  } else {
    alarmCallback(alarm)
  }
})

function alarmCallback(alarm) {
  refreshBlacklist().then(function(blacklist){
    var filter = blacklist.getFilterByPattern(alarm.name)
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
