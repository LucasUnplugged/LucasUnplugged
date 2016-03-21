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

		return {
			generic: generic
		};
	}
} )();
