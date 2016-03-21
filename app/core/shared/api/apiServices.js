( function() {
	'use strict';

	angular.module( 'app.service.api' )
	.service( 'apiService', apiService )
	.service( 'uploadItem', uploadItem )
	.service( 'getMedia', getMedia );

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
	uploadItem.$inject = [
		'$rootScope',
		'apiService',
		'ConfigDataSvc'
	];
	function uploadItem(
		$rootScope,
		apiService,
		ConfigDataSvc
	) {
		var apiKey = ConfigDataSvc.initialized() ? ConfigDataSvc.apiKey : null,
		    apiTimeout = ConfigDataSvc.initialized() ? ConfigDataSvc.apiTimeout : 5000;

		// Request and resolve a new upload
		function upload( url, requestArguments, file ) {
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
			uploader.api.upload( requestArguments, data ).$promise.then(

				// SUCCESS
				function( response ) {
					var eventArgs = {
						videoQueue: [],
						failed: [],
						uploadMessage: [],
						failMessage: [],
						uploading: [],
						requestCompleted: []
					};

					// Uploaded successfully
					if ( response.id && response.hashed_id ) {
						console.log( 'Successfully uploaded video file' );

						eventArgs.uploadMessage = 'Upload completed. Please see your video below.';

						// Resolve the response based on its status
						switch ( response.status ) {

							// If processing failed, inform the user
							case 'failed':
								eventArgs.failMessage = 'Could not process the following file(s). Please ensure your files meet size and format restrictions, and try again.';
								eventArgs.failed.push( obj.name );

								break;

							// If the file is being processed, add it to the queue
							case 'queued':
							case 'processing':
								eventArgs.uploadMessage = 'Your video is being processed and will be embedded shortly.';
								eventArgs.videoQueue.push( response.hashed_id );

								break;
						}

						eventArgs.uploading = false;
						eventArgs.requestCompleted = true;

						$rootScope.$emit( 'videoUploadSuccessful', eventArgs );

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
	getMedia.$inject = [
		'$rootScope',
		'apiService',
		'ConfigDataSvc'
	];
	function getMedia(
		$rootScope,
		apiService,
		ConfigDataSvc
	) {
		var apiKey = ConfigDataSvc.initialized() ? ConfigDataSvc.apiKey : null;

		// Convert JSON response to a list of objects
		function convertJsonToObj( data ) {
			var index = 0,
			    obj = {},
			    list = {},
			    eventArgs = {
					failMessage: '',
					failed: []
				};

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
						eventArgs.failMessage = 'Could not process the following file(s). Please ensure your files meet size and format restrictions, and try again.';
						eventArgs.failed.push( obj.name );

						$rootScope.$broadcast( 'couldNotProcessVideo', eventArgs );

						// Remove from processing queue
						$rootScope.$broadcast( 'removeVideoFromProcessQueue', { id: obj.id } );

						break;

					case 'ready':

						// Only return videos that are ready
						list[ data[ index ].id ] = obj;

						// Remove from processing queue
						$rootScope.$broadcast( 'removeVideoFromProcessQueue', { id: obj.id } );

						break;
				}
			}

			return list;
		}

		// Request a list of items
		function list( url, requestArguments ) {
			var getter = {},
				action = {
					method: 'GET',
					transformResponse: function( data ) {
						return convertJsonToObj( data );
					}
				};

			// Setup API $resource
			getter.api = apiService.request( url, { 'get': action } );

			// Add Wistia authentication to the request arguments
			angular.merge( requestArguments, apiKey );

			// Make request to list media
			getter.request = getter.api.get( requestArguments ).$promise.then(

				// SUCCESS
				function( response ) {
					var eventArgs = {
						uploads: {}
					};

					// Received list successfully (account for $promise and $resolved objects)
					if ( response && Object.keys( response ).length > 2 ) {
						console.log( 'Successfully received the list of media' );

						eventArgs.uploads = response;
						delete eventArgs.uploads.$promise;
						delete eventArgs.uploads.$resolved;

						$rootScope.$emit( 'videoListReturned', eventArgs );

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
