chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "extractSuggestions") {
    var suggestions = extractSuggestions(document.body.innerHTML);
    sendResponse({suggestions: suggestions});
  }
});

function extractSuggestions(htmlString) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(htmlString, 'text/html');
  var suggestionElements = doc.querySelectorAll('.sbqs_c');
  return Array.from(suggestionElements).map(element => element.textContent.trim());
}
