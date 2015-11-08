( function() {
	'use strict';

	angular.module( 'app.wistiaDemo' )
	.controller( 'wistiaDemoController', wistiaDemoController );

	wistiaDemoController.$inject = [ '$scope', '$route', 'uiAnimate', 'uploadItem', 'getMedia', 'apiUrl', 'apiTimeout' ];
	function wistiaDemoController( $scope, $route, uiAnimate, uploadItem, getMedia, apiUrl, apiTimeout ) {
		var queueTimer = {};

		// Setup generic UI animations
		uiAnimate.generic();

		// Populate template for this scope
		$scope.title = $route.current.title;
		$scope.intro = $route.current.description;

		// Create uploads in scope
		$scope.uploads = {};

		// Use an array to keep track of videos that fail to upload/process
		$scope.failed = [];

		// Get existing list of videos
		getMedia.list( apiUrl.list, {}, $scope );

		// Setup upload dropzone
		uiAnimate.setDropzone( '.dropzone' );
		$scope.dropzoneConfig = {
			'options': {
				'url': apiUrl.upload,
				maxFilesize: 120,
				paramName: 'file',
				acceptedFiles: 'video/*',
				dictDefaultMessage: 'Drag and drop files here, or click to upload.',
				previewsContainer: '.upload-preview',

				// parallelUploads: 1,
				autoProcessQueue: false
			},
			'eventHandlers': {
				'addedfile': function( file ) {
					console.log( 'Adding file to upload queue...' );
					$scope.$apply( function() {
						$scope.uploading = true;
					} );

					// Make an upload call to the API
					uploadItem.upload( apiUrl.upload, {}, file, $scope );
				}
			}
		};
		$scope.uploading = false;
		$scope.uploaded = false;

		$scope.hasUploads = function() {
			if ( $scope.uploads && Object.keys( $scope.uploads ).length > 0 ) {
				return true;
			}

			return false;
		};

		// Managed videos that have been queued up due to processing
		$scope.videoQueue = [];
		$scope.$watch( 'videoQueue', function( newQueue, oldQueue ) {
			if ( newQueue.length > 0 && newQueue !== oldQueue ) {

				// Interrupt processing of queue, and reschedule processQueue
				clearTimeout( queueTimer );
				queueTimer = setTimeout( function() {
					processQueue( $scope );
				}, apiTimeout );
			}
		}, true );

		// Process queue every 5 seconds, unless interrupted
		function processQueue( scope ) {
			var args = {},
			    index = 0;

			// Process one video at a time
			for ( index = 0; index < scope.videoQueue.length; index++ ) {
				args = { hashed_id: scope.videoQueue[ index ] };

				console.log( 'Updating ' + scope.videoQueue[ index ] + ' via API.' );

				getMedia.list( apiUrl.list, args, scope );
			}

			// If the queue is not empty, schedule another pass
			if ( scope.videoQueue.length > 0 ) {
				clearTimeout( queueTimer );
				queueTimer = setTimeout( function() {
					processQueue( scope );
				}, apiTimeout );
			}
		}
	}
} )();
