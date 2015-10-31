"use strict";

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		project: {
			app: ['./'],
			assets: ['<%= project.app %>/assets'],
			dev_assets: ['lib'],
			css: ['<%= project.dev_assets %>/sass/main.scss']
		},
		concat: {
			dist: {
				src: [
					'<%= project.dev_assets %>/sass/{,*/}*.{scss,sass}'
				],
				dest: '<%= project.assets %>/css/main.css'
			}
		},
		sass: {
			dev: {
				options: {
					style: 'expanded',
					compass: false
				},
				files: {
					'<%= project.assets %>/css/main.css':'<%= project.css %>'
				}
			}
		},
		watch: {
			sass: {
				files: '<%= project.dev_assets %>/sass/{,*/}*.{scss,sass}',
				tasks: ['sass:dev']
			}
		},
		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 8080,
					base: {
						path: '/Users/lucas/Sites/lucas/',
						options: {
							index: 'index.html',
							maxAge: 300000
						}
					}
				}
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'<%= project.dev_assets %>/js/**/*.js',
						'<%= project.app %>*.html',
						'<%= project.assets %>/css/**/*.css'
					]
				},
				options: {
					reloadDelay: 250,
					open: 'http://localhost:8080/'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-connect');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browser-sync');


	grunt.registerTask('default', [
		'watch'
	]);
	grunt.registerTask('sync', [
		'browserSync'
	]);
	grunt.registerTask('concat_css', [
		'concat'
	]);

	grunt.registerTask('dev', ['connect:server', 'watch']);
};
