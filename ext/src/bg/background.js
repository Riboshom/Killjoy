// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

 var settings = new Store("settings", {
  "sample_setting": "This is how you use Store.js to remember values"
 });



//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse(settings.toObject());
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
	
	
	
}