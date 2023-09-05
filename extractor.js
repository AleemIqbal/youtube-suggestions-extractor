chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

  console.log('Injecting script...');
  
  chrome.tabs.executeScript(tabs[0].id, {
    code: `(function() {
      
      // Get the ul
      const ul = document.querySelector('ul.sbsb_b[role="listbox"]');
  
      // Get li elements  
      const lis = ul.querySelectorAll('li.sbsb_c');

      // Extract suggestions
      let suggestions = '';

      lis.forEach(li => {
        let text;
        
        try {
          // Get text element
          const textEl = li.querySelector('div.sbqs_c');
          
          // Safety check
          if(textEl) {
            text = textEl.innerText;  
          }

        } catch(error) {
          console.log('Error getting text', error);
        }

        if(text) {
          // Add text to string separated by comma
          suggestions += text + ', ';
        }
      });

      // Remove last comma and space  
      suggestions = suggestions.slice(0, -2);

      // Log suggestions string
      console.log(suggestions);

    })();` 
  });
});