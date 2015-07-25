// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

	
//  We won't be using fancy settings to handle the blacklist
//  var settings = new Store("Filtres", {
//   "sample_setting": "This is how you use Store.js to remember values"
//  });

var blacklist;

var refreshBlacklist = function () {
  chrome.storage.local.get('blacklist', function(item){
    if(item === undefined){
      this.blacklist = new Blacklist()
      chrome.storage.local.set({'blacklist': this.blacklist});
      console.log('Blacklist created');
    } else {
      this.blacklist = item;
    }
    console.log(this.blacklist)
  });
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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
  chrome.tabs.query({'active': true}, function (activeTabs) {
    var activeTab = activeTabs[0];

    if (activeTab == updatedTab) {
      handleTab(activeTab.url);
    }
  });
});


function handleTab(newUrl) {
	console.log("STUB: handleTab(\""+ newUrl +"\")")
}
