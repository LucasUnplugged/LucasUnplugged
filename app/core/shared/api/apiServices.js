( function() {
	'use strict';

	angular.module( 'app.service.api' )
	.factory( 'apiService', apiService )
	.factory( 'uploadItem', uploadItem )
	.factory( 'getMedia', getMedia );

	// Service to make API $resource requests
	apiService.$inject = [ '$resource', '$http' ];
	function apiService( $resource, $http ) {
		function request( url, action ) {

			// $http.defaults.headers.common.Authorization = 'Basic' + AuthenticationService.GetAuthString();
			console.log( 'Creating API request to ' + url + '...' );
			return $resource( url, {}, action );
		}

		return {
			request: request
		};
	}

	// Service to handle uploading
	uploadItem.$inject = [ 'apiService' ];
	function uploadItem( apiService ) {

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

			// Make request to upload item
			uploader.request = uploader.api.upload( requestArguments, data )
			.$promise.then(

				// SUCCESS
				function( response ) {
					// console.log( response );

					// Uploaded successfully
					if ( response.id && response.hashed_id ) {
						console.log( 'Successfully uploaded video file' );

						scope.uploads[ response.id ] = {
							id: response.hashed_id,
							name: response.name,
							thumbnail: ( response.thumbnail ) ? response.thumbnail : {},
							date: response.updated
						};

						scope.uploading = false;
						scope.uploaded = true;
						setTimeout( function() {
							scope.uploaded = false;
						}, 3000 );

					// Could not upload
					} else {
						console.error( response.description );
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
	getMedia.$inject = [ 'apiService' ];
	function getMedia( apiService ) {

		// Convert JSON response to a list of objects
		function processList( data ) {
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

				list[ data[ index ].id ] = obj;
			}

			return list;
		}

		// Request a list of items
		function list( url, requestArguments, scope ) {
			var getter = {},
				action = {
					method: 'GET',
					transformResponse: processList
				};

			// Setup API $resource
			getter.api = apiService.request( url, { 'get': action } );
			console.log( '\nGetting list of media from ' + url + '...' );

			// Make request to list media
			getter.request = getter.api.get( requestArguments )
			.$promise.then(

				// SUCCESS
				function( response ) {
					// console.log( response );

					// Received list successfully (account for $promise and $resolved objects)
					if ( response && Object.keys( response ).length > 2 ) {
						console.log( 'Successfully received the list of media' );
						scope.uploads = response;
						delete scope.uploads.$promise;
						delete scope.uploads.$resolved;

					// Could not receive list
					} else {
						console.error( response.description );
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
