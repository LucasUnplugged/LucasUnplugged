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
	.run( mainRun )
	.filter( 'toArray', toArray );

	mainConfig.$incject = [ '$routeProvider', '$locationProvider' ];
	function mainConfig( $routeProvider, $locationProvider ) {
		$routeProvider
		.when( '/', { // HOME PAGE
			title: 'Software Developer : Lucas Castro (Angular, Front-End, Engineer, UI, UX, Node)',
			description: 'Lucas Castro is a Software Developer specializing in Front-End development.',
			templateUrl: 'components/views/home.html',
			controller: 'homeController',
			resolve: {
				genericAnimations: function( uiAnimate ) {
					return uiAnimate.generic();
				}
			}
		} )
		.when( '/process-street/wistia-demo', { // WISTIA DEMO, for Process Street
			title: 'Wistia + Angular Demo',
			description: 'Upload videos to a Wistia account, via their RESTful API, and embed the resulting videos.',
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

	mainRun.$inject = [ '$rootScope', '$route' ];
	function mainRun( $rootScope, $route ) {
		$rootScope.$on( '$routeChangeSuccess', function() {

			// Update page title
			document.title = $route.current.title;

			// Update page description
			var metaDesc = angular.element( document.querySelector( 'meta[name=description]' ) );
			metaDesc.attr( 'content', $route.current.description );
		} );
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
