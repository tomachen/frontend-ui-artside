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
		validation: {
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
			all: {
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
				src: [
					SRC_DIR + '/**/*.js',
					SRC_DIR + '/**/*.css',
					SRC_DIR + '/**/*.html'
				]
			},
			//https://www.browsersync.io/docs/options
			options: {
				watchTask: true,
				server: {
					baseDir: SRC_DIR
				},
				// proxy: '',
				// host: '',
				// port: 3000,
				// https: true,
				// startPath: '/info.php',
				// browser: ['google chrome', 'firefox'']
				// localOnly: true,
				cors: false,
				open: 'external',
				notify: false,
				reloadOnRestart: true,
				reloadDelay: 0,
				reloadDebounce: 0,
				reloadThrottle: 0,
				ghostMode: {
					clicks: true,
					forms: true,
					scroll: true
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
	grunt.registerTask('test', ['htmlhint:main', 'validation', 'csslint:main']);
};