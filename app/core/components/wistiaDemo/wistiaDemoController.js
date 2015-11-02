( function() {
	'use strict';

	angular.module( 'app.wistiaDemo' )
	.controller( 'wistiaDemoController', wistiaDemoController );

	wistiaDemoController.$inject = [ '$scope', 'uiAnimate', 'appHeader', 'uploadItem', 'getMedia' ];
	function wistiaDemoController( $scope, uiAnimate, appHeader, uploadItem, getMedia ) {
		var apiUrl = 'https://upload.wistia.com',
		    requestArguments = {
				'api_password': 'e22a5ec4b06f2aceb845a7081347ce9f9b2991a7cab8870e965b3db664be5455'
			};

		// Setup generic UI animations
		uiAnimate.generic();

		// Populate template for this scope
		$scope.title = 'Wistia + Angular Demo';
		$scope.intro = 'Upload videos to a Wistia account, via their RESTful API, and embed the resulting videos.';

		// Set app header info
		appHeader.title( $scope.title + ' — ', 'prepend' );
		appHeader.desc( $scope.intro );

		// Create uploads in scope
		$scope.uploads = {};

		// Get existing list of videos
		getMedia.list( 'https://api.wistia.com/v1/medias.json', requestArguments, $scope );

		// Setup upload dropzone
		uiAnimate.setDropzone( '.dropzone' );
		$scope.dropzoneConfig = {
			'options': {
				'url': apiUrl,
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
					console.warn( 'Adding file to queue...' );
					$scope.$apply( function() {
						$scope.uploading = true;
					} );

					// Make an upload call to the API
					uploadItem.upload( apiUrl, requestArguments, file, $scope );
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
	}
} )();
