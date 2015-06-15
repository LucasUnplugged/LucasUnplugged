var httpServer = require('http-server');

var server = httpServer.createServer({
	root:'~/',
	robots: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true'
	}
}).listen(process.env.PORT);
// this.callback(null, server);
console.log('Server running at ' + process.env.PORT);