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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-w3c-html-validation');

	grunt.registerTask('live', ['watch']);
	grunt.registerTask('test', ['htmlhint:main','validation', 'csslint:main']);

	//BAT files mirrors
    grunt.registerTask('livereload', ['live']);
	grunt.registerTask('analize', ['test']);
};