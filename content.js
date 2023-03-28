
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//alert('action:' + request.action);
    if (request.action === 'queryChatGPT') {
        let text;
        
        //
        text = document.activeElement.value;
        
        if(text === undefined) {
          text=window.getSelection().toString();
        } else {
          text = text.substring(document.activeElement.selectionStart, document.activeElement.selectionEnd);
        }
        
    //alert('text:' + text);
    if (text.startsWith('gpt:') && text.endsWith('///')) {
  //      alert('here');
      query = text.slice(4, -3).trim();
    } else {
      query = text;
    }
      // Send the query to the background script to process the API request
      //alert(query);
      chrome.runtime.sendMessage({action: 'processQuery', query: query}, (response) => {
        // Replace the selected text with the response from ChatGPT
        console.log(response.response);
        document.execCommand('insertText', false, response.response);
      });
      
    
  }
});