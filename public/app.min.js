( function() {
	'use strict';
	angular.module( 'app', [
		'ngRoute',
		'app.utils',
		'app.home',
		'app.wistiaDemo'
	] )
	.config( appConfig )
	.run( appRun )
	.provider( 'ConfigDataSvc', ConfigDataSvc )
	.filter( 'toArray', toArray );

	appConfig.$incject = [ '$routeProvider', '$locationProvider' ];
	function appConfig( $routeProvider, $locationProvider ) {
		$routeProvider
		.when( '/', { // HOME PAGE
			title: 'Software Developer : Lucas Castro (Angular, Front-End, Engineer, UI, UX, Node)',
			description: 'Lucas Castro is a Software Developer specializing in Front-End development.',
			templateUrl: 'components/views/home.html',
			controller: 'homeController as homeVM'
		} )
		.when( '/wistia-demo', { // WISTIA DEMO
			title: 'Wistia + Angular Demo',
			description: 'Upload videos to a Wistia account, via their RESTful API, and embed the resulting videos.',
			templateUrl: 'components/views/wistia-demo.html',
			controller: 'wistiaDemoController as wistiaVM'
		} )
		.otherwise( { redirectTo: '/' } );

		$locationProvider.html5Mode( true );
	}

	appRun.$inject = [ '$rootScope', '$route' ];
	function appRun( $rootScope, $route ) {
		$rootScope.$on( '$routeChangeSuccess', function() {

			// Update page title
			document.title = $route.current.title;

			// Update page description
			var metaDesc = angular.element( document.querySelector( 'meta[name=description]' ) );
			metaDesc.attr( 'content', $route.current.description );
		} );
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

	// Service used for pre-loading configuration data, before the rest of the app
	function ConfigDataSvc() {
		this.data = {};
		this.loadConfigData = function( data ) {
			angular.merge( this, data );
		};

		this.initialized = function() {
			if ( Object.keys( this ).length > 0 ) {
				return true;
			}
			return false;
		};

		this.$get = [ function() {
			return this;
		} ];
	}

	// Load configuration data
	console.log( 'Initializing configuration...' );
	angular.element( document ).ready( function() {
		$.get( 'config/clientConfig.json', function( configData ) {

			angular.module( 'app' ).config( [ 'ConfigDataSvcProvider', function( ConfigDataSvcProvider ) {
				if ( configData && Object.keys( configData ).length > 0 ) {
					console.log( 'Configuration data loaded successfully.' );
				} else {
					console.warn( 'Failed to load configuration data' );
				}

				ConfigDataSvcProvider.loadConfigData( configData );
			} ] );

			angular.bootstrap( document, [ 'app' ] );
		} );
	} );

}() );
