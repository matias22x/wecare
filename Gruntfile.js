'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        'http-server': {
            testing: {
                port: 4000,
                host: '0.0.0.0',
                runInBackground: true,
                logFn: function(req, res, error) {}
            },
            production: {
                port: 4000,
                host: '0.0.0.0'
            }
        },

        eslint: {
            jenkins: {
                options: {
                    format: 'html',
                    outputFile: 'results/eslint/index.html'
                },
                src: ['./javascripts/**/*.js']
            },
            dev: {
                options: {
                    format: 'stylish'
                },
                src: ['./javascripts/**/*.js']
            },
            watch: {
                options: {
                    format: 'stylish'
                },
                src: ['./javascripts/**/*.js']
            }
        },

        plato: {
            ci: {
                options: {
                    eslintrc: './.eslintrc'
                },
                files: {
                    'results/plato': ['./javascripts/human-controllers/*.js', './javascripts/routers/*.js', './javascripts/controllers/*.js', './javascripts/*.js']
                }
            }
        },

        processhtml: {
            options: {
                commentMarker: 'process'
            },
            dist: {
                files: [{
                    expand: true,
                    src: 'index.html',
                    dest: '.'
                }]
            }
        },

        protractor: {
            jenkins: { // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: 'e2e/jenkins-test-conf.js', // Default config file
                    keepAlive: false, // If false, the grunt process stops when the test fails.
                    noColor: false // If true, protractor will not use colors in its output.
                }
            },
            test: {
                options: {
                    configFile: 'e2e/test-conf.js', // Default config file
                    keepAlive: true, // If false, the grunt process stops when the test fails.
                    noColor: false // If true, protractor will not use colors in its output.
                }
            },
            selenium: {
                options: {
                    configFile: 'e2e/conf.js', // Default config file
                    keepAlive: true, // If false, the grunt process stops when the test fails.
                    noColor: false // If true, protractor will not use colors in its output.
                }
            }

        },


        compass: { // Task
            dist: { // Target
                options: { // Target options
                    sassDir: 'sass',
                    cssDir: 'stylesheets',
                    environment: 'production'
                }
            },
            dev: { // Another target
                options: {
                    sassDir: 'sass',
                    cssDir: 'stylesheets'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['compass']
            }
        },
        'string-replace': {
            inline: {
                files: {
                    'javascripts/': 'javascripts/app.js',
                    './': 'index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: /http:\/\/[a-zA-Z0-9.\:\/]{4,}\'/ig,
                            replacement: (process.env.API_URL || 'http://localhost:3000') + '\''
                        }
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('compass_run', ['compass', 'watch']);
    grunt.registerTask('config-api', ['string-replace']);

    grunt.registerTask('jenkins', [
        'force:eslint:jenkins', 'plato:ci', 'http-server:testing', 'protractor:jenkins'
    ]);

    grunt.registerTask('test', [
        'http-server:testing', 'protractor:test'
    ]);

    grunt.registerTask('test-protractor', [
        'http-server:testing', 'protractor:test'
    ]);

    grunt.registerTask('test-selenium', [
        'http-server:testing', 'protractor:selenium'
    ]);

    grunt.registerTask('start', [
        'processhtml:dist', 'http-server:production'
    ]);

    grunt.registerTask('default', ['sass']);

};
