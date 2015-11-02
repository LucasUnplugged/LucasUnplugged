( function() {
	'use strict';
	var mongoose = require( 'mongoose' );

	// Define sample data model
	// module.exports allows us to pass this to other files when it is called
	module.exports = mongoose.model( 'sampleData', {
		name: {
			id: Number,
			type: String,
			name: String,
			default: ''
		}
	} );
}() );
