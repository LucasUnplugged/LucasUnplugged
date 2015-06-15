var httpServer = require('http-server');

var server = httpServer.createServer({
	root:'~/',
	robots: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true'
	}
}).listen(8888, '127.0.0.1');
// this.callback(null, server);
console.log('Server running at http://127.0.0.1:8888');