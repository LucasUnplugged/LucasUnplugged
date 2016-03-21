/* NOTE **********************
 * Thanks for checking out my code!
 * Some of the code in this section is VERY old,
 * and not indicative of my current coding skill —
 * it was addapted from my pre-Angular days, hence
 * the ugly use of jQuery in here.
 *
 * If you'd like to see more recent code, check out my GitHub profile:
 * https://github.com/LucasUnplugged/
 */

( function() {
	'use strict';

	angular.module( 'app.home' )
	.controller( 'homeController', homeController );

	homeController.$inject = [ 'uiAnimate' ];
	function homeController( uiAnimate ) {
		var scrollTop = {},
			main = jQuery( '#main' ),
			bg = jQuery( '#bg' ),
			target = main.offset().top - bg.innerHeight();

		// Setup generic UI animations
		uiAnimate.generic();

		// Animations and adjustments made based on scrolling position
		function scrollAdjustments() {
			scrollTop = jQuery( window ).scrollTop();

			// Sync the position of the fancy background with the initial blurb
			if ( scrollTop >= target ) {
				bg.css( 'position', 'absolute' );
				bg.css( 'top', target );
			} else {
				bg.css( 'top', 0 );
				bg.css( 'position', 'fixed' );
			}
		}

		jQuery( document ).scroll( function() {
			scrollAdjustments();
		} );
		jQuery( window ).resize( function() {
			target = main.offset().top - bg.innerHeight();
			scrollAdjustments();
		} );

		jQuery( document ).ready( function() {
			setTimeout( function() {
				target = main.offset().top - bg.innerHeight();
				scrollAdjustments();
			}, 200 );
		} ); // END of jQuery( document ).ready

		/**
		 * Temporarily display form messages
		 * @param {string} formId	ID attr of the form to add the message to
		 * @param {string} text		Message to add
		 */
		function formMessage( formId, text ) {
			jQuery( formId + ' .messageBox' ).html( text );

			var fade = setInterval( function() {
				formMessage( formId, '' );
				clearInterval( fade );
			}, 5000 );
		}

		// Stops default form behaviour to prevent spam
		jQuery( 'form' ).submit( function( e ) {
			e.preventDefault();
		} );

		// SUBMIT via a button instead
		jQuery( '[type="submit"]' ).click( function( e ) {
			e.preventDefault();
			var formId = '#' + jQuery( this ).attr( 'form' );
			var data = jQuery( formId ).serializeArray();
			var emailReg = /^( [ \w-\. ]+@( [ \w- ]+\. )+[ \w- ]{2,4} )?$/;

			formMessage( formId, '<span>Processing...</span>' );

			if ( data[ 1 ].value === '' || data[ 2 ].value === '' ) {
				formMessage( formId, '<span class="fail">Oops, you missed a mandatory field!</span>' );
			} else if ( !emailReg.test( data[ 2 ].value ) ) {
				formMessage( formId, '<span class="fail">Please enter a valid email address.</span>' );
			}else { // Everything looks fine
				$.post( 'http://lucasunplugged.com/mail/', data, function( data,status ) {
					if ( status === 'success' ) {
						formMessage( formId, '<span class="success">Success!</span>' );
					} else {
						formMessage( formId, '<span class="fail">Oops, something went wrong. Please try again.</span>' );
					}
				} );
			}

		} );
	}

} )();
