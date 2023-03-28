
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
if (request.action === 'queryChatGPT') {
  let text;
      
  text = document.activeElement.value;
        
  if(text === undefined) {
    text=window.getSelection().toString();
  } else {
    text = text.substring(document.activeElement.selectionStart, document.activeElement.selectionEnd);
  }
        
    
  if (text.startsWith('gpt:') && text.endsWith('///')) {
    query = text.slice(4, -3).trim();
  } else {
    query = text;
  }
  // Send the query to the background script to process the API request
  chrome.runtime.sendMessage({action: 'processQuery', query: query}, (response) => {
    // Replace the selected text with the response from ChatGPT
    document.execCommand('insertText', false, response.response);
  });  
}
});
