( function() {
	'use strict';

	angular.module( 'app.utils' )
	.directive( 'dropZone', dropZone )
	.controller( 'dropzoneController', dropzoneController );

	function dropZone() {
		return {
			restrict: 'E',
			scope: {
				config: '=',
				showLoading: '='
			},
			templateUrl: 'shared/views/dropZone.html',
			controller: 'dropzoneController',
			controllerAs: 'dropzoneVM'
		};
	}

	dropzoneController.$inject = [
		'$scope',
		'$element'
	];
	function dropzoneController(
		$scope,
		$element
	) {

		// Create a Dropzone for the element with the given options
		var dropzoneVM = this,
		    dropzoneElement = angular.element( $element[ 0 ].querySelector( '.dropzone' ) ),
		    configOptions = angular.merge( $scope.config.options, { previewsContainer: '.upload-preview' } ),
		    dropzone = new Dropzone( dropzoneElement[ 0 ], configOptions ),
		    dropzoneEventHelpers = {
				addHandler: function( element, type, handler ) {
					if ( element.addEventListener ) {
						element.addEventListener( type, handler, false );
					} else if ( element.attachEvent ) {
						element.attachEvent( 'on' + type, handler );
					} else {
						element[ 'on' + type ] = handler;
					}
				},
				getCurrentTarget: function( event ) {
					if ( event.toElement ) {
						return event.toElement;
					} else if ( event.currentTarget ) {
						return event.currentTarget;
					} else if ( event.srcElement ) {
						return event.srcElement;
					} else {
						return null;
					}
				}
			};

		// Bind the given event handlers to the dropzone
		angular.forEach( $scope.config.eventHandlers, function( handler, event ) {
			dropzone.on( event, handler );
		} );

		// Setter for updating the dropzone's state
		function setDropzoneState( event, method ) {
			var target = dropzoneEventHelpers.getCurrentTarget( event );

			if ( method === 'add' && !target.classList.contains( 'active' ) ) {
				target.classList.add( 'active' );
			} else if ( method === 'remove' && target.classList.contains( 'active' ) ) {
				target.classList.remove( 'active' );
			}
		}

		// Setup class-based state toggling of dropzone, based on user interaction
		if ( dropzoneElement[ 0 ] ) {
			dropzoneElement = dropzoneElement[ 0 ];

			dropzoneEventHelpers.addHandler( dropzoneElement, 'dragover', function( event ) {
				setDropzoneState( event, 'add' );
			} );
			dropzoneEventHelpers.addHandler( dropzoneElement, 'dragenter', function( event ) {
				setDropzoneState( event, 'add' );
			} );

			dropzoneEventHelpers.addHandler( dropzoneElement, 'dragleave', function( event ) {
				setDropzoneState( event, 'remove' );
			} );
			dropzoneEventHelpers.addHandler( dropzoneElement, 'dragend', function( event ) {
				setDropzoneState( event, 'remove' );
			} );
			dropzoneEventHelpers.addHandler( dropzoneElement, 'drop', function( event ) {
				setDropzoneState( event, 'remove' );
			} );
		}
	}
} )();
