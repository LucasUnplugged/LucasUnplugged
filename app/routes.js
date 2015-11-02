( function() {
	'use strict';
	module.exports = function( app ) {

		// server routes ===========================================================
		// handle things like api calls
		// authentication routes
		// frontend routes =========================================================
		// route to handle all angular requests
		app.get( '*', function( req, res ) {
			console.log( 'Loading single-page AngularJS app...' );

			// Send our AngularJS single-page app
			res.sendfile( './public/index.html' );
		} );
	};
}() );
