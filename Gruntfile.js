/*globals module, require */

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Fake Yeoman behaviour
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: '.eslint.rc'
            },
            target: [
                '*.js',
                'app/**/*.js',
                'tests/*.js'
            ]
        },

        // Lint the JSON files
        jsonlint: {
            all: {
                src: [
                    '*.json',
                    'app/**/*.json',
                    'tests/**/*.json'
                ]
            }
        },

        // Visualize JavaScript source complexity with plato.
        plato: {
            options: {},
            all: {
                files: {
                    'plato': [
                        '*.js'
                    ]
                }
            }
        }
    });

    // Run server
    grunt.registerTask('default', [
        'eslint',
        'jsonlint'
    ]);

    // Generate quality reports
    grunt.registerTask('quality', [
        'plato'
    ]);
};