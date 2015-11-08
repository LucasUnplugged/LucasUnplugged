( function() {
	'use strict';

	angular.module( 'app.utils' )
	.factory( 'appLib', appLib );

	function appLib() {
		function load( targetFile ) {
			var xhr = {};

			// Create XHR request
			if ( window.XMLHttpRequest ) {
				xhr = new XMLHttpRequest();
			} else {
				xhr = new ActiveXObject( 'Microsoft.XMLHTTP' );
			}

			// Setup XHR request
			xhr.onreadystatechange = function() {
				if ( xhr.readyState === XMLHttpRequest.DONE ) {
					if ( xhr.status === 200 ) {
						console.log( 'File (' + targetFile + ') loaded successfully.' );
						return xhr.responseText;
					} else if ( xhr.status === 400 ) {
						console.error( 'Could not find file ' + targetFile + '.' );
					} else {
						console.error( 'Could not load file ' + targetFile + '.' );
					}
				}
			};

			// Make the request to get the file
			xhr.open( 'GET', targetFile, true );
			xhr.send();

			return false;
		}

		return {
			load: load
		};
	}
} )();
