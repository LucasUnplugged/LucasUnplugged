( function() {
	'use strict';

	angular.module( 'app.wistiaDemo' )
	.controller( 'wistiaDemoController', wistiaDemoController );

	wistiaDemoController.$inject = [
		'$rootScope',
		'$scope',
		'$route',
		'$timeout',
		'uiAnimate',
		'uploadItem',
		'getMedia',
		'ConfigDataSvc'
	];
	function wistiaDemoController(
		$rootScope,
		$scope,
		$route,
		$timeout,
		uiAnimate,
		uploadItem,
		getMedia,
		ConfigDataSvc
	) {
		var wistiaVM = this,
		    queueTimer = {},
		    apiUrl = ConfigDataSvc.initialized() ? ConfigDataSvc.apiUrl : null,
		    apiTimeout = ConfigDataSvc.initialized() ? ConfigDataSvc.apiTimeout : 5000;

		// Setup generic UI animations
		uiAnimate.generic();

		// Populate template for this scope
		wistiaVM.title = $route.current.title;
		wistiaVM.intro = $route.current.description;

		// Objects to manage uploads and video processing queue
		wistiaVM.uploading = false;
		wistiaVM.uploaded = false;
		wistiaVM.uploadMessage = '';
		wistiaVM.failMessage = '';
		wistiaVM.failedUploads = [];
		wistiaVM.uploads = {};
		wistiaVM.videoQueue = [];

		// WISTIA SERVICE EVENT LISTENERS ///////////////////////////////////////////
		// Make sure new videos are added to the existing list
		$rootScope.$on( 'videoListReturned', function( event, args ) {
			angular.merge( wistiaVM.uploads, args.uploads );
		} );

		$rootScope.$on( 'videoUploadSuccessful', function( event, args ) {
			wistiaVM.uploadMessage = args.uploadMessage;

			// If processing failed, inform the user
			if ( args.failMessage && args.failMessage.length > 0 ) {
				wistiaVM.failMessage = 'Could not process the following file(s). Please ensure your files meet size and format restrictions, and try again.';
				wistiaVM.failed.push( obj.name );

			// If the file is being processed, add it to the queue
			} else if ( args.uploadMessage && args.uploadMessage.length > 0 ) {
				wistiaVM.uploadMessage = args.uploadMessage;

				updateVideoQueue( args.videoQueue );
			}

			// Update status of upload process
			wistiaVM.uploading = args.uploading;
			wistiaVM.uploaded = args.uploaded;

			// Display uploaded message for a brief period
			$timeout( function() {
				wistiaVM.uploaded = false;
			}, 8000 );
		} );

		// Handle upload/processing errors
		$rootScope.$on( 'couldNotProcessVideo', function( event, args ) {
			wistiaVM.failMessage = args.failMessage;
			wistiaVM.failedUploads = args.failed;
		} );

		// Remove a video from the processing queue
		$rootScope.$on( 'removeVideoFromProcessQueue', function( event, args ) {
			wistiaVM.videoQueue.splice( wistiaVM.videoQueue.indexOf( args.id ), 1 );
		} );

		// Get existing list of videos
		getMedia.list( apiUrl.list, {} );

		// Setup upload dropzone
		wistiaVM.dropzoneConfig = {
			'options': {
				'url': apiUrl.upload,
				maxFilesize: 120,
				paramName: 'file',
				acceptedFiles: 'video/*',
				dictDefaultMessage: 'Drag and drop files here, or click to upload.',
				autoProcessQueue: false
			},
			'eventHandlers': {
				'addedfile': function( file ) {
					console.log( 'Adding file to upload queue...' );
					$scope.$apply( function() {
						wistiaVM.uploading = true;
					} );

					// Make an upload call to the API
					uploadItem.upload( apiUrl.upload, {}, file );
				}
			}
		};

		wistiaVM.hasUploads = function() {
			if ( wistiaVM.uploads && Object.keys( wistiaVM.uploads ).length > 0 ) {
				return true;
			}

			return false;
		};

		// Managed videos that have been queued up due to processing
		$scope.$watch( 'wistiaVM.videoQueue', function( newQueue, oldQueue ) {
			if ( newQueue.length > 0 && newQueue !== oldQueue ) {

				// Interrupt processing of queue, and reschedule processQueue
				$timeout.cancel( queueTimer );
				queueTimer = $timeout( function() {
					processQueue();
				}, apiTimeout );
			}
		}, true );

		// Process queue every 5 seconds, unless interrupted
		function processQueue() {
			var args = {},
			    index = 0;

			// Process one video at a time
			for ( index = 0; index < wistiaVM.videoQueue.length; index++ ) {
				args = { hashed_id: wistiaVM.videoQueue[ index ] };

				console.log( 'Updating ' + wistiaVM.videoQueue[ index ] + ' via API.' );

				getMedia.list( apiUrl.list, args );
			}

			// If the queue is not empty, schedule another pass
			if ( wistiaVM.videoQueue.length > 0 ) {
				$timeout.cancel( queueTimer );
				queueTimer = $timeout( function() {
					processQueue();
				}, apiTimeout );
			}
		}

		// Add new videos to the video queue
		function updateVideoQueue( newVideos ) {
			if ( angular.isArray( newVideos ) && newVideos.length > 0 ) {
				for ( var index = 0; index < newVideos.length; index++ ) {
					if ( wistiaVM.videoQueue.indexOf( newVideos[ index ] ) === -1 ) {
						wistiaVM.videoQueue.push( newVideos[ index ] );
					}
				}
			}
		}
	}
} )();
