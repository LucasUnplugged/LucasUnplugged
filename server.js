( function() {
	'use strict';

	// modules =================================================
	var express        = require( 'express' );
	var app            = express( );
	var mongoose       = require( 'mongoose' );
	var bodyParser     = require( 'body-parser' );
	var methodOverride = require( 'method-override' );

	// configuration ===========================================

	// config files
	var db = require( './config/db' );

	var port = process.env.PORT || 8080; // set our port
	mongoose.connect( db.url );

	// get all data/stuff of the body (POST ) parameters
	app.use( bodyParser.json( ) ); // parse application/json
	app.use( bodyParser.json( { type: 'application/vnd.api+json' } ) ); // parse application/vnd.api+json as json
	app.use( bodyParser.urlencoded( { extended: true } ) ); // parse application/x-www-form-urlencoded

	app.use( methodOverride( 'X-HTTP-Method-Override' ) ); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
	app.use( '/browser-sync', express.static( __dirname + '/node_modules/grunt-browser-sync/node_modules/browser-sync/lib' ) );
	app.use( '/styles',  express.static( __dirname + '/public/assets/css' ) );
	app.use( '/scripts', express.static( __dirname + '/public/assets/libs' ) );
	app.use( '/images',  express.static( __dirname + '/public/assets/img' ) );
	app.use( express.static( __dirname + '/public' ) ); // set the static files location /public/img will be /img for users

	// routes ==================================================
	require( './app/routes' )( app ); // pass our application into our routes

	// start app ===============================================
	app.listen( port );
	console.log( 'Listening on port ' + port ); 			// shoutout to the user
	exports = module.exports = app; 						// expose app
} )();
