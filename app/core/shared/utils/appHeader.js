( function() {
	'use strict';

	angular.module( 'app.utils' )
	.controller( 'headerController', headerController )
	.factory( 'appHeader', appHeader )
	.constant( 'defaultTitle', 'Software Developer : Lucas Castro (Angular, Front-End, Engineer, UI, UX, Node)' )
	.constant ( 'defaultDescription', 'Lucas Castro is a Software Developer specializing in Front-End development.' );

	headerController.$inject = [ '$scope', 'appHeader' ];
	function headerController( $scope, appHeader ) {
		$scope.appHeader = appHeader;
	}

	appHeader.$inject = [ 'defaultTitle', 'defaultDescription' ];
	function appHeader( defaultTitle, defaultDescription ) {
		var appTitle = defaultTitle,
		    appDescription = defaultDescription;

		/**
		 * Get title, with options to set as well
		 * @param {string}		newTitle		The new title for the page (optional)
		 * @param {string}		mode			Whether to add the new title to the default one, as a suffix or prefix (optional)
		 * @return {string}
		 */
		function title( newTitle, mode ) {
			if ( mode === 'prepend' ) {
				appTitle = newTitle + defaultTitle;
			} else if ( mode === 'append' ) {
				appTitle = defaultTitle + newTitle;
			} else if ( newTitle ) {
				appTitle = newTitle;
			}

			return appTitle;
		}

		/**
		 * Get description, with options to set as well
		 * @param {string}		newDesc			The new description for the page (optional)
		 * @param {string}		mode			Whether to add the new description to the default one, as a suffix or prefix (optional)
		 * @return {string}
		 */
		function desc( newDesc, mode ) {
			if ( mode === 'prepend' ) {
				appDescription = newDesc + defaultDescription;
			} else if ( mode === 'append' ) {
				appDescription = defaultDescription + newDesc;
			} else if ( newDesc ) {
				appDescription = newDesc;
			}

			return appDescription;
		}

		return {
			title: title,
			desc: desc
		};
	}
} )();
