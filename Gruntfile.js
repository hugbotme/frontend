module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({

        // Project settings
        hugbot: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        pkg: grunt.file.readJSON('package.json'),

//        uglify: {
//            options: {
//                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//            },
//            build: {
//                src: 'src/<%= pkg.name %>.js',
//                dest: 'build/<%= pkg.name %>.min.js'
//            }
//        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= hugbot.dist %>/*',
                        '!<%= hugbot.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them

        useminPrepare: {
            options: {
                dest: '<%= hugbot.dist %>'
            },
            html: '<%= hugbot.app %>/index.html'
        },
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= hugbot.dist %>']
            },
            html: ['<%= hugbot.dist %>/{,*/}*.html'],
            css: ['<%= hugbot.dist %>/css/{,*/}*.css']
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= hugbot.app %>',
                    dest: '<%= hugbot.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'img/{,*/}*.webp',
                        '{,*/}*.html',
                        'fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= hugbot.app %>/css',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            }
        },
        pleeease: {
                custom: {
                    options: {
                        autoprefixer: {'browsers': ['last 4 versions', 'ios 6']},
                        filters: {'oldIE': true},
                        rem: ['12px'],
                        minifier: false,
                        mqpacker: true
                },
                files: {
                    '.tmp/css/custom.css': '.tmp/css/custom.css'
                }
            }
        },
        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= hugbot.dist %>/js/{,*/}*.js',
                        '<%= hugbot.dist %>/css/{,*/}*.css'
                    ]
                }
            }
        },
        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            options: {
                cache: false
            },
            dist: {
                files: [{
                    expand: true,

                    cwd: '<%= hugbot.app %>/img',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= hugbot.dist %>/img'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= hugbot.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= hugbot.dist %>'
                }]
            }
        }

    });

    grunt.registerTask(
        'build', [
        'clean:dist',
        'useminPrepare',
        'copy:styles',
        'pleeease',
        'imagemin',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);

};