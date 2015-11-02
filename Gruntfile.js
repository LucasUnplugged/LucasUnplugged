module.exports = function( grunt ) {
	'use strict';

	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		project: {
			app: [ 'public' ],
			assets: [ '<%= project.app %>/assets' ],
			dev: [ 'app' ],
			core: [ '<%= project.dev %>/core' ],
			test: [ 'app/test' ],
			devAssets: [ 'app/assets' ],
			sass: [ '<%= project.devAssets %>/sass/style.scss' ]
		},
		copy: {
			main: {
				src: '<%= project.dev %>/app.js',
				dest: '<%= project.app %>/app.min.js'
			},
			views: {}
		},
		sass: {
			all: {
				files: {
					'<%= project.assets %>/css/style.css':'<%= project.sass %>',
					'<%= project.assets %>/css/vendor.css':'<%= project.devAssets %>/sass/vendor.scss'
				}
			},
			dev: {
				files: {
					'<%= project.assets %>/css/style.css':'<%= project.sass %>'
				}
			},
			options: {
				includePaths: require('node-neat').includePaths,
				style: 'compressed',
				sourceMap: true
			}
		},
		watch: {
			dev: {
				files: [
					'<%= project.dev %>/**/*.js',
					'<%= project.dev %>/**/*.html',
					'<%= project.dev %>/**/*.json',
					'**/*.scss'
				],
				tasks: [ 'prepCore', 'sass:dev' ]
			},
			sass: {
				files: [ '**/*.scss' ],
				tasks: [ 'sass:dev' ]
			},
			options: {
				spawn: false,
			}
		},
		csscomb: {
			sass: {
				expand: true,
				cwd: '<%= project.devAssets %>/sass/',
				src: [ '**/*.scss' ],
				dest: '<%= project.devAssets %>/sass/'
			},
			options: {
				config: '.csscomb.json'
			}
		},
		jscs: {
			all: {
				src: [
					'<%= project.dev %>/**/*.js'
				]
			},
			dev: {
				src: [
					'<%= project.core %>/**/*.js',
					'<%= project.dev %>/*.js'
				]
			},
			test: {
				src: [
					'<%= project.test %>/unit/**/*.js',
					'<%= project.test %>/e2e/**/*.js'
				]
			},
			options: {
				fix: true,
				reporter: 'checkstyle',
				reporterOutput: 'codestyle.xml',
				config: '.jscsrc',
				force: true
			}
		},
		fixmyjs: {
			dev: {
				files: [
					{
						expand: true,
						cwd: '<%= project.core %>/',
						src: [ '**/*.js' ],
						dest: '<%= project.core %>/',
						ext: '.js'
					},
					{
						expand: true,
						cwd: '<%= project.dev %>/',
						src: [ '*.js' ],
						dest: '<%= project.dev %>/',
						ext: '.js'
					}
				]
			},
			test: {
				files: [ {
					expand: true,
					cwd: '<%= project.test %>/',
					src: [
						'**/*.js',
						'!config/**/*.js',
						'!coverage*/**/*.js',
						'!report*/**/*.js'
					],
					dest: '<%= project.test %>/',
					ext: '.js'
				} ]
			},
			options: {
				config: '.jshintrc',
				indentpref: 'tabs',
				legacy: true
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'<%= project.dev %>/**/*.js',
				'<%= project.test %>/unit/**/*.js',
				'<%= project.test %>/e2e/**/*.js'
			],
			dev: [
				'<%= project.dev %>/**/*.js'
			],
			test: [
				'<%= project.test %>/unit/**/*.js',
				'<%= project.test %>/e2e/**/*.js'
			],
			options: {
				reporter: 'checkstyle',
				reporterOutput: 'checkstyle.xml',
				force: true,
				jshintrc: '.jshintrc'
			}
		},
		uglify: {
			public: {
				files: [ {
					expand: true,
					cwd: '<%= project.app %>/',
					src: '**/*.js',
					dest: '<%= project.app %>/'
				} ]
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'<%= project.dev %>/**/*.*',
						'<%= project.app %>/**/*.js',
						'<%= project.app %>/**/*.html',
						'<%= project.app %>/**/*.json',
						'<%= project.assets %>/css/*.css'
					]
				},
				options: {
					watchTask: true,
					reloadDelay: 250,
					proxy: 'localhost:8080',
					open: true
				}
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-sass' );

	// Uncomment to use Compass instead of libSass
	// grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-autoprefixer' );
	grunt.loadNpmTasks( 'grunt-jscs' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-fixmyjs' );
	grunt.loadNpmTasks( 'grunt-csscomb' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-browser-sync' );

	grunt.registerTask( 'prepCore', 'Finds and prepares core components for concatenation.', function() {
		var core = grunt.config.get( 'project' ).core,
			app = grunt.config.get( 'project' ).app,
			options = { color: 'cyan' };

		// get all module directories
		grunt.file.expand( core + '/*' ).forEach( function( dir ) {

			// get the module name from the directory name
			var dirName = dir.substr( dir.lastIndexOf( '/' ) + 1 );

			// get the current concat object from initConfig
			var concat = grunt.config.get( 'concat' ) || {};

			// create a subtask for each module, find all source files and combine into a single js file per module
			concat[ dirName ] = {
				src: [ dir + '/**/*.js' ],
				dest: app + '/' + dirName + '/' + dirName + '.min.js'
			};

			// add module subtasks to the concat task in initConfig
			grunt.config.set( 'concat', concat );

			// Log a message to say this folder has been processed
			grunt.log.writeln( 'Concatenating ' + grunt.log.wordlist( [ dirName ], options ) + '...' );

			// get the current copy object from initConfig
			var copy = grunt.config.get( 'copy' ) || {};

			// HTML TEMPLATES /////////////////////////////
			// create a subtask for each module, find all source template files, and move them to a views directory
			copy[ dirName + '_views' ] = {
				expand: true,
				src: [ dir + '/**/*.html' ],
				dest: app + '/' + dirName + '/views/',
				filter: 'isFile',

				// flattens results to a single level
				flatten: true
			};

			// Log a message to say that views in this folder have been processed
			grunt.log.writeln( 'Copying views from ' + grunt.log.wordlist( [ dirName ], options ) + ' to production folder...' );

			// add module subtasks to the copy task in initConfig
			grunt.config.set( 'copy', copy );

			grunt.task.run( [ 'concat', 'copy' ] );
		} );
	} );

	grunt.registerTask( 'default', [
		'csscomb',
		'fixmyjs:dev',
		'jscs:dev',
		'jshint:dev',
		'prepCore',
		'browserSync',
		'watch:dev'
	] );

	grunt.registerTask( 'build', [
		'csscomb',
		'sass:all',
		'fixmyjs:dev',
		'jscs:all',
		'jshint:dev',
		'prepCore',
		'uglify'
	] );

	grunt.registerTask( 'buildStyles', [
		'csscomb',
		'sass:all'
	] );

	grunt.registerTask( 'devStyles', [
		'csscomb',
		'browserSync',
		'watch:sass'
	] );

	grunt.registerTask( 'buildCore', [
		'fixmyjs:dev',
		'jscs:dev',
		'jshint:dev',
		'prepCore',
		'uglify'
	] );

	grunt.registerTask( 'testUnit', [
		'fixmyjs:dev',
		'jscs:test',
		'jshint:test'
	] );

	grunt.registerTask( 'cleanCode', [
		'csscomb',
		'fixmyjs:dev',
		'jscs:dev',
		'jshint:dev'
	] );
};
