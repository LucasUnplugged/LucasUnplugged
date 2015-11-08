( function() {
	'use strict';

	angular.module( 'app.utils' )
	.factory( 'uiAnimate', uiAnimate );

	function uiAnimate() {
		function generic() {

			// Scrolls smoothly from the top menu
			jQuery( 'a[href^="#"]' ).unbind().click( function() {

				// Check if the click was on a portfolio project
				if ( jQuery( this ).hasClass( 'project' ) ) {
					return false;
				} else {
					var targetId = jQuery( this ).attr( 'href' );
					jQuery( 'body,html' ).animate( { scrollTop: jQuery( targetId ).offset().top - 60 }, 'slow' );
					return false;
				}
			} );

			// Expand collapsed content
			jQuery( '.break .expand' ).unbind().click( function() {

				// Expand or collapse the related element
				var targetId = jQuery( this ).attr( 'href' );

				jQuery( targetId ).toggleClass( 'collapse expand' );
				jQuery( this ).toggleClass( 'collapse expand' );

				if ( jQuery( this ).html() === '+' ) {
					jQuery( this ).html( '&ndash;' );
				} else {
					jQuery( this ).html( '+' );
				}
				return false;
			} );
		}

		/**
		 * Sets up a dropzone, to toggle when it is active or not
		 *
		 * @param {string}		dzSelector		The ID/class selector used to target a dropzone
		 */
		function setDropzone( dzSelector ) {

			// Default to '.dropzone' selector
			if ( !dzSelector ) {
				dzSelector = '.dropzone';
			}

			var dropzone = angular.element( document.querySelector( dzSelector ) ),
			    eventUtil = {
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

			function toggleZone( event, method ) {
				var target = eventUtil.getCurrentTarget( event );

				if ( method === 'add' && !target.classList.contains( 'active' ) ) {
					target.classList.add( 'active' );
				} else if ( method === 'remove' && target.classList.contains( 'active' ) ) {
					target.classList.remove( 'active' );
				}
			}

			// Setup class-based toggling of dropzone activity
			if ( dropzone[ 0 ] ) {
				dropzone = dropzone[ 0 ];

				eventUtil.addHandler( dropzone, 'dragover', function( event ) {
					toggleZone( event, 'add' );
				} );
				eventUtil.addHandler( dropzone, 'dragenter', function( event ) {
					toggleZone( event, 'add' );
				} );

				eventUtil.addHandler( dropzone, 'dragleave', function( event ) {
					toggleZone( event, 'remove' );
				} );
				eventUtil.addHandler( dropzone, 'dragend', function( event ) {
					toggleZone( event, 'remove' );
				} );
				eventUtil.addHandler( dropzone, 'drop', function( event ) {
					toggleZone( event, 'remove' );
				} );
			}

		}

		return {
			generic: generic,
			setDropzone: setDropzone
		};
	}
} )();
