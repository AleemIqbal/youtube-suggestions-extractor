chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getSuggestions") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: extractSuggestions
      }, (injectionResults) => {
        for (const frameResult of injectionResults)
          sendResponse({suggestions: frameResult.result});
      });
    });
    return true; // Will respond asynchronously.
  }
});

function extractSuggestions() {
  var suggestionElements = document.querySelectorAll('.sbqs_c');
  return Array.from(suggestionElements).map(element => element.textContent.trim());
}
