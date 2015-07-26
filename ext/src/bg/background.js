// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

	
//  We won't be using fancy settings to handle the blacklist
//  var settings = new Store("Filtres", {
//   "sample_setting": "This is how you use Store.js to remember values"
//  });

var refreshBlacklist = function () {
  chrome.storage.local.get('blacklist', (function(item){
    if(item.blacklist === undefined || Object.keys(item.blacklist).length === 0){
      this.blacklist = new Blacklist()
      chrome.storage.local.set({'blacklist': this.blacklist});
      console.log('Blacklist created');
    } else {
      this.blacklist = item.blacklist;
      console.log('Blacklist loaded');
    }
    console.log("Blacklist : " + JSON.stringify(this.blacklist))
  }).bind(this));
}

refreshBlacklist();

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
  console.log("Current page has changed.");
  handleTab(eventDetails.url);
});

chrome.tabs.onActivated.addListener(function(activeTab) {
  console.log("Toggeled to another tab.");
  chrome.tabs.get(activeTab.tabId, function(tabObject){
    handleTab(tabObject.url);
  });
});

function handleTab(newUrl) {
  console.log("STUB: handleTab(\""+ newUrl +"\")");
  var matchingFilters = this.blacklist.hasMatchesFor(newUrl);
  if (matchingFilters.length == 0) console.log("No matches in the Blacklist");

  matchingFilters.forEach(function(filter){
    console.log("Match with " + filter.filterPattern);
  });
}
