class BlockingAction {
  //TODO : Subdivide this into BrowserAction, PageScript and PageStyle
  //Only PageScript is covered at the moment

  constructor (contentScript_details) {
    this.contentScript_details = contentScript_details
  }

  run() {
    chrome.tabs.executeScript(this.contentScript_details);
  }
}

BlockingAction.library = {
  "popUp" : new BlockingAction({ code: "alert(\"Time's up!\")" })
}
