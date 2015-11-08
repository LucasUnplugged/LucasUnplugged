( function() {
	'use strict';

	angular.module( 'app.service.api' )
	.constant( 'apiUrl', { upload: 'https://upload.wistia.com', list: 'https://api.wistia.com/v1/medias.json' } )
	.constant( 'apiKey', { api_password: 'e22a5ec4b06f2aceb845a7081347ce9f9b2991a7cab8870e965b3db664be5455' } )
	.constant( 'apiTimeout', 5000 )
	.factory( 'apiService', apiService )
	.factory( 'uploadItem', uploadItem )
	.factory( 'getMedia', getMedia );

	// Service to make API $resource requests
	apiService.$inject = [ '$resource', '$http' ];
	function apiService( $resource ) {
		function request( url, action ) {
			return $resource( url, {}, action );
		}

		return {
			request: request
		};
	}

	// Service to handle uploading
	uploadItem.$inject = [ 'apiService', 'apiKey', 'apiTimeout' ];
	function uploadItem( apiService, apiKey, apiTimeout ) {

		// Request and resolve a new upload
		function upload( url, requestArguments, file, scope ) {
			var uploader = {},
				action = {
					method: 'POST',
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined
					}
				},
				data = new FormData();

			// Prepare data as a multi-part form
			data.append( 'file', file );

			// Setup API $resource
			uploader.api = apiService.request( url, { 'upload': action } );
			console.log( '\nUploading to ' + url + '...' );

			// Add Wistia authentication to the request arguments
			angular.merge( requestArguments, apiKey );

			// Make request to upload item
			uploader.request = uploader.api.upload( requestArguments, data )
			.$promise.then(

				// SUCCESS
				function( response ) {

					// console.log( response );

					// Uploaded successfully
					if ( response.id && response.hashed_id ) {
						console.log( 'Successfully uploaded video file' );

						if ( !scope.videoQueue ) {
							scope.videoQueue = [];
						}
						if ( !scope.failed ) {
							scope.failed = [];
						}

						scope.uploadMessage = 'Upload completed. Please see your video below.';

						// Resolve the response based on its status
						switch ( response.status ) {

							// If processing failed, inform the user
							case 'failed':
								scope.failMessage = 'Could not process the following file(s). Please ensure your files meet size and format restrictions, and try again.';
								scope.failed.push( obj.name );

								break;

							// If the file is being processed, add it to the queue
							case 'queued':
							case 'processing':
								scope.uploadMessage = 'Your video is being processed and will be momentarily embedded below.';
								scope.videoQueue.push( response.hashed_id );

								break;
						}

						scope.uploading = false;
						scope.uploaded = true;
						setTimeout( function() {
							scope.uploaded = false;
						}, apiTimeout );

					// Could not upload
					} else {
						console.warn( 'Could not upload.', response );
					}
				},

				// FAILURE
				function( error ) {
					console.error( error.data );
				}
			);
		}

		return {
			upload: upload
		};
	}

	// Service to get media
	getMedia.$inject = [ 'apiService', 'apiKey' ];
	function getMedia( apiService, apiKey ) {

		// Convert JSON response to a list of objects
		function convertJsonToObj( data, scope ) {
			var index = 0,
			    obj = {},
			    list = {};

			data = angular.fromJson( data );

			for ( index = 0; index < data.length; index++ ) {
				obj = {};
				obj.id = data[ index ].hashed_id;
				obj.name = data[ index ].name;
				obj.thumbnail = data[ index ].thumbnail;
				obj.date = data[ index ].updated;
				obj.status = data[ index ].status;

				// Remove videos that have been processed from the queue
				switch ( obj.status ) {
					case 'failed':
						scope.failMessage = 'Could not process the following file(s). Please ensure your files meet size and format restrictions, and try again.';
						scope.failed.push( obj.name );

						// Remove from processing queue
						scope.videoQueue.splice( scope.videoQueue.indexOf( obj.id ) , 1 );

						break;

					case 'ready':

						// Only return videos that are ready
						list[ data[ index ].id ] = obj;

						// Remove from processing queue
						scope.videoQueue.splice( scope.videoQueue.indexOf( obj.id ) , 1 );

						break;
				}
			}

			return list;
		}

		// Request a list of items
		function list( url, requestArguments, scope ) {
			var getter = {},
				action = {
					method: 'GET',
					transformResponse: function( data ) {
						return convertJsonToObj( data, scope );
					}
				};

			// Setup API $resource
			getter.api = apiService.request( url, { 'get': action } );

			// Add Wistia authentication to the request arguments
			angular.merge( requestArguments, apiKey );

			// Make request to list media
			getter.request = getter.api.get( requestArguments )
			.$promise.then(

				// SUCCESS
				function( response ) {

					// console.log( response );

					// Received list successfully (account for $promise and $resolved objects)
					if ( response && Object.keys( response ).length > 2 ) {
						console.log( 'Successfully received the list of media' );

						// Ensure that the necessary scope variables are defined
						if ( !scope.uploads ) {
							scope.uploads = {};
						}

						// Make sure all videos are in the scope
						angular.extend( scope.uploads, response );
						delete scope.uploads.$promise;
						delete scope.uploads.$resolved;

					// Could not receive list
					} else {
						console.warn( 'Could not receive list.', response );
					}
				},

				// FAILURE
				function( error ) {
					console.error( error.data );
				}
			);
		}

		return {
			list: list
		};
	}

} )();
