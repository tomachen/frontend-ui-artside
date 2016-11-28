module.exports = function (grunt) {
	var SRC_DIR = 'src';

	grunt.initConfig({
		htmlhint: {
			options: {
				htmlhintrc: 'tasks/.htmlhintrc'
			},
			main: {
				src: [SRC_DIR + '/**/*.html']
			},
		},
		csslint: {
			main: {
				options: {
					csslintrc: 'tasks/.csslintrc'
				},
				src: [
					SRC_DIR + '/**/*.css',
					'!' + SRC_DIR + '/**/reset.css',
					'!' + SRC_DIR + '/**/normalize.css'
				]
			}
		},
		'validation': {
			options: {
				reset: grunt.option('reset') || false,
				stoponerror: false,
				doctype: 'HTML5',
				charset: 'utf-8',
				generateReport: false,
				errorHTMLRootDir: "w3c",
				errorTemplate: "w3c_validation_error_Template.html",
				failHard: true,
				relaxerror: [] //ignores these errors 
			},
			files: {
				src: [SRC_DIR + '/**/*.html']
			}
		},
		watch: {
			sources: {
				files: [
					SRC_DIR + '/**/*.js',
					SRC_DIR + '/**/*.css',
					SRC_DIR + '/**/*.html'
				],
				//tasks: ['jshint'],
				options: {
					interrupt: true,
					livereload: 35729
				}
			}
		},
		browserSync: {
			bsFiles: {
				src : [
					SRC_DIR + '/**/*.js',
					SRC_DIR + '/**/*.css',
					SRC_DIR + '/**/*.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: SRC_DIR
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-w3c-html-validation');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('live', ['watch']);
	grunt.registerTask('start', ['browserSync', 'watch']);
	grunt.registerTask('test', ['htmlhint:main','validation', 'csslint:main']);
};