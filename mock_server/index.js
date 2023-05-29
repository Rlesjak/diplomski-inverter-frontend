const http = require('http');
const url = require('url');

http.createServer(function(req, res) {
  if (url.parse(req.url).pathname === '/stream') {
    sendSSE(req, res);
  }
}).listen(5000, function() {
  console.log('Server running at http://localhost:5000/');
});

let count = 0; // Initialize the counter

function sendSSE(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  // Allow cors
    res.setHeader('Access-Control-Allow-Origin', '*');

  const intervalId = setInterval(function() {
    const data = Array.from({length: 26}, () => 0);
    data.unshift(Math.sin((count / 10)));
    data.unshift(Math.sin((count / 10) + 2.09));
    data.unshift(Math.sin((count / 10) + 2*2.09));
    data.unshift(count.toFixed(2)); // Add the incrementing number at the start of the list
    res.write(`data: ${data.join(',')}\n\n`);

    count += 1; // Increment the counter
    if (count > Number.MAX_SAFE_INTEGER) { // Reset the counter when it reaches 10
      count = 0;
    }
  }, 2); // 2ms interval gives approximately 500 updates per second

  req.on('close', function() {
    clearInterval(intervalId);
  });
}