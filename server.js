var httpServer = require('http-server');
var port = (process.env.PORT) ? process.env.PORT : 4000;
var server = httpServer.createServer({
   robots: true,
   headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
   }
}).listen(port);
// this.callback(null, server);
console.log('Server running at ' + port);
