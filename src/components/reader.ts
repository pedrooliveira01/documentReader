const body = {
  requests: [
    {
      image: {
        content: '',
      },
      features: [
        {
          type: 'TEXT_DETECTION',
          maxResults: 5,
        }
      ]
    },
  ],
};

export async function processDocument(apiKey:any, base64: string) {  

  if (!apiKey){
    alert('API key not valid. Please pass a valid API key')
    throw 'API key not valid. Please pass a valid API key'
  }

  if (base64 && apiKey){
      body.requests[0].image.content = base64       
      
      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const parsed = await response.json();

      if (parsed && !parsed.error && parsed.responses[0]){
        const Description : string = parsed.responses[0].textAnnotations[0].description;
        const DescriptionUpper = Description.toUpperCase();
        const Result = DescriptionUpper.split('\n')
        return Result;
      } 

      if (parsed.error){
        alert(parsed.error.message)
        console.log('ERROR:', parsed.error.message)
      } else {
        console.log('ERROR:', parsed)
      }

      return undefined   
      
    } 
    
    return undefined
}