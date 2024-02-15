document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.sendMessage({action: "getSuggestions"}, function(response) {
    displaySuggestions(response.suggestions);
  });

  document.getElementById('copyAllButton').addEventListener('click', function() {
    copyAllToClipboard();
  });
});

function displaySuggestions(suggestions) {
  var box = document.getElementById('suggestionsBox');
  box.innerHTML = suggestions.map(s => `<a href="#" class="list-group-item list-group-item-action">${s}</a>`).join('');

  // Individual copy functionality remains the same
  box.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', function() {
      copyToClipboard(this.textContent);
    });
  });
}

function copyAllToClipboard() {
  var suggestionsText = Array.from(document.querySelectorAll('#suggestionsBox .list-group-item'))
                              .map(element => element.textContent.trim())
                              .join('\n');
  navigator.clipboard.writeText(suggestionsText).then(function() {
    console.log('All suggestions copied to clipboard!');
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    console.log('Copied to clipboard: ' + text);
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
}
