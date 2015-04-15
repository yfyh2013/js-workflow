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

        babel: {
            lib: {
                files: {
                    'lib/conditionnalNode.js': 'src/conditionnalNode.js',
                    'lib/driver.js': 'src/driver.js',
                    'lib/mergeNode.js': 'src/mergeNode.js',
                    'lib/node.js': 'src/node.js',
                    'lib/synchronizingNode.js': 'src/synchronizingNode.js',
                    'lib/workflow.js': 'src/workflow.js',
                    'lib/xorMergeNode.js': 'src/xorMergeNode.js'
                }
            }
        },

        eslint: {
            options: {
                configFile: '.eslint.rc'
            },
            target: [
                '*.js',
                'src/**/*.js',
                'tests/*.js'
            ]
        },

        // Lint the JSON files
        jsonlint: {
            all: {
                src: [
                    '*.json',
                    'src/**/*.json',
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

    // Lint code
    grunt.registerTask('default', [
        'eslint',
        'jsonlint'
    ]);

    // Build ES5 sources
    grunt.registerTask('build', [
        'babel'
    ]);

    // Generate quality reports
    grunt.registerTask('quality', [
        'plato'
    ]);
};