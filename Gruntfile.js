/*globals module, require */
/*eslint camelcase: [0, {properties: "always"}]*/

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
                    './index.js': './index.es6'
                }
            }
        },

        eslint: {
            options: {
                configFile: '.eslint.rc'
            },
            target: [
                'Gruntfile.js',
                '*.es6',
                'tests/*.js'
            ]
        },

        jsonlint: {
            all: {
                src: [
                    '*.json',
                    'src/**/*.json',
                    'tests/**/*.json'
                ]
            }
        },

        concat: {
            'options': {
                'separator': '\n'
            },
            'lib': {
                'src': [
                    './src/node.js',
                    './src/workflow.js',
                    './src/driver.js',
                    './src/consoleDriver.js',
                    './src/conditionnalNode.js',
                    './src/synchronizingNode.js',
                    './src/mergeNode.js',
                    './src/xorMergeNode.js',
                    './src/storageNode.js'
                ],
                'dest': 'index.es6',
                'nonull': 'true'
            }
        },

        jasmine_node: {
            task_name: {
                options: {
                    coverage: {},
                    forceExit: true,
                    match: '.',
                    matchAll: false,
                    specFolders: ['tests'],
                    extensions: 'js',
                    specNameMatcher: '',
                    captureExceptions: true,
                    junitreport: {
                        report: false,
                        savePath: './coverage/',
                        useDotNotation: true,
                        consolidate: true
                    }
                },
                src: ['index.js']
            }
        }
    });

    grunt.registerTask('default', [
        'concat',
        'babel',
        'eslint',
        'jsonlint',
        'jasmine_node'
    ]);
};