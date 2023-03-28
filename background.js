    /*async function fetchGPTResponse(query) {
      console.error('here4');
      const openai = require('openai');
      openai.apiKey = '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';

      try {
        const result = await openai.Completion.create({
          engine: 'text-davinci-002',
          prompt: query,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 1,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        return result.choices[0].text.trim();
      } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        return 'Error: Unable to process query.';
      }
    }*/
    async function fetchGPTResponse(query) {
      
      const apiKey = 'your-api-key-here';
      const url = 'https://api.openai.com/v1/completions';
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      });
    
      const body = JSON.stringify({
        model: "text-davinci-003",
        prompt: query,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: body,
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
    
        const result = await response.json();
        console.log(result.choices[0].text.trim());
        return result.choices[0].text.trim();
        
      } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        return 'Error: Unable to process query.';
      }
    }


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.error(request);
  if (request.action === 'processQuery') {
    const query = request.query;
    
    fetchGPTResponse(query).then((response) => {
      sendResponse({response: response});
    });
    
    return true; // Indicate that the response will be sent asynchronously
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {action: 'queryChatGPT'});
});

