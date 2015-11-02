( function() {
	'use strict';
	angular.module( 'app', [
			'ngRoute',
			'app.utils',
			'app.home',
			'app.wistiaDemo'
	] )
	.controller( 'mainController', mainController )
	.config( mainConfig )
	.filter( 'toArray', toArray );

	mainConfig.$incject = [ '$routeProvider', '$locationProvider' ];
	function mainConfig( $routeProvider, $locationProvider ) {
		$routeProvider
		.when( '/', { // HOME PAGE
			templateUrl: 'components/views/home.html',
			controller: 'homeController',
			resolve: {
				genericAnimations: function( uiAnimate ) {
					return uiAnimate.generic();
				}
			}
		} )
		.when( '/process-street/wistia-demo', { // WISTIA DEMO, for Process Street
			templateUrl: 'components/views/wistia-demo.html',
			controller: 'wistiaDemoController',
			resolve: {
				genericAnimations: function( uiAnimate ) {
					return uiAnimate.generic();
				}
			}
		} )
		.otherwise( { redirectTo: '/' } );

		$locationProvider.html5Mode( true );
	}

	function mainController( $scope ) {
		$scope.tagline = 'Lorem ipsum dolor';
	}

	// Converts an object with child-objects into an array of child-objects (useful for sorting)
	function toArray() {
		return function( obj ) {
			var result = [];
			angular.forEach( obj, function( val ) {
				result.push( val );
			} );
			return result;
		};
	}

}() );
