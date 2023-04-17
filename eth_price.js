const https = require('https');
const querystring = require('querystring');

// Replace YOUR_API_KEY with your actual Etherscan API key
const api_key = "T3FZ8Y8MX6FR7XFMPMTA97AYVADHRG58NR";

// Construct the API endpoint URL for getting the current ETH price
const url = `https://api.etherscan.io/api?${querystring.stringify({
  module: 'stats',
  action: 'ethprice',
  apikey: api_key
})}`;

// Send an HTTPS GET request to the endpoint URL
https.get(url, response => {
  
  let data = '';
  
  // Collect the response data in chunks
  response.on('data', chunk => {
    data += chunk;
  });

  // Parse the response data as JSON when it finishes
  response.on('end', () => {
    const response_data = JSON.parse(data);
    
    // Extract the current ETH price from the response data
    const eth_price = response_data.result.ethusd;
    
    // Output the current ETH price to the console
    console.log(`Current ETH price: ${eth_price}`);
  });

}).on("error", error => {
  console.error(error);
});